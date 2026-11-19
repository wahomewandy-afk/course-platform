"use client"

import { LessonStatus, lessonStatuses } from "@/src/drizzle/schema"
import { lessonSchema } from "../../lessons/schemas/lessons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon"
import { Textarea } from "@/components/ui/textarea"
import { actionToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createLesson, updateLesson } from "../../lessons/actions/lessons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { YoutubeVideoPlayer } from "./YoutubeVideoPlayer"

export function LessonForm({
  sections,
  defaultSectionId,
  onSuccess,
  lesson,
}: {
  sections: {
    id: string
    name: string
  }[]
  onSuccess?: () => void
  defaultSectionId?: string
  lesson?: {
    id: string
    name: string
    status: LessonStatus
    youtubeVideoId: string
    description: string | null
    sectionId: string
  }
}) {
  const initialSectionId =
    lesson?.sectionId ?? defaultSectionId ?? sections[0]?.id ?? ""

  const form = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: lesson?.name ?? "",
      status: lesson?.status ?? "public",
      youtubeVideoId: lesson?.youtubeVideoId ?? "",
      description: lesson?.description ?? "",
      sectionId: initialSectionId,
    },
  })

  async function onSubmit(values: z.infer<typeof lessonSchema>) {
    const action =
      lesson == null ? createLesson : updateLesson.bind(null, lesson.id)
    const data = await action(values)
    actionToast({ actionData: data })
    if (!data.error) onSuccess?.()
  }
const videoId = form.watch("youtubeVideoId")
console.log("videoId")
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabelIcon />
                Name
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtubeVideoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabelIcon />
                YouTube Video ID
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sectionId"
          render={({ field }) => {
            const selectedSection = sections.find((s) => s.id === field.value)
            return (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <Select
                  defaultValue={initialSectionId}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>
                        {selectedSection?.name ?? "Select a section"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                defaultValue={lesson?.status ?? "public"}
                onValueChange={(val) => field.onChange(val)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lessonStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-20 resize-none"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
        {videoId && (
        <div className="aspect-video">

        <YoutubeVideoPlayer videoId={videoId}/>
        </div>
        )}
      </form>
    </Form>
  )
}
