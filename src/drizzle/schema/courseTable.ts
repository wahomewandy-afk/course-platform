import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { courseProductTable } from "./courseProduct";

export const course = pgTable("course", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
  // if we want to change it on the schemahelpers file we can just change it there and it will be reflected here
});

export const courseRelationships = relations(course, ({ many }) => ({
  courseProduct: many(courseProductTable),
  userCourseAccesses: many(userCourseAccessTable, 

}));
