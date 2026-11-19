import { db } from "@/src/drizzle/db";
import { userTable } from "@/src/drizzle/schema/user";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { revalidateUserCache } from "./cache";
// we want to insert a user into the database, we will use the insert function from drizzle-orm

export async function insertUser(data: typeof userTable.$inferInsert) {
  const [newuser] = await db
    .insert(userTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [userTable.clerkUserId],
      set: data,
    });

  if (newuser == null) {
    throw new Error("Failed to create user");
  }
  revalidateUserCache(newuser.id);
  return newuser;
}

export async function updateuser(
  { clerkUserId }: { clerkUserId: string },
  data: Partial<typeof userTable.$inferInsert>,
) {
  const [updateduser] = await db
    .update(userTable)

    .set(data)
    .where(eq(userTable.clerkUserId, clerkUserId))
    .returning();

  if (updateduser == null) {
    throw new Error("Failed to update user");
  }
  revalidateUserCache(updateduser.id);
  return updateduser;
}



export async function deleteUser(
  { clerkUserId }: { clerkUserId: string },
 
) {
  const [deleteduser] = await db
    .update(userTable)

    .set({ deletedAt: new Date() ,
        email: "redacted@deleted.com",
        name: "Deleted User",
        clerkUserId: "deleted",
        imageUrl: null,
        
    })
    .where(eq(userTable.clerkUserId, clerkUserId))
    .returning();

  if (deleteduser == null) {
  return null;
  }
  revalidateUserCache(deleteduser.id);
  return deleteduser;
}




