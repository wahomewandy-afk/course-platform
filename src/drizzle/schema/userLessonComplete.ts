import {
  pgTable,
  integer,
  pgEnum,
  uuid,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { course } from "./courseTable";
import { courseProductTable } from "./courseProduct";
import { userTable } from "./user";
import { userCourseAccessTable } from "./userCourseAccessTable";
import { lessonTable } from "./lesson";
export const userLessonCompleteTable = pgTable("user_lesson_complete", {
  userId: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  lessonId: uuid()
    .notNull()
    .references(() => lessonTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
},
(t)=> [primaryKey({ columns: [t.userId, t.lessonId] })]
)


export const userLessonCompleteRelationships = relations(
  userLessonCompleteTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [userLessonCompleteTable.userId],
      references: [userTable.id],
    }),
    lesson: one(lessonTable, {
      fields: [userLessonCompleteTable.lessonId],
      references: [lessonTable.id],
    }),
  }),
);
