export interface AuditLog {
  id: string;
  entity: string;
  fieldName: string;
  oldValue?: string | null;
  newValue?: string | null;
  action: string;
  changedAt: Date;
}
