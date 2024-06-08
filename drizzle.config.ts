import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE!,
  },
});
