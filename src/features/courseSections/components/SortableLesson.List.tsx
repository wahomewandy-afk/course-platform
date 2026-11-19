"use client"

import { CourseSectionStatus, LessonStatus } from "@/src/drizzle/schema"
import { SortableItem, SortableList } from "@/components/SortableList"
import { ActionButton } from "@/components/ActionButton"
import { SectionFormDialog } from "@/src/features/courseSections/components/SectionFormDialog"
import { deleteSection, updateSectionOrders } from "@/src/features/courseSections/action/sections"
import { DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EyeClosedIcon, Trash2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { VideoIcon } from "lucide-react"
import { LessonFormDialog } from "./LessonFormDialog"
import { deleteLesson, updateLessonOrders } from "../../lessons/actions/lessons"


export function SortableLessonList({
  sections,
  lessons,
}: {
    sections:{
        id: string
        name: string
        status: CourseSectionStatus

    } []
  lessons: {
    id: string
    name: string
    status: LessonStatus
    youtubeVideoId: string
    description: string| null
    sectionId: string
  }[]
}) {
  return (
    <SortableList
      items={lessons}
      onOrderChange={updateLessonOrders}
    >
      {(items) =>
        items.map((lesson) => (
          <SortableItem
            key={lesson.id}
            id={lesson.id}
            className="flex items-center gap-1"
          >
            <div
              className={cn(
                "contents",
                lesson.status === "private" && "text-muted-foreground"
              )}
            >
              {lesson.status === "private" && (
                <EyeClosedIcon className="size-4" />
              )}
               {lesson.status === "preview" && (
                <VideoIcon className="size-4" />
              )}
              {lesson.name}
            </div>
            <LessonFormDialog lesson={lesson} sections={sections}>
              <DialogTrigger
                render={
                  <Button variant="outline" size="sm" className="ml-auto" />
                }
              >
                Edit
              </DialogTrigger>
            </LessonFormDialog>
            <ActionButton
              action={deleteLesson.bind(null, lesson.id)}
              requireAreYouSure
              variant="destructiveOutline"
              size="sm"
            >
              <Trash2Icon />
              <span className="sr-only">Delete</span>
            </ActionButton>
          </SortableItem>
        ))
      }
    </SortableList>
  )
}
