import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetSettingsUseCase } from "@/domain/use-cases/get-settings.use-case";
import { UpdateSettingsUseCase } from "@/domain/use-cases/update-settings.use-case";
import { UpdateSettingDto } from "@/application/dtos/settings.dto";

const updateSettingsSchema = z
  .object({
    setting: z.enum(["receiveNotifications", "darkMode", "profileSignature"]),
    value: z.union([z.boolean(), z.string().max(500), z.null()]),
  })
  .superRefine((data, ctx) => {
    if (
      data.setting === "receiveNotifications" ||
      data.setting === "darkMode"
    ) {
      if (typeof data.value !== "boolean") {
        ctx.addIssue({
          code: "custom",
          message: `The setting '${data.setting}' requires a boolean value`,
          path: ["value"],
        });
      }
    }

    if (data.setting === "profileSignature") {
      if (data.value !== null && typeof data.value !== "string") {
        ctx.addIssue({
          code: "custom",
          message: `The setting 'profileSignature' requires a string or null value`,
          path: ["value"],
        });
      }
    }
  });

export class SettingsController {
  constructor(
    private getSettingsUseCase: GetSettingsUseCase,
    private updateSettingsUseCase: UpdateSettingsUseCase
  ) {}

  async getSettings(request: FastifyRequest, reply: FastifyReply) {
    try {
      const settings = await this.getSettingsUseCase.execute();

      return reply.status(200).send({
        success: true,
        data: settings,
      });
    } catch (error) {
      console.error("Error getting settings:", error);
      return reply.status(500).send({
        success: false,
        error: "Internal server error",
      });
    }
  }

  async updateSettings(
    request: FastifyRequest<{ Body: UpdateSettingDto }>,
    reply: FastifyReply
  ) {
    try {
      const validatedBody = updateSettingsSchema.parse(request.body);

      const settings = await this.updateSettingsUseCase.execute(
        validatedBody.setting,
        validatedBody.value
      );

      return reply.status(200).send({
        success: true,
        data: settings,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          success: false,
          error: "Invalid request data",
          details: error.issues,
        });
      }

      console.error("Error updating settings:", error);
      return reply.status(500).send({
        success: false,
        error: "Internal server error",
      });
    }
  }
}
