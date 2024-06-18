import { config } from "./config.js";
import { db } from "./database.js";
import { logger } from "./log.js";
import { worker } from "./worker.js";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import express from "express";
import { pinoHttp } from "pino-http";

if (config.sentry_dsn) {
  Sentry.init({
    dsn: config.sentry_dsn,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });
}

const app = express();

app.use(pinoHttp({ logger, quietReqLogger: true, autoLogging: false }));

app.get("/torrents", (req, res, next) => {
  (async () => {
    if (!req.query["filter"]) {
      res.status(400).json({ error: "filter query parameter is required" });
    }

    res.status(200).json(
      await db.query.torrent.findMany({
        with: {
          torrent_files: true,
          listings: true,
        },
        where: ({ title }, { sql }) => sql<string>`${title} ~* ${req.query["filter"]}`,
        orderBy: ({ id }, { desc }) => desc(id),
        limit: 50,
      }),
    );
  })().catch((err) => next(err));
});

app.use(express.static("public"));

Sentry.setupExpressErrorHandler(app);

const main = async () => {
  if (config.database.auto_migrate) {
    await migrate(db, { migrationsFolder: "./migrations" });
  }
  if (config.worker.enabled) {
    worker.start();
  }

  app.listen(3000);

  logger.info("seedir listening on 3000");
};

main().catch(console.error);
