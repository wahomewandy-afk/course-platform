import { PageHeader } from "@/components/PageHeader";
import { SortableSectionList } from "@/components/SortableSectionList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { db } from "@/src/drizzle/db";
import { course, courseSectionTable, lessonTable } from "@/src/drizzle/schema";
import { CourseForm } from "@/src/features/courses/components/CourseForm";
import { getCourseIdTag } from "@/src/features/courses/db/cache/courses";
import { LessonFormDialog } from "@/src/features/courseSections/components/LessonFormDialog";
import { SectionFormDialog } from "@/src/features/courseSections/components/SectionFormDialog";
import { SortableLessonList } from "@/src/features/courseSections/components/SortableLesson.List";
import { getCourseSectionCourseTag } from "@/src/features/courseSections/db/cache";
import { getLessonCourseTag } from "@/src/features/lessons/db/cache/lessons";
import { asc, eq } from "drizzle-orm";
import { EyeClosedIcon, PlusIcon } from "lucide-react";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export const instant = false;

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  if (course == null) return notFound();

  return (
    <div className="container my-6">
      <PageHeader title={course.name} />
      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sections</CardTitle>
              <SectionFormDialog courseId={course.id}>
                <DialogTrigger render={<Button variant="outline" />}>
                  <PlusIcon />
                  New Section
                </DialogTrigger>
              </SectionFormDialog>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <SortableSectionList
                courseId={courseId}
                sections={course.courseSections}
              />
            </CardContent>
          </Card>

          <hr className="my-4" />

          {course.courseSections.map((section) => (
            <Card key={section.id} className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle
                  className={cn(
                    "flex items-center gap-2",
                    section.status === "private" && "text-muted-foreground"
                  )}
                >
                  {section.status === "private" && <EyeClosedIcon />}
                  {section.name}
                </CardTitle>
                <LessonFormDialog
                  defaultSectionId={section.id}
                  sections={course.courseSections}
                >
                  <DialogTrigger render={<Button variant="outline" />}>
                    <PlusIcon />
                    New Lesson
                  </DialogTrigger>
                </LessonFormDialog>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <SortableLessonList
                  sections={course.courseSections}
                  lessons={section.lessons}
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CourseForm course={course} />
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function getCourse(id: string) {
  "use cache";
  cacheTag(
    getCourseIdTag(id),
    getCourseSectionCourseTag(id),
    getLessonCourseTag(id)
  );

  return db.query.course.findFirst({
    columns: { id: true, name: true, description: true },
    where: eq(course.id, id),
    with: {
      courseSections: {
        orderBy: asc(courseSectionTable.order),
        columns: { id: true, status: true, name: true },
        with: {
          lessons: {
            orderBy: asc(lessonTable.order),
            columns: {
              id: true,
              name: true,
              status: true,
              description: true,
              youtubeVideoId: true,
              sectionId: true,
            },
          },
        },
      },
    },
  });
}
