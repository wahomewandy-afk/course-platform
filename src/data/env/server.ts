import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
// code creates a strict security guard and validator for your environment
//  variables using a popular library called T3 Env and a validation tool called Zod.

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string().min(1),
    // .min(8, "Password must be at least 8 characters long")
    // zod validation ensures that the password is at least 8 characters long, which is a common security requirement for passwords. This helps to prevent weak passwords that can be easily guessed or cracked by attackers.
    DB_USER: z.string().min(1),
// z string().min(1) ensures that the database username is not empty, which is important for connecting to the database securely.
    DB_NAME: z  .string().min(1),
    DB_HOST: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  }
});
