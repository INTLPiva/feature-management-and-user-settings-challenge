import { AuditLog } from "../entities/audit-log.entity";
import { AuditLogRepository } from "../repositories/audit-log.repository";

interface CreateAuditLogInput {
  entity: string;
  fieldName: string;
  oldValue?: string | null;
  newValue?: string | null;
  action: string;
}

export class CreateAuditLogUseCase {
  constructor(private auditLogRepository: AuditLogRepository) {}

  async execute(input: CreateAuditLogInput): Promise<AuditLog> {
    return await this.auditLogRepository.create(input);
  }
}
