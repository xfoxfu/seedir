import { Item, Source, USER_AGENT } from "./index.js";
import { magnetDecode } from "@ctrl/magnet-link";
import * as date from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import ky from "ky";
import Parser, { Item as RssItem } from "rss-parser";

export class RssSource extends Source {
  public override name: string;
  public override link: string;
  public pageTemplate: string;

  public getTorrentUrl(item: RssItem): string {
    if (!item.enclosure) throw new Error("item missing enclosure: " + JSON.stringify(item));
    return item.enclosure.url;
  }

  public override async getPage(page: number): Promise<Item[]> {
    const content = await ky
      .get(this.pageTemplate.replaceAll("$page", page.toString()), {
        headers: { "User-Agent": USER_AGENT },
      })
      .text();
    const parser = new Parser();
    const feed = await parser.parseString(content);
    return (
      feed?.items.map((item) => {
        if (!item.title) throw new Error("item missing title: " + JSON.stringify(item));
        if (!item.pubDate) throw new Error("item missing pubDate: " + JSON.stringify(item));
        if (!item.link) throw new Error("item missing link: " + JSON.stringify(item));
        return {
          title: item.title,
          published_at: new Date(item.pubDate),
          source_link: item.link,
          torrent_link: this.getTorrentUrl(item),
        } satisfies Item;
      }) ?? []
    );
  }

  constructor(siteName: string, siteLink: string, pageTemplate: string) {
    super();
    this.name = `${siteName}Rss`;
    this.link = siteLink;
    this.pageTemplate = pageTemplate;
  }
}

export class AcgRipRssSource extends RssSource {
  constructor() {
    super("ACG.RIP", "https://acg.rip", "https://acg.rip/page/$page.xml");
  }
}

export class DmhyRssSource extends RssSource {
  constructor() {
    super("dmhy", "https://share.dmhy.org", "https://share.dmhy.org/topics/rss/page/$page/rss.xml");
  }

  public override getTorrentUrl(item: RssItem): string {
    const pubDate = date.parse(item.pubDate!, "EEE, dd MMM yyyy HH:mm:ss XX", Date.now());
    const pubDateStr = formatInTimeZone(pubDate, "+08:00", "yyyy/MM/dd");
    return `https://dl.dmhy.org/${pubDateStr}/${magnetDecode(item.enclosure?.url ?? "").infoHash}.torrent`;
  }
}
