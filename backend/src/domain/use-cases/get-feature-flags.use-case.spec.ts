import { describe, it, expect, beforeEach } from "vitest";
import { GetFeatureFlagsUseCase } from "./get-feature-flags.use-case";
import { InMemoryFeatureFlagRepository } from "@/infrastructure/repositories/in-memory/in-memory-feature-flag.repository";

let featureFlagRepository: InMemoryFeatureFlagRepository;
let sut: GetFeatureFlagsUseCase;

beforeEach(() => {
  featureFlagRepository = new InMemoryFeatureFlagRepository();
  sut = new GetFeatureFlagsUseCase(featureFlagRepository);
});

describe("GetFeatureFlagsUseCase", () => {
  it("should return an empty object when there are no flags", async () => {
    const result = await sut.execute();

    expect(result).toEqual({});
  });

  it("should return a record mapping flagKey to isEnabled", async () => {
    featureFlagRepository.items = [
      {
        id: "1",
        flagKey: "enable_dark_mode",
        flagName: "Dark Mode",
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        flagKey: "enable_notifications",
        flagName: "Notifications",
        isEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const result = await sut.execute();

    expect(result).toEqual({
      enable_dark_mode: true,
      enable_notifications: false,
    });
  });

  it("should return all flags from the repository", async () => {
    featureFlagRepository.items = [
      {
        id: "1",
        flagKey: "flag_a",
        flagName: "Flag A",
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        flagKey: "flag_b",
        flagName: "Flag B",
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        flagKey: "flag_c",
        flagName: "Flag C",
        isEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const result = await sut.execute();

    expect(Object.keys(result)).toHaveLength(3);
  });
});
