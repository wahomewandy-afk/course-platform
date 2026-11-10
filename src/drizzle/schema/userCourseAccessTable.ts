import { pgTable, integer, pgEnum, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { course } from "./courseTable";
import { courseProductTable } from "./courseProduct";
import { userTable} from "./user";
export const userCourseAccessTable = pgTable("user_course_access", {
  id,

  userId: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  courseId: uuid()  
    .notNull()
    .references(() => course.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const userCourseAccessRelationships = relations(
  userCourseAccessTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [userCourseAccessTable.userId],
      references: [userTable.id],
    }),
    course: one(course, {
      fields: [userCourseAccessTable.courseId],
      references: [course.id],
    }),
  }),
);
