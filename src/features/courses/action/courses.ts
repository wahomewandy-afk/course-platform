"use server"

import { courseSchema } from "../schema/courses"
import { z } from "zod"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/src/services/clerk"
import {
  canCreateCourse,
  canDeleteCourses,
  canUpdateCourse,
} from "../permissions/courses"
import {
  insertCourse,
  deleteCourse as deleteCourseDb,
  updateCourse as updateCourseDb,
} from "../db/courses"

export async function createCourse(unsafeData: z.infer<typeof courseSchema>) {
  const { success, data } = courseSchema.safeParse(unsafeData)

  if (!success || !canCreateCourse(await getCurrentUser())) {
    return { error: true, message: "There was an error creating your course" }
  }

  const course = await insertCourse(data)
  redirect(`/admin/courses/${course.id}/edit`)
}

export async function updateCourse(
  id: string,
  unsafeData: z.infer<typeof courseSchema>
) {
  const { success, data } = courseSchema.safeParse(unsafeData)

  if (!success || !canUpdateCourse(await getCurrentUser())) {
    return { error: true, message: "There was an error updating your course" }
  }

  await updateCourseDb(id, data)

  return { error: false, message: "Successfully updated your course" }
}

export async function deleteCourse(id: string) {
  if (!canDeleteCourses(await getCurrentUser())) {
    return { error: true, message: "Error deleting your course" }
  }

  await deleteCourseDb(id)
  return { error: false, message: "Successfully deleted your course" }
}
