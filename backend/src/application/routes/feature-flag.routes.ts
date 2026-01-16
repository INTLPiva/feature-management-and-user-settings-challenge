import { FastifyInstance } from "fastify";
import { container } from "@/application/di/container";

export async function featureFlagRoutes(app: FastifyInstance) {
  app.get("/feature-flags", (req, reply) =>
    container.featureFlagController.getFlags(req, reply)
  );
}
