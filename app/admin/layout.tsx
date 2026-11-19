import { Badge } from "@/components/ui/badge";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 my-8">

      {children}
      </main>
    </>
  );
}

function Navbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container">
        <div className="mr-auto flex items-center gap-2">
          <Link className="text-lg text-black hover:underline " href="/">
            WEB Simplified
          </Link>
          <Badge>Admin</Badge>
        </div>

        <Link
          className="text-black hover:bg-accent/10 flex items-center px-2 text-sm"
          href="/admin/courses"
        >
          Courses
        </Link>

        <Link
          className="text-black hover:bg-accent/10 flex items-center px-2 text-sm"
          href="/admin/products"
        >
          Products
        </Link>

        <Link
          className="text-black hover:bg-accent/10 flex items-center px-2 text-sm"
          href="/admin/sales"
        >
          Sales
        </Link>

        <div className="size-8 self-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "100%", height: "100%" },
              },
            }}
          />
        </div>
      </nav>
    </header>
  );
}
