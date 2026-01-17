import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { app } from "@/app";
import {
  setupE2ESchema,
  cleanE2ETables,
  closeE2EConnection,
} from "@/test/e2e/setup";

beforeAll(async () => {
  await setupE2ESchema();
  await app.ready();
});

afterAll(async () => {
  await app.close();
  await closeE2EConnection();
});

beforeEach(async () => {
  await cleanE2ETables();
});

describe("[E2E] GET /api/settings", () => {
  it("should return default settings when none exist", async () => {
    const response = await request(app.server).get("/api/settings");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.receiveNotifications).toBe(false);
    expect(response.body.data.darkMode).toBe(false);
  });

  it("should return existing settings", async () => {
    await request(app.server)
      .put("/api/settings")
      .send({ setting: "darkMode", value: true });

    const response = await request(app.server).get("/api/settings");

    expect(response.status).toBe(200);
    expect(response.body.data.darkMode).toBe(true);
  });
});

describe("[E2E] PUT /api/settings", () => {
  it("should update a boolean setting", async () => {
    const response = await request(app.server)
      .put("/api/settings")
      .send({ setting: "receiveNotifications", value: true });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.receiveNotifications).toBe(true);
  });

  it("should update profileSignature with a string", async () => {
    const response = await request(app.server)
      .put("/api/settings")
      .send({ setting: "profileSignature", value: "Hello World" });

    expect(response.status).toBe(200);
    expect(response.body.data.profileSignature).toBe("Hello World");
  });

  it("should clear profileSignature with null", async () => {
    await request(app.server)
      .put("/api/settings")
      .send({ setting: "profileSignature", value: "Old sig" });

    const response = await request(app.server)
      .put("/api/settings")
      .send({ setting: "profileSignature", value: null });

    expect(response.status).toBe(200);
    expect(response.body.data.profileSignature).toBeNull();
  });

  it("should return 400 when sending string for boolean setting", async () => {
    const response = await request(app.server)
      .put("/api/settings")
      .send({ setting: "darkMode", value: "not-a-boolean" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return 400 when sending boolean for profileSignature", async () => {
    const response = await request(app.server)
      .put("/api/settings")
      .send({ setting: "profileSignature", value: true });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return 400 for invalid setting key", async () => {
    const response = await request(app.server)
      .put("/api/settings")
      .send({ setting: "invalidKey", value: true });

    expect(response.status).toBe(400);
  });

  it("should create an audit log after updating", async () => {
    await request(app.server)
      .put("/api/settings")
      .send({ setting: "darkMode", value: true });

    await request(app.server)
      .put("/api/settings")
      .send({ setting: "darkMode", value: false });

    const settingsResponse = await request(app.server).get("/api/settings");
    expect(settingsResponse.body.data.darkMode).toBe(false);
  });
});
