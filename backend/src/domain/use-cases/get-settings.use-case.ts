import { Settings } from "../entities/settings.entity";
import { SettingsRepository } from "../repositories/settings.repository";

export class GetSettingsUseCase {
  constructor(private settingsRepository: SettingsRepository) {}

  async execute(): Promise<Settings> {
    let settings = await this.settingsRepository.find();

    if (!settings) {
      settings = await this.settingsRepository.update({
        receiveNotifications: false,
        darkMode: false,
      });
    }

    return settings;
  }
}
