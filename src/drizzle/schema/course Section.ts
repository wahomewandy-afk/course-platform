import { pgTable, integer, pgEnum, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { course } from "./courseTable";
import { courseProductTable } from "./courseProduct";
import { lessonTable } from "./lesson";

export const courseSectionStatuses = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusEnum = pgEnum(
  "course_section_status",
  courseSectionStatuses,
);

export const courseSectionTable = pgTable("course_section", {
  id,
  name: text().notNull(),

  status: courseSectionStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid()
    .notNull()
    .references(() => course.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const courseSectionRelationships = relations(
  courseSectionTable,
  ({ one, many }) => ({
    course: one(course, {
      fields: [courseSectionTable.courseId],
      references: [course.id],
    }),
    lessons: many(lessonTable),
  }),
);

// this is what is in the cousrse section file. We have lessons and quizzes in the course section table.
//  Each course section can have many lessons and quizzes,
//  but each lesson and quiz belongs to only one course section.mport { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
