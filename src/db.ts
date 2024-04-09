import { Pool } from "pg";

export const database = new Pool({
  user: "postgres",
  host: "localhost",
  database: "server_programming",
  password: process.env.DB_PASSWORD,
  port: 5432,
});
