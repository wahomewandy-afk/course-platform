import { db } from "@/src/drizzle/db"
import { course } from "@/src/drizzle/schema/courseTable"
import { revalidateCourseCache } from "./cache/courses"
import { eq } from "drizzle-orm"

export async function insertCourse(data: typeof course.$inferInsert) {
  const [newCourse] = await db.insert(course).values(data).returning()

  if (newCourse == null) throw new Error("Failed to create course")
  revalidateCourseCache(newCourse.id)

  return newCourse
}


export async function updateCourse(id: string, data: typeof course.$inferInsert) {
  const [updatedCourse] = await db.update(course).set(data). where(eq(course.id, id)).returning()

  if (updatedCourse == null) throw new Error("Failed to update course")
  revalidateCourseCache(updatedCourse.id)

  return updatedCourse
}

export async function deleteCourse(id: string) {
  const [deletedCourse] = await db
    .delete(course)
    .where(eq(course.id, id))
    .returning()

  if (deletedCourse == null) throw new Error("Failed to delete course")
  revalidateCourseCache(deletedCourse.id)

  return deletedCourse
}
