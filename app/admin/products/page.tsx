import { PageHeader } from "@/components/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { getGlobalTag } from "@/lib/dataCache";
import { CourseTable } from "@/src/features/courses/components/CourseTable";
import { cacheTag } from "next/cache";
import Link from "next/link";
import { cache } from "react";
import { getCourseGlobalTag } from "@/src/features/courses/db/cache/courses";
import { db } from "@/src/drizzle/db";
import {
  course,
  courseProductTable,
  courseSectionTable,
  course as DbCourseTable,
  purchaseTable,
  userCourseAccessTable,
} from "@/src/drizzle/schema";
import { countDistinct } from "drizzle-orm";
import { lessonTable } from "@/src/drizzle/schema";
import { eq } from "drizzle-orm";
import { asc } from "drizzle-orm";
import { getUserCourseAccessGlobalTag } from "@/src/features/courses/db/cache/userCourseAccess";
import { getCourseSectionGlobalTag } from "@/src/features/courseSections/db/cache";
import { getLessonGlobalTag } from "@/src/features/lessons/db/cache/lessons";
import { getProductGlobalTag } from "@/src/features/products/db/cache";
import { productTable as DbProductTable } from "@/src/drizzle/schema";
import { ProductTable } from "@/src/features/courses/components/ProductTable";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="container mx-auto px-4 my-6">
      <PageHeader title="Products">
        <Link href="/admin/products/new" className={buttonVariants()}>
          New Product
        </Link>
      </PageHeader>
      <ProductTable products={products} />
    </div>
  );
}
async function getProducts() {
  "use cache";
  cacheTag(getProductGlobalTag());
  return db
    .select({
      id: DbProductTable.id,
      name: DbProductTable.name,
      status: DbProductTable.status,
      priceInDollars: DbProductTable.priceInDollars,
      description: DbProductTable.description,
      imageUrl: DbProductTable.image,
      coursesCount: countDistinct(courseProductTable.courseId),
      customersCount: countDistinct(purchaseTable.userId),
    })
    .from(DbProductTable)
    .leftJoin(purchaseTable, eq(purchaseTable.productId, DbProductTable.id))

    .leftJoin(
      courseProductTable,
      eq(courseProductTable.productId, DbProductTable.id),
    )
    .orderBy(asc(DbProductTable.name))
    .groupBy(DbProductTable.id);
}
