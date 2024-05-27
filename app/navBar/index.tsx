"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiTask } from "react-icons/si";
import UserDropdownMenu from "./userDropdownMenu";

const NavBar = () => {
  const currentPath = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];

  const isActiveLink = (link: string) => link === currentPath;
  const { status, data: session } = useSession();

  return (
    <nav className="flex justify-between p-4 border-b mb-4 items-center">
      <section className="flex gap-8 items-center">
        <Link href="/" className="flex gap-3 items-center">
          <SiTask size={40} />
          <span className="font-semibold">Task Pulse</span>
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              !isActiveLink(link.href) ? "text-zinc-600" : "text-blue-950"
            } hover:text-zinc-900 transition-colors`}
          >
            {link.name}
          </Link>
        ))}
      </section>
      <section className="flex gap-6">
        <section>
          {status === "authenticated" && <UserDropdownMenu session={session} />}
          {status !== "authenticated" && (
            <div className="flex gap-3">
              <Link href={"/api/auth/signin"}>Sign in</Link>
              {/* <Link href={"/register"}>Register</Link> */}
            </div>
          )}
        </section>
      </section>
    </nav>
  );
};

export default NavBar;
