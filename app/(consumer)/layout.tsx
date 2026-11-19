import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/src/services/clerk";
import { ClerkProvider, Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
import { canAccessAdminPages } from "@/src/permissions/general";

export default function consumerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ClerkProvider>
        
        <Navbar />
        {children}
      </ClerkProvider>
    </>
  );
}
function Navbar() {
  return (
    <header className="relative flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container h-full items-center">
        <Link
          className="mr-auto text-lg text-black hover:underline  flex items-center"
          href="/"
        >
          WEB Simplified
        </Link>
        <Suspense>
          <Show when="signed-in">
            <AdminLink />
            <Link
              className="text-black hover:bg-accent/10 flex items-center px-2 text-sm"
              href="/courses"
            >
              My Courses
            </Link>

            <Link
              className="text-black hover:bg-accent/10 flex items-center px-2 text-sm"
              href="/purchases"
            >
              Purchase History
            </Link>
            <div className="size-8 self-center">
              <UserButton
                appearance={{
                  // iget to see the userbutton when im signed in
                  elements: {
                    userButtonAvatarBox: { width: "100%", height: "100%" },
                  },
                }}
              />
            </div>
          </Show>
        </Suspense>
        <Suspense>
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <Button className="self-center">
                <Link href="/sign-in">Sign-In</Link>
              </Button>
            </SignInButton>
          </Show>
        </Suspense>
      </nav>
    </header>
  );
}
async function AdminLink() {
  const user = await getCurrentUser();
  
  if(!canAccessAdminPages(user)) return null 

  return (
  <Link
    className="text-black hover:bg-accent/10 flex items-center px-2 text-sm"
    href="/admin"
  >
    Admin
  </Link>
  );
}
