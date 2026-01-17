import { FeatureFlag } from "@/domain/entities/feature-flag.entity";
import { FeatureFlagRepository } from "@/domain/repositories/feature-flag.repository";
import { db } from "../../database/postgres.connection";

export class PostgresFeatureFlagRepository implements FeatureFlagRepository {
  async findAll(): Promise<FeatureFlag[]> {
    const result = await db.query(
      `SELECT id, flag_key as "flagKey", flag_name as "flagName",
              is_enabled as "isEnabled",
              created_at as "createdAt",
              updated_at as "updatedAt"
       FROM feature_flags
       ORDER BY flag_key`,
    );

    return result.rows;
  }
}
