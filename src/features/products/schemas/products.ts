import { lessonStatusEnum, productStatuses } from "@/src/drizzle/schema";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Required"),
  priceInDollars: z.number().int().nonnegative(),
  description: z.string().min(1, "Required"),
  imageUrl: z.union([
    z.string().url("invalid url"),
    z.string().startsWith("/", "Invalid url"),
  ]),
  status: z.enum(productStatuses),
  courseIds: z.array(z.string()).min(1,"At least one course is required"),
});
