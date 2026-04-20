"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = [
  { slug: "all", label: "All", href: "/" },
  { slug: "general", label: "General", href: "/?category=general" },
] as const;

export function CategoryBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="bg-white" aria-label="Categories">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-3 sm:px-6">
        {CATEGORIES.map((cat) => {
          const isActive =
            isHome &&
            (cat.slug === "general"
              ? true
              : cat.slug === "all"); /* General active for now */
          return (
            <Link
              key={cat.slug}
              href={cat.href}
              className={`text-sm font-medium transition-colors ${
                isActive
                  ? "text-foreground border-b-2 border-foreground pb-0.5"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
