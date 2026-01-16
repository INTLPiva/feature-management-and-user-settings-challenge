import { FastifyReply, FastifyRequest } from "fastify";
import { GetFeatureFlagsUseCase } from "@/domain/use-cases/get-feature-flags.use-case";

export class FeatureFlagController {
  constructor(private getFeatureFlagsUseCase: GetFeatureFlagsUseCase) {}

  async getFlags(request: FastifyRequest, reply: FastifyReply) {
    try {
      const flags = await this.getFeatureFlagsUseCase.execute();

      return reply.status(200).send({
        success: true,
        data: flags,
      });
    } catch (error) {
      console.error("Error getting feature flags:", error);
      return reply.status(500).send({
        success: false,
        error: "Internal server error",
      });
    }
  }
}
