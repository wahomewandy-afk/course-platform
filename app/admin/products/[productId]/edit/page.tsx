import { PageHeader } from "@/components/PageHeader";
import { db } from "@/src/drizzle/db";
import { course, productTable} from "@/src/drizzle/schema";
import { ProductForm } from "@/src/features/courses/components/ProductForm";
import { getCourseGlobalTag } from "@/src/features/courses/db/cache/courses";
import { getProductIdTag } from "@/src/features/products/db/cache";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";


export const instant = false

export default async function EditProductPage({
  params
}:{
  params : Promise<{ productId: string}>
}) {
  const {productId} = await params
const product = await getProduct(productId)


if(product == null) return notFound()

  return (
    <div className="container my-6">
        <PageHeader title="New Product"/>
        
        <ProductForm
         product={{...product,
         imageUrl:product.image,
         courseIds: product.courseProduct.map (c=> c.courseId)}} courses={await getCourses()}/>

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


async function getProduct(id: string) {
  "use cache"
   cacheTag(getProductIdTag(id))

   return db.query.productTable.findFirst({
    columns:{
      id:true,
      name: true,
      description:true,
      priceInDollars: true,
      status:true,
      image: true
    },
    where: eq(productTable.id, id),
    with:{courseProduct: {columns: { courseId:true}}}
   })
}