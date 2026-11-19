import {
  pgTable,
  integer,
  pgEnum,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { courseProductTable } from "./courseProduct";
import { userCourseAccessTable} from "./userCourseAccessTable";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const userTable = pgTable("user", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull().unique(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const userRelationships = relations(userTable, ({ many }) => ({
  userCourseAccesses: many(userCourseAccessTable),
}));
