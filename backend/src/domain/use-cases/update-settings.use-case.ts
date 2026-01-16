import { Settings } from "../entities/settings.entity";
import { SettingsRepository } from "../repositories/settings.repository";
import { AuditLogRepository } from "../repositories/audit-log.repository";

type SettingKey = "receiveNotifications" | "darkMode" | "profileSignature";
type SettingValue = boolean | string | null;

export class UpdateSettingsUseCase {
  constructor(
    private settingsRepository: SettingsRepository,
    private auditLogRepository: AuditLogRepository
  ) {}

  async execute(setting: SettingKey, value: SettingValue): Promise<Settings> {
    const oldSettings = await this.settingsRepository.find();

    const updateData: Partial<Settings> = {
      [setting]: value,
    };

    const updatedSettings = await this.settingsRepository.update(updateData);

    const oldValue = oldSettings?.[setting];
    const oldValueStr =
      oldValue === null || oldValue === undefined ? null : String(oldValue);
    const newValueStr = value === null ? null : String(value);

    await this.auditLogRepository.create({
      entity: "settings",
      fieldName: setting,
      oldValue: oldValueStr,
      newValue: newValueStr,
      action: "UPDATE",
    });

    return updatedSettings;
  }
}
