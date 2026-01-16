import { FeatureFlagRepository } from "../repositories/feature-flag.repository";

export class GetFeatureFlagsUseCase {
  constructor(private featureFlagRepository: FeatureFlagRepository) {}

  async execute(): Promise<Record<string, boolean>> {
    const flags = await this.featureFlagRepository.findAll();

    return flags.reduce((acc, flag) => {
      acc[flag.flagKey] = flag.isEnabled;
      return acc;
    }, {} as Record<string, boolean>);
  }
}
