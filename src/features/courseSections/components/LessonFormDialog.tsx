"use client"

import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CourseSectionStatus, LessonStatus } from "@/src/drizzle/schema"
import { LessonForm } from "./LessonForm"

export function LessonFormDialog({
  
  sections,
  defaultSectionId,
    lesson,
  children,
}: {
 
  children: ReactNode
  sections: { id: string; name: string; status: CourseSectionStatus }[],
  defaultSectionId?: string
  lesson?: {
    id: string
    name: string
    status:LessonStatus
    youtubeVideoId: string
    description: string| null
    sectionId: string
  }
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {lesson == null ? "New Lesson" : `Edit ${lesson.name}`}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <LessonForm
            sections={sections}
            
            onSuccess={() => setIsOpen(false)}
            lesson={lesson}
            defaultSectionId={defaultSectionId}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
