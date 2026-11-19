import { db } from "@/src/drizzle/db";
import { eq } from "drizzle-orm";
import { revalidateProductCache } from "./cache";
import { courseProductTable, productTable } from "@/src/drizzle/schema";

export async function insertProduct(
  data: Omit<typeof productTable.$inferInsert, "image"> & {
    courseIds: string[];
    imageUrl: string;
  },
) {
  const newProduct = await db.transaction(async (trx) => {
    const [newProduct] = await trx
      .insert(productTable)
      .values({
        ...data,
        image: data.imageUrl,
      })
      .returning();

    if (newProduct == null) {
      trx.rollback();
      throw new Error("Failed to create product");
    }

    await trx.insert(courseProductTable).values(
      data.courseIds.map((courseId) => ({
        productId: newProduct.id,
        courseId,
      })),
    );

    return newProduct;
  });

  revalidateProductCache(newProduct.id);
  return newProduct;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<typeof productTable.$inferInsert, "image">> & {
    courseIds: string[];
    imageUrl?: string;
  },
) {
  const updatedProduct = await db.transaction(async (trx) => {
    const [updatedProduct] = await trx
      .update(productTable)
      .set({
        ...data,
        ...(data.imageUrl != null && { image: data.imageUrl }),
      })
      .where(eq(productTable.id, id))
      .returning();

    if (updatedProduct == null) {
      trx.rollback();
      throw new Error("Failed to update product");
    }

    await trx
      .delete(courseProductTable)
      .where(eq(courseProductTable.productId, updatedProduct.id));

    await trx.insert(courseProductTable).values(
      data.courseIds.map((courseId) => ({
        productId: updatedProduct.id,
        courseId,
      })),
    );

    return updatedProduct;
  });

  revalidateProductCache(updatedProduct.id);
  return updatedProduct;
}

export async function deleteProduct(id: string) {
  const [deletedProduct] = await db
    .delete(productTable)
    .where(eq(productTable.id, id))
    .returning();

  if (deletedProduct == null) throw new Error("Failed to delete product");

  revalidateProductCache(deletedProduct.id);
  return deletedProduct;
}
