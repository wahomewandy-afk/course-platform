import { PageHeader } from "@/components/PageHeader";
import { db } from "@/src/drizzle/db";
import { course} from "@/src/drizzle/schema";
import { ProductForm } from "@/src/features/courses/components/ProductForm";
import { getCourseGlobalTag } from "@/src/features/courses/db/cache/courses";
import { asc } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default async function NewProductPage() {
  return (
    <div className="container my-6">
        <PageHeader title="New Product"/>
        
        <ProductForm courses={await getCourses()}/>

    </div>
  )
}

async function getCourses(){
  "use cache"
  cacheTag(getCourseGlobalTag())
  
  return db.query.course.findMany({
    orderBy: asc (course.name),
    columns:{id: true, name: true},
  })
  
}