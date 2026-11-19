"use server"

import { z } from "zod"
import { getCurrentUser } from "@/src/services/clerk"
import { lessonSchema } from "../schemas/lessons"
import {
  canCreateLesson,
  canDeleteLesson,
  canUpdateLesson,
} from "@/src/permissions/lessons"
import {
  getNextCourseLessonOrder,
  insertLesson,
  updateLesson as updateLessonDb,
  deleteLesson as deleteLessonDb,
  updateLessonOrders as updateLessonOrdersDb,
} from "../../users/db/lessons"

export async function createLesson(
  unsafeData: z.infer<typeof lessonSchema>
) {
  const { success, data } = lessonSchema.safeParse(unsafeData)

  if (!success || !canCreateLesson(await getCurrentUser())) {
    return { error: true, message: "There was an error creating your lesson" }
  }

  const order = await getNextCourseLessonOrder(data.sectionId)

  await insertLesson({ ...data, order })
  return { error: false, message: "Successfully created your lesson" }
}

export async function updateLesson(
  id: string,
  unsafeData: z.infer<typeof lessonSchema>
) {
  const { success, data } = lessonSchema.safeParse(unsafeData)

  if (!success || !canUpdateLesson(await getCurrentUser())) {
    return { error: true, message: "There was an error updating your lesson" }
  }

  await updateLessonDb(id, data)

  return { error: false, message: "Successfully updated your lesson" }
}

export async function deleteLesson(id: string) {
  if (!canDeleteLesson(await getCurrentUser())) {
    return { error: true, message: "Error deleting your lesson" }
  }

  await deleteLessonDb(id)
  return { error: false, message: "Successfully deleted your lesson" }
}

export async function updateLessonOrders(lessonIds: string[]) {
  if (lessonIds.length === 0 || !canUpdateLesson(await getCurrentUser())) {
    return { error: true, message: "Error reordering your lessons" }
  }

  await updateLessonOrdersDb(lessonIds)
  return { error: false, message: "Successfully reordered your lessons" }
}
