import * as db from "./database.js";
import { enrichTorrentRemote } from "./lib/torrent_enrich.js";
import { logger } from "./log.js";
import { BangumiMoeSource } from "./source/bangumi.js";
import { Source } from "./source/index.js";
import { AcgRipRssSource, DmhyRssSource } from "./source/rss.js";
import { eq } from "drizzle-orm/expressions";

export class Worker {
  protected sources: Source[];

  constructor() {
    this.sources = [new AcgRipRssSource(), new BangumiMoeSource(), new DmhyRssSource()];
  }

  protected async processSourceAtPage(source: Source, page: number): Promise<boolean> {
    logger.info(`processing ${source.name} at page ${page}`);
    const items = await source.getPage(page);
    let hasNew = false;
    for (const item of items) {
      logger.info(`processing torrent ${item.source_link}`);
      try {
        const existing = await db.db.select().from(db.listing).where(eq(db.listing.torrent_link, item.torrent_link));
        if (existing.length > 0) {
          logger.info(`found existing data for torrent ${item.source_link}`);
          continue;
        }

        hasNew = true;

        logger.info(`getting torrent file ${item.torrent_link} for ${item.source_link}`);
        const enriched = await enrichTorrentRemote(item.torrent_link);
        await db.db.transaction(async (tx) => {
          const torrent = await tx
            .select()
            .from(db.torrent)
            .where(eq(db.torrent.info_hash_norm, enriched.info_hash_normalized))
            .for("update");
          if (torrent.length === 0) {
            logger.info(`no existing torrent data for ${item.source_link} (${enriched.info_hash_normalized})`);
            const newTorrent = await tx
              .insert(db.torrent)
              .values({
                title: item.title,
                info_hash_norm: enriched.info_hash_normalized,
              })
              .returning();
            await tx
              .insert(db.torrent_file)
              .values(enriched.files.map((f) => ({ path: f.path, size: f.size, torrent_id: newTorrent[0]!.id })));
            torrent.push(...newTorrent);
          }

          await tx.insert(db.listing).values({
            title: item.title,
            published_at: item.published_at,
            source_site: source.link,
            source_link: item.source_link,
            torrent_link: item.torrent_link,
            info_hash: enriched.info_hash,
            torrent_id: torrent[0]!.id,
          });
          logger.info(`created listing for ${item.source_link}`);
        });
      } catch (e) {
        logger.error(e, `failed to handle torrent ${item.source_link}: ` + (e as Error).message);
      }
    }
    return hasNew;
  }

  protected async processSource(source: Source): Promise<void> {
    let hasNew = false;
    let page = 1;
    do {
      hasNew = await this.processSourceAtPage(source, page);
      page += 1;
      if (page > 2) break;
    } while (hasNew);
  }

  public async processAllSources(): Promise<void> {
    logger.info("start processing all sources");
    await Promise.all(this.sources.map((source) => this.processSource(source)));
    logger.info("finished processing all sources");
  }

  public start() {
    this.processAllSources().catch(logger.error);
    setInterval(
      () => {
        this.processAllSources().catch(logger.error);
      },
      10 * 60 * 1000,
    );
  }
}

export const worker = new Worker();
