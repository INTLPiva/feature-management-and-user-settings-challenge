import { AuditLog } from "@/domain/entities/audit-log.entity";
import { AuditLogRepository } from "@/domain/repositories/audit-log.repository";
import { randomUUID } from "crypto";

export class InMemoryAuditLogRepository implements AuditLogRepository {
  items: AuditLog[] = [];

  async create(log: Omit<AuditLog, "id" | "changedAt">): Promise<AuditLog> {
    const auditLog: AuditLog = {
      id: randomUUID(),
      ...log,
      changedAt: new Date(),
    };

    this.items.push(auditLog);

    return auditLog;
  }
}
