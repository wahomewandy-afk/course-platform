"use client"

import { CourseSectionStatus } from "@/src/drizzle/schema"
import { SortableItem, SortableList } from "./SortableList"
import { ActionButton } from "./ActionButton"
import { SectionFormDialog } from "@/src/features/courseSections/components/SectionFormDialog"
import { deleteSection, updateSectionOrders } from "@/src/features/courseSections/action/sections"
import { DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EyeClosedIcon, Trash2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

export function SortableSectionList({
  courseId,
  sections,
}: {
  courseId: string
  sections: {
    id: string
    name: string
    status: CourseSectionStatus
  }[]
}) {
  return (
    <SortableList
      items={sections}
      onOrderChange={updateSectionOrders}
    >
      {(items) =>
        items.map((section,index) => (
          <SortableItem
            key={section.id}
            id={section.id}
            className="flex items-center gap-1"
          >
            <div
              className={cn(
                "contents",
                section.status === "private" && "text-muted-foreground"
              )}
            >
              {section.status === "private" && (
                <EyeClosedIcon className="size-4" />
              )}
              {section.name}
            </div>
            <SectionFormDialog section={section} courseId={courseId}>
              <DialogTrigger
                render={
                  <Button variant="outline" size="sm" className="ml-auto" />
                }
              >
                Edit
              </DialogTrigger>
            </SectionFormDialog>
            <ActionButton
              action={deleteSection.bind(null, section.id)}
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
