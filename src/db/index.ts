import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    throw new Error("DATABASE_URL is not set");
  }

  const db = drizzle(process.env.DATABASE_URL, { schema });

  return db;
};

export default setup();
