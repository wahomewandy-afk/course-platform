import { env } from "@/src/data/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle({
  schema,
  connection: {
    url: process.env.DATABASE_URL ||"postgres://postgres:sweetwandia@localhost:5432/course_platform",
  },
  },
);
