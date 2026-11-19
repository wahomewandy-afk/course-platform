import { PageHeader } from "@/components/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { getGlobalTag } from "@/lib/dataCache";
import { CourseTable } from "@/src/features/courses/components/CourseTable";
import { cacheTag } from "next/cache";
import Link from "next/link";
import { cache } from "react";
import { getCourseGlobalTag } from "@/src/features/courses/db/cache/courses";
import { db } from "@/src/drizzle/db";
import { course, courseSectionTable, course as DbCourseTable, userCourseAccessTable} from "@/src/drizzle/schema"
import { countDistinct } from "drizzle-orm";
import { lessonTable } from "@/src/drizzle/schema";
import { eq } from "drizzle-orm";
import { asc } from "drizzle-orm";
import { getUserCourseAccessGlobalTag } from "@/src/features/courses/db/cache/userCourseAccess";
import { getCourseSectionGlobalTag } from "@/src/features/courseSections/db/cache";
import { getLessonGlobalTag } from "@/src/features/lessons/db/cache/lessons";



export default async function CoursesPage() {

  const courses = await getCourses()
  return (
    <div className="container mx-auto px-4 my-6">
      <PageHeader title="Courses">
        <Link href="/admin/courses/new" className={buttonVariants()}>
          New Course
        </Link>
      </PageHeader>
      <CourseTable courses={courses}/>
    </div>
  );
}
 async function getCourses() {
  "use cache"
  cacheTag(getCourseGlobalTag(), getUserCourseAccessGlobalTag(), getCourseSectionGlobalTag(), getLessonGlobalTag() )
  return db.select({
    id:DbCourseTable.id,
    name:DbCourseTable.name,
   
    sectionsCount:countDistinct(courseSectionTable),
    lessonsCount:countDistinct(lessonTable),
    studentsCount:countDistinct(userCourseAccessTable)
 }) .from(DbCourseTable)
 .leftJoin(courseSectionTable, eq(courseSectionTable.courseId, DbCourseTable.id))

 .leftJoin(lessonTable, eq(lessonTable.sectionId, courseSectionTable.id))

 .leftJoin(userCourseAccessTable, eq(userCourseAccessTable.courseId, DbCourseTable.id))
 .orderBy(asc(DbCourseTable.name)).groupBy(DbCourseTable.id)
}



