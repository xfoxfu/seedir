import { pino } from "pino";

export const logger = pino();

// validate env vars
if (
  process.env["LOG_LEVEL"] &&
  !["fatal", "error", "warn", "info", "debug", "trace"].includes(process.env["LOG_LEVEL"])
) {
  throw new Error("invalid LOG_LEVEL");
}
logger.level = (process.env["LOG_LEVEL"] as (typeof logger)["level"]) ?? "info";
