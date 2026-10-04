import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";

export * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, { relations });
