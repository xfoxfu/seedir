CREATE TABLE IF NOT EXISTS "listing" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"published_at" time with time zone NOT NULL,
	"source_site" text NOT NULL,
	"source_link" text NOT NULL,
	"torrent_link" text NOT NULL,
	"torrent_id" uuid NOT NULL,
	CONSTRAINT "listing_source_link_unique" UNIQUE("source_link")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "torrent" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"info_hash" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "torrent_file" (
	"id" uuid PRIMARY KEY NOT NULL,
	"path" text[] NOT NULL,
	"torrent_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listing" ADD CONSTRAINT "listing_torrent_id_torrent_id_fk" FOREIGN KEY ("torrent_id") REFERENCES "public"."torrent"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "torrent_file" ADD CONSTRAINT "torrent_file_torrent_id_torrent_id_fk" FOREIGN KEY ("torrent_id") REFERENCES "public"."torrent"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
