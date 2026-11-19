import { UserRole } from "@/src/drizzle/schema"

export function canCreateCourse({ role }: { role: UserRole | undefined }) {
  return role === "admin"
}

export function canUpdateCourse({ role }: { role: UserRole | undefined }) {
  return role === "admin"
}

export function canDeleteCourses({ role }: { role: UserRole | undefined }) {
  return role === "admin"
}
