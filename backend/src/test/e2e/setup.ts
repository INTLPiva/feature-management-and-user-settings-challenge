import { inject } from "vitest";
import { db } from "@/infrastructure/database/postgres.connection";

function getTestSchema() {
  return inject("TEST_SCHEMA");
}

export async function setupE2ESchema() {
  await db.setSearchPath(getTestSchema());
}

export async function cleanE2ETables() {
  const schema = getTestSchema();
  await db.query(`SET search_path TO "${schema}"`);
  await db.query("DELETE FROM audit_logs");
  await db.query("DELETE FROM settings");
}

export async function closeE2EConnection() {
  await db.close();
}
