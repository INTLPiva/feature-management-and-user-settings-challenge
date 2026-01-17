import { describe, it, expect, beforeEach } from "vitest";
import { UpdateSettingsUseCase } from "./update-settings.use-case";
import { InMemorySettingsRepository } from "@/infrastructure/repositories/in-memory/in-memory-settings.repository";
import { InMemoryAuditLogRepository } from "@/infrastructure/repositories/in-memory/in-memory-audit-log.repository";

let settingsRepository: InMemorySettingsRepository;
let auditLogRepository: InMemoryAuditLogRepository;
let sut: UpdateSettingsUseCase;

beforeEach(() => {
  settingsRepository = new InMemorySettingsRepository();
  auditLogRepository = new InMemoryAuditLogRepository();
  sut = new UpdateSettingsUseCase(settingsRepository, auditLogRepository);
});

describe("UpdateSettingsUseCase", () => {
  it("should update a boolean setting", async () => {
    await settingsRepository.update({
      receiveNotifications: false,
      darkMode: false,
    });

    const result = await sut.execute("darkMode", true);

    expect(result.darkMode).toBe(true);
  });

  it("should update a string setting", async () => {
    await settingsRepository.update({
      receiveNotifications: false,
      darkMode: false,
    });

    const result = await sut.execute("profileSignature", "My signature");

    expect(result.profileSignature).toBe("My signature");
  });

  it("should create an audit log entry on update", async () => {
    await settingsRepository.update({
      receiveNotifications: false,
      darkMode: false,
    });

    await sut.execute("darkMode", true);

    expect(auditLogRepository.items).toHaveLength(1);

    const log = auditLogRepository.items[0]!;
    expect(log.entity).toBe("settings");
    expect(log.fieldName).toBe("darkMode");
    expect(log.oldValue).toBe("false");
    expect(log.newValue).toBe("true");
    expect(log.action).toBe("UPDATE");
  });

  it("should handle null old value when no settings exist yet", async () => {
    await sut.execute("darkMode", true);

    const log = auditLogRepository.items[0]!;
    expect(log.oldValue).toBeNull();
    expect(log.newValue).toBe("true");
  });

  it("should set newValue to null when clearing a setting", async () => {
    await settingsRepository.update({
      receiveNotifications: false,
      darkMode: false,
      profileSignature: "Old sig",
    });

    await sut.execute("profileSignature", null);

    const log = auditLogRepository.items[0]!;
    expect(log.oldValue).toBe("Old sig");
    expect(log.newValue).toBeNull();
  });

  it("should return the updated settings object", async () => {
    await settingsRepository.update({
      receiveNotifications: false,
      darkMode: false,
    });

    const result = await sut.execute("receiveNotifications", true);

    expect(result.receiveNotifications).toBe(true);
    expect(result.id).toEqual(expect.any(String));
  });
});
