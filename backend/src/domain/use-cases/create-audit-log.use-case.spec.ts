import { describe, it, expect, beforeEach } from "vitest";
import { CreateAuditLogUseCase } from "./create-audit-log.use-case";
import { InMemoryAuditLogRepository } from "@/infrastructure/repositories/in-memory/in-memory-audit-log.repository";

let auditLogRepository: InMemoryAuditLogRepository;
let sut: CreateAuditLogUseCase;

beforeEach(() => {
  auditLogRepository = new InMemoryAuditLogRepository();
  sut = new CreateAuditLogUseCase(auditLogRepository);
});

describe("CreateAuditLogUseCase", () => {
  it("should create an audit log", async () => {
    const result = await sut.execute({
      entity: "settings",
      fieldName: "darkMode",
      oldValue: "false",
      newValue: "true",
      action: "UPDATE",
    });

    expect(result.id).toEqual(expect.any(String));
    expect(result.entity).toBe("settings");
    expect(result.fieldName).toBe("darkMode");
    expect(result.oldValue).toBe("false");
    expect(result.newValue).toBe("true");
    expect(result.action).toBe("UPDATE");
    expect(result.changedAt).toBeInstanceOf(Date);
  });

  it("should persist the audit log in the repository", async () => {
    await sut.execute({
      entity: "settings",
      fieldName: "darkMode",
      oldValue: null,
      newValue: "true",
      action: "UPDATE",
    });

    expect(auditLogRepository.items).toHaveLength(1);
  });

  it("should handle null old and new values", async () => {
    const result = await sut.execute({
      entity: "settings",
      fieldName: "profileSignature",
      oldValue: null,
      newValue: null,
      action: "UPDATE",
    });

    expect(result.oldValue).toBeNull();
    expect(result.newValue).toBeNull();
  });
});
