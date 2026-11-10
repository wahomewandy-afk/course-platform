import { ClerkProvider, Show,  SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export default function consumerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return(
  <>
  <ClerkProvider>

    <Navbar />
    <main>{children}</main>
  </ClerkProvider>
  </>
  )
}
function Navbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        {/* Moving this outside ensures it always shows up */}
        <Link className="mr-auto text-lg hover:underline px-2" href="/">
          WEB Simplified
        </Link>
        
        <Suspense>
           {/* @ts-ignore */}
          <Show when="SignedIn">
            <Link className="hover:bg-accent/10 flex items-center px-2" href="/courses">
              My Courses
            </Link>
          </Show>
        </Suspense>
      </nav>
    
    
    </header>
  )
 }