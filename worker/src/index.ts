import "./instrumentation"; // instrumenting the application
import app from "./app";
import { env } from "./env";
import { logger } from "@langfuse/shared/src/server";

const isWorkersOnly = env.LANGFUSE_WORKERS_ONLY === "true";

export const server = isWorkersOnly
  ? null
  : app.listen(env.PORT, env.HOSTNAME, () => {
      logger.info(`Listening: http://${env.HOSTNAME}:${env.PORT}`);
    });

if (isWorkersOnly) {
  logger.info(
    "Running in workers-only mode. No HTTP server started. Only BullMQ workers are active.",
  );
}
