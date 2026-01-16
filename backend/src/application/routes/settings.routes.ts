import { FastifyInstance } from "fastify";
import { container } from "@/application/di/container";
import { UpdateSettingDto } from "../dtos/settings.dto";

export async function settingsRoutes(app: FastifyInstance) {
  app.get("/settings", (req, reply) =>
    container.settingsController.getSettings(req, reply)
  );

  app.put<{ Body: UpdateSettingDto }>("/settings", (req, reply) =>
    container.settingsController.updateSettings(req, reply)
  );
}
