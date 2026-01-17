import { describe, it, expect, beforeEach } from "vitest";
import { GetSettingsUseCase } from "./get-settings.use-case";
import { InMemorySettingsRepository } from "@/infrastructure/repositories/in-memory/in-memory-settings.repository";

let settingsRepository: InMemorySettingsRepository;
let sut: GetSettingsUseCase;

beforeEach(() => {
  settingsRepository = new InMemorySettingsRepository();
  sut = new GetSettingsUseCase(settingsRepository);
});

describe("GetSettingsUseCase", () => {
  it("should return existing settings", async () => {
    await settingsRepository.update({
      receiveNotifications: true,
      darkMode: true,
      profileSignature: "Hello!",
    });

    const result = await sut.execute();

    expect(result.receiveNotifications).toBe(true);
    expect(result.darkMode).toBe(true);
    expect(result.profileSignature).toBe("Hello!");
  });

  it("should create default settings when none exist", async () => {
    const result = await sut.execute();

    expect(result.id).toEqual(expect.any(String));
    expect(result.receiveNotifications).toBe(false);
    expect(result.darkMode).toBe(false);
  });

  it("should persist the default settings after auto-creation", async () => {
    await sut.execute();

    const persisted = await settingsRepository.find();

    expect(persisted).not.toBeNull();
    expect(persisted!.receiveNotifications).toBe(false);
    expect(persisted!.darkMode).toBe(false);
  });
});
