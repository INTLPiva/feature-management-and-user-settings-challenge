import { PostgresSettingsRepository } from "@/infrastructure/repositories/postgres-settings.repository";
import { PostgresFeatureFlagRepository } from "@/infrastructure/repositories/postgres-feature-flag.repository";
import { PostgresAuditLogRepository } from "@/infrastructure/repositories/postgres-audit-log.repository";

import { GetSettingsUseCase } from "@/domain/use-cases/get-settings.use-case";
import { UpdateSettingsUseCase } from "@/domain/use-cases/update-settings.use-case";
import { GetFeatureFlagsUseCase } from "@/domain/use-cases/get-feature-flags.use-case";

import { SettingsController } from "@/application/controllers/settings.controller";
import { FeatureFlagController } from "@/application/controllers/feature-flag.controller";

class DIContainer {
  public readonly settingsController: SettingsController;
  public readonly featureFlagController: FeatureFlagController;

  constructor() {
    const settingsRepository = new PostgresSettingsRepository();
    const featureFlagRepository = new PostgresFeatureFlagRepository();
    const auditLogRepository = new PostgresAuditLogRepository();

    const getSettingsUseCase = new GetSettingsUseCase(settingsRepository);
    const updateSettingsUseCase = new UpdateSettingsUseCase(
      settingsRepository,
      auditLogRepository
    );
    const getFeatureFlagsUseCase = new GetFeatureFlagsUseCase(
      featureFlagRepository
    );

    this.settingsController = new SettingsController(
      getSettingsUseCase,
      updateSettingsUseCase
    );
    this.featureFlagController = new FeatureFlagController(
      getFeatureFlagsUseCase
    );
  }
}

export const container = new DIContainer();
