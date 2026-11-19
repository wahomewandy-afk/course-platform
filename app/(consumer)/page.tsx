import { db } from "@/src/drizzle/db"
import { productTable } from "@/src/drizzle/schema"
import { ProductCard } from "@/src/features/courses/components/ProductCard"
import { getProductGlobalTag } from "@/src/features/products/db/cache"
import { wherePublicProducts } from "@/src/permissions/products"
import { asc } from "drizzle-orm"
import { cacheTag } from "next/cache"



export default async function HomePage() {
  const products = await getPublicProducts()
  return (
    <div className="container my-6">

    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {products.map(product => (
        <ProductCard  key={ product.id} {...product}/>
      ))}

    </div>
    </div>
  )
}
async function getPublicProducts(){
  "use cache"
  cacheTag(getProductGlobalTag()) 

  return db.query.productTable.findMany({
    columns:{
      id: true,
      name: true,
      description:true,
      priceInDollars:true,
      image:true

    },
    where: wherePublicProducts,
    orderBy:  asc(productTable.name)
  })
}