import { AuditLog } from "../entities/audit-log.entity";

export interface AuditLogRepository {
  create(log: Omit<AuditLog, "id" | "changedAt">): Promise<AuditLog>;
}
