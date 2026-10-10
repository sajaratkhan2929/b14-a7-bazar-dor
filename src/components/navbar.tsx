"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";
import AuthButtons from "./auth-buttons";
import BanglaDate from "./bangla-date";

function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  const base =
    "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors";
  const active = "bg-green-800 text-white";
  const idle = "text-gray-700 hover:bg-green-100";

  return (
    <>
      <Link
        href="/"
        aria-current={pathname === "/" ? "page" : undefined}
        className={`${base} ${pathname === "/" ? active : idle}`}
      >
        🏠 হোম
      </Link>
      {categories.map((c) => {
        const href = `/category/${c.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={c.slug}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`${base} ${isActive ? active : idle}`}
          >
            {c.icon} {c.nameBn}
          </Link>
        );
      })}
    </>
  );
}

export default function Navbar({ categories }: { categories: Category[] }) {
  return (
    <nav className="border-b border-green-100 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="shrink-0 leading-tight">
            <span className="block text-xl font-extrabold text-green-800">
              🛒 বাজার দর
            </span>
            <BanglaDate className="block text-xs text-gray-500" />
          </Link>

          <div className="hidden flex-wrap items-center justify-center gap-1 lg:flex">
            <NavLinks categories={categories} />
          </div>

          <AuthButtons />
        </div>

        {/* Mobile / tablet: second row, scroll kora jay */}
        <div className="-mx-4 flex items-center gap-1 overflow-x-auto px-4 pb-3 lg:hidden">
          <NavLinks categories={categories} />
        </div>
      </div>
    </nav>
  );
}