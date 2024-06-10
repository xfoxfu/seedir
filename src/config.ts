import fs from "fs/promises";
import { parse } from "toml";
import { z } from "zod";

const Config = z.object({
  /**
   * Sentry DSN
   */
  sentry_dsn: z.string().optional(),
  /**
   * configuration related to database
   */
  database: z
    .object({
      /**
       * connection string
       */
      url: z.string().url().default("postgres://postgres@localhost/seedir"),
      /**
       * run migrations automatically
       */
      auto_migrate: z.boolean().default(true),
    })
    .default({}),
  /**
   * configuration related to background worker
   */
  worker: z
    .object({
      /**
       * enable background worker for auto torrent scraping
       */
      enabled: z.boolean().default(true),
      /**
       * interval between processing (in seconds)
       */
      process_interval: z
        .number()
        .int()
        .positive()
        .default(30 * 60),
      /**
       * interval between processing page in same source
       */
      page_interval: z.number().int().positive().default(60),
      /**
       * interval between processing torrent (if download torrent)
       */
      torrent_inverval: z.number().int().positive().default(30),
      /**
       * maxium page to retrieve, `0` for no limit
       */
      page_limit: z.number().int().nonnegative().default(5),
    })
    .default({}),
});

export const config: z.infer<typeof Config> = {} as unknown as typeof config;

const normalizeEnv = (env?: string): string => {
  if (env === undefined || env === null) {
    return "dev";
  }
  if (env === "dev" || env === "develop" || env === "development") {
    return "dev";
  }
  if (env === "prod" || env === "production") {
    return "prod";
  }
  return "dev";
};

export const loadConfig = async () => {
  const env = normalizeEnv(process.env["NODE_ENV"]);
  const files = ["settings.toml", `settings.${env}.toml`, "settings.local.toml"];
  for (const file of files) {
    try {
      const content = await fs.readFile(file);
      const parsed = parse(content.toString()) as unknown;
      Object.assign(config, parsed);
    } catch (e) {
      if (typeof e === "object" && e !== null && "code" in e && typeof e.code === "string" && e.code === "ENOENT") {
        continue;
      }
      console.error(e);
    }
  }
  Object.assign(config, Config.parse(config));
};

await loadConfig();
