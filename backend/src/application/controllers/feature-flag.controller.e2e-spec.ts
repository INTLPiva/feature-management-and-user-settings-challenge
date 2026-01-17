import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { setupE2ESchema, closeE2EConnection } from "@/test/e2e/setup";

beforeAll(async () => {
  await setupE2ESchema();
  await app.ready();
});

afterAll(async () => {
  await app.close();
  await closeE2EConnection();
});

describe("[E2E] GET /api/feature-flags", () => {
  it("should return feature flags as a key-value map", async () => {
    const response = await request(app.server).get("/api/feature-flags");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        enable_signature: expect.any(Boolean),
        enable_dark_mode: expect.any(Boolean),
        enable_notifications: expect.any(Boolean),
      })
    );
  });

  it("should return all seeded flags", async () => {
    const response = await request(app.server).get("/api/feature-flags");

    const keys = Object.keys(response.body.data);
    expect(keys).toContain("enable_signature");
    expect(keys).toContain("enable_dark_mode");
    expect(keys).toContain("enable_notifications");
  });

  it("should return flags with boolean values", async () => {
    const response = await request(app.server).get("/api/feature-flags");

    const values = Object.values(response.body.data);
    values.forEach((value) => {
      expect(typeof value).toBe("boolean");
    });
  });
});
