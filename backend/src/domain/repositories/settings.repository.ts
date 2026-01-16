import { Settings } from "../entities/settings.entity";

export interface SettingsRepository {
  find(): Promise<Settings | null>;
  update(settings: Partial<Settings>): Promise<Settings>;
}
