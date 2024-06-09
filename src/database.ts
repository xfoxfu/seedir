import { relations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { bigint, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import pg from "pg";
import { ulid, ulidToUUID } from "ulidx";

const pool = new pg.Pool({
  connectionString: "postgres://xfoxfu@localhost/seedir",
});

export const torrent = pgTable("torrent", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => ulidToUUID(ulid())),
  title: text("title").notNull(),
  info_hash_norm: text("info_hash_norm").notNull(),
});

export const torrent_relations = relations(torrent, ({ many }) => ({
  torrent_files: many(torrent_file),
  listings: many(listing),
}));

export const torrent_file = pgTable("torrent_file", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => ulidToUUID(ulid())),
  path: text("path").notNull(),
  size: bigint("size", { mode: "number" }),
  torrent_id: uuid("torrent_id")
    .notNull()
    .references(() => torrent.id),
});

export const torrent_file_relations = relations(torrent_file, ({ one }) => ({
  torrent: one(torrent, {
    fields: [torrent_file.torrent_id],
    references: [torrent.id],
  }),
}));

export const listing = pgTable("listing", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => ulidToUUID(ulid())),
  title: text("title").notNull(),
  published_at: timestamp("published_at", { withTimezone: true, mode: "date" }).notNull(),
  source_site: text("source_site").notNull(),
  source_link: text("source_link").notNull().unique(),
  torrent_link: text("torrent_link").notNull(),
  info_hash: text("info_hash").notNull(),
  torrent_id: uuid("torrent_id")
    .notNull()
    .references(() => torrent.id),
});

export const listing_relations = relations(listing, ({ one }) => ({
  torrent: one(torrent, {
    fields: [listing.torrent_id],
    references: [torrent.id],
  }),
}));

export const db = drizzle(pool, {
  schema: { torrent, torrent_relations, torrent_file, torrent_file_relations, listing, listing_relations },
});
