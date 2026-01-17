import { Pool } from "pg";
import { randomUUID } from "crypto";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const TEST_SCHEMA = `test_e2e_${randomUUID().split("-").join("_")}`;

export async function setup({ provide }: any) {
  provide("TEST_SCHEMA", TEST_SCHEMA);

  const pool = new Pool({ connectionString: process.env["DATABASE_URL"] });

  await pool.query(`CREATE SCHEMA "${TEST_SCHEMA}"`);
  await pool.query(`SET search_path TO "${TEST_SCHEMA}"`);

  const migrationPath = path.resolve(
    __dirname,
    "../../infrastructure/database/migrations/001_initial_schema.sql"
  );
  const migrationSQL = fs.readFileSync(migrationPath, "utf-8");
  await pool.query(migrationSQL);

  await pool.end();
}

export async function teardown() {
  const pool = new Pool({ connectionString: process.env["DATABASE_URL"] });
  await pool.query(`DROP SCHEMA IF EXISTS "${TEST_SCHEMA}" CASCADE`);
  await pool.end();
}

declare module "vitest" {
  export interface ProvidedContext {
    TEST_SCHEMA: string;
  }
}
