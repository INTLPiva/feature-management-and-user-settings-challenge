import { Pool, PoolClient } from "pg";
import { env } from "@/shared/config/env";

class PostgresConnection {
  private static instance: PostgresConnection;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      connectionString: env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
    });
  }

  public static getInstance(): PostgresConnection {
    if (!PostgresConnection.instance) {
      PostgresConnection.instance = new PostgresConnection();
    }
    return PostgresConnection.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  public async query(text: string, params?: any[]) {
    return await this.pool.query(text, params);
  }

  public async setSearchPath(schema: string): Promise<void> {
    await this.pool.query(`SET search_path TO "${schema}", public`);
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export const db = PostgresConnection.getInstance();
