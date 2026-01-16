import { Settings } from "@/domain/entities/settings.entity";
import { SettingsRepository } from "@/domain/repositories/settings.repository";
import { db } from "../database/postgres.connection";

export class PostgresSettingsRepository implements SettingsRepository {
  async find(): Promise<Settings | null> {
    const result = await db.query(
      `SELECT id, receive_notifications as "receiveNotifications",
              dark_mode as "darkMode", profile_signature as "profileSignature",
              created_at as "createdAt", updated_at as "updatedAt"
       FROM settings LIMIT 1`
    );

    return result.rows[0] || null;
  }

  async update(settings: Partial<Settings>): Promise<Settings> {
    const existing = await this.find();

    if (!existing) {
      const result = await db.query(
        `INSERT INTO settings (receive_notifications, dark_mode, profile_signature)
         VALUES ($1, $2, $3)
         RETURNING id, receive_notifications as "receiveNotifications",
                   dark_mode as "darkMode", profile_signature as "profileSignature",
                   created_at as "createdAt", updated_at as "updatedAt"`,
        [
          settings.receiveNotifications ?? false,
          settings.darkMode ?? false,
          settings.profileSignature ?? null,
        ]
      );
      return result.rows[0]!;
    }

    const updateFields: string[] = [];
    const values: (boolean | string | null)[] = [];
    let paramIndex = 1;

    if (settings.receiveNotifications !== undefined) {
      updateFields.push(`receive_notifications = $${paramIndex}`);
      values.push(settings.receiveNotifications);
      paramIndex++;
    }

    if (settings.darkMode !== undefined) {
      updateFields.push(`dark_mode = $${paramIndex}`);
      values.push(settings.darkMode);
      paramIndex++;
    }

    if (settings.profileSignature !== undefined) {
      updateFields.push(`profile_signature = $${paramIndex}`);
      values.push(settings.profileSignature);
      paramIndex++;
    }

    updateFields.push(`updated_at = NOW()`);

    const result = await db.query(
      `UPDATE settings
       SET ${updateFields.join(", ")}
       RETURNING id, receive_notifications as "receiveNotifications",
                 dark_mode as "darkMode", profile_signature as "profileSignature",
                 created_at as "createdAt", updated_at as "updatedAt"`,
      values
    );

    return result.rows[0]!;
  }
}
