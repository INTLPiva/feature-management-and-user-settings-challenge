import Fastify from "fastify";
import { ZodError } from "zod";
import { registerRoutes } from "./application/routes";

export const app = Fastify();

registerRoutes(app);

app.setErrorHandler(async (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  console.error(error);

  return reply.status(500).send({ message: "Internal server error." });
});
