import { createClient } from "@libsql/client";

const url = import.meta.env.VITE_TURSO_DB_URL;
const authToken = import.meta.env.VITE_TURSO_DB_AUTH_TOKEN;
const adminToken = import.meta.env.VITE_TURSO_DB_ADMIN_TOKEN;

if (!url) {
  throw new Error("VITE_TURSO_DB_URL is not defined in .env");
}

if (!authToken) {
  throw new Error("VITE_TURSO_DB_AUTH_TOKEN is not defined in .env");
}

if (!adminToken) {
  throw new Error("VITE_TURSO_DB_ADMIN_TOKEN is not defined in .env");
}

export const turso = createClient({
  url,
  authToken,
});

export const tursoAdmin = createClient({
  url,
  authToken: adminToken,
});
