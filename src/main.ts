import "./sentry.js";
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
if (!process.env["SENTRY_DSN"]) {
  logger.warn("SENTRY_DSN not set, will not report error to sentry");
}
logger.level = (process.env["LOG_LEVEL"] as (typeof logger)["level"]) ?? "info";

const app = express();

app.use(pinoHttp({ logger }));

app.get("/", () => {
  throw Error("hello");
});

app.use(express.static("public"));

Sentry.setupExpressErrorHandler(app);

app.listen(3000);

logger.info("seedir listening on 3000");
