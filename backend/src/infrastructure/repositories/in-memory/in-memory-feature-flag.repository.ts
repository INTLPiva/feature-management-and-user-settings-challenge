import { FeatureFlag } from "@/domain/entities/feature-flag.entity";
import { FeatureFlagRepository } from "@/domain/repositories/feature-flag.repository";

export class InMemoryFeatureFlagRepository implements FeatureFlagRepository {
  items: FeatureFlag[] = [];

  async findAll(): Promise<FeatureFlag[]> {
    return this.items;
  }
}
