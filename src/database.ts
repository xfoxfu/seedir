import { relations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { pgTable, text, time, uuid } from "drizzle-orm/pg-core";
import pg from "pg";
import { ulid } from "ulid";

const pool = new pg.Pool({
  connectionString: "postgres://xfoxfu@localhost/seedir",
});

export const torrent = pgTable("torrent", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  title: text("title").notNull(),
  info_hash: text("info_hash").notNull(),
});

export const torrent_relations = relations(torrent, ({ many }) => ({
  torrent_files: many(torrent_file),
  listings: many(listing),
}));

export const torrent_file = pgTable("torrent_file", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  path: text("path").array().notNull(),
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
    .$defaultFn(() => ulid()),
  title: text("title").notNull(),
  published_at: time("published_at", { withTimezone: true }).notNull(),
  source_site: text("source_site").notNull(),
  source_link: text("source_link").notNull().unique(),
  torrent_link: text("torrent_link").notNull(),
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

await migrate(db, { migrationsFolder: "./migrations" });
