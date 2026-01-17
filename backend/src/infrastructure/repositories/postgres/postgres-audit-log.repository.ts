import { AuditLog } from "@/domain/entities/audit-log.entity";
import { AuditLogRepository } from "@/domain/repositories/audit-log.repository";
import { db } from "../../database/postgres.connection";

export class PostgresAuditLogRepository implements AuditLogRepository {
  async create(log: Omit<AuditLog, "id" | "changedAt">): Promise<AuditLog> {
    const result = await db.query(
      `INSERT INTO audit_logs (entity, field_name, old_value, new_value, action)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, entity, field_name as "fieldName",
                 old_value as "oldValue", new_value as "newValue",
                 action, changed_at as "changedAt"`,
      [
        log.entity,
        log.fieldName,
        log.oldValue ?? null,
        log.newValue ?? null,
        log.action,
      ],
    );

    return result.rows[0]!;
  }
}
