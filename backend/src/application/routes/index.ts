import { FastifyInstance } from "fastify";
import { settingsRoutes } from "./settings.routes";
import { featureFlagRoutes } from "./feature-flag.routes";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(settingsRoutes, { prefix: "/api" });
  await app.register(featureFlagRoutes, { prefix: "/api" });
}
