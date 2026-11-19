import { UserRole, userTable } from "../drizzle/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getUserIdTag } from "../features/users/db/cache";
import { id } from "../drizzle/schemaHelpers";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { db } from "../drizzle/db";
import { cacheTag } from "next/cache";

const client = await clerkClient();

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  return {
    clerkUserId: userId,
    userId: sessionClaims?.dbId,
    role: sessionClaims?.role,
    user:
      allData && sessionClaims?.dbId != null
        ? await getuser(sessionClaims?.dbId)
        : undefined,

    redirectToSignIn,
  };
}

export async function syncClerkUserMetadata(user: {
  id: string;
  clerkUserId: string;

  role: UserRole;
}) {
  const client = await clerkClient();
  return client.users.updateUserMetadata(user.clerkUserId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role,
    },
  });
}

async function getuser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));
  console.log(" called");

  return db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  });
}
