import { db } from "./database.js";
import { logger } from "./log.js";
import { worker } from "./worker.js";
import * as Sentry from "@sentry/node";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import express from "express";
import { pinoHttp } from "pino-http";

const app = express();

app.use(pinoHttp({ logger }));

app.get("/", (req, res, next) => {
  (async () => {
    res.json(
      await db.query.torrent.findMany({
        with: {
          torrent_files: true,
          listings: true,
        },
      }),
    );
  })()
    .then(() => next())
    .catch((err) => next(err));
});

app.use(express.static("public"));

Sentry.setupExpressErrorHandler(app);

const main = async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
  worker.start();

  app.listen(3000);

  logger.info("seedir listening on 3000");
};

main().catch(console.error);
