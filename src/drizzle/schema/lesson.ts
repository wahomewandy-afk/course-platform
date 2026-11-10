import { pgTable, integer, pgEnum, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { course } from "./courseTable";
import { courseProductTable } from "./courseProduct";
import { courseSectionTable } from "./course Section";
import { userLessonCompleteTable } from "./userLessonComplete";

export const lessonStatuses = ["public", "private", "preview"] as const;
export type LessonStatus = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses);

export const lessonTable = pgTable("lesson", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  youtubeVideoId: text().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
    order: integer().notNull(),
  sectionId: uuid()
    .notNull()
    .references(() => courseSectionTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const lessonRelationships = relations(
  lessonTable,
  ({ one, many }) => ({
    section: one(courseSectionTable, {
      fields: [lessonTable.sectionId],
      references: [courseSectionTable.id],
    }),

    userLessonCompletes: many(userLessonCompleteTable)
  }),
);
