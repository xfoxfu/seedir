import { db } from "./database.js";
import * as Sentry from "@sentry/node";
import express from "express";
import { pino } from "pino";
import { pinoHttp } from "pino-http";

const logger = pino();

// validate env vars
if (
  process.env["LOG_LEVEL"] &&
  !["fatal", "error", "warn", "info", "debug", "trace"].includes(process.env["LOG_LEVEL"])
) {
  throw new Error("invalid LOG_LEVEL");
}
logger.level = (process.env["LOG_LEVEL"] as (typeof logger)["level"]) ?? "info";

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

app.listen(3000);

logger.info("seedir listening on 3000");
