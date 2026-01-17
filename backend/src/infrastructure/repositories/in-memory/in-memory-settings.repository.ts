import { Settings } from "@/domain/entities/settings.entity";
import { SettingsRepository } from "@/domain/repositories/settings.repository";
import { randomUUID } from "crypto";

export class InMemorySettingsRepository implements SettingsRepository {
  private settings: Settings | null = null;

  async find(): Promise<Settings | null> {
    return this.settings;
  }

  async update(data: Partial<Settings>): Promise<Settings> {
    const now = new Date();

    if (!this.settings) {
      this.settings = {
        id: randomUUID(),
        receiveNotifications: false,
        darkMode: false,
        profileSignature: null,
        createdAt: now,
        updatedAt: now,
        ...data,
      };
    } else {
      this.settings = { ...this.settings, ...data, updatedAt: now };
    }

    return this.settings;
  }
}
