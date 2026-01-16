import { FeatureFlag } from "../entities/feature-flag.entity";

export interface FeatureFlagRepository {
  findAll(): Promise<FeatureFlag[]>;
}
