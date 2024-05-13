"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiTask } from "react-icons/si";

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

  return (
    <nav className="flex justify-between p-4 border-b mb-4 items-center">
      <Link href="/" className="flex gap-3 items-center">
        <SiTask size={40} />
        <span className="font-semibold">Task Pulse</span>
      </Link>
      <section className="flex gap-6">
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
    </nav>
  );
};

export default NavBar;
