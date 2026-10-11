"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";
import AuthButtons from "./auth-buttons";
import BanglaDate from "./bangla-date";

function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  const base =
    "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors";
  const active = "bg-green-700 text-white";
  const idle = "text-gray-700 hover:bg-gray-100";

  return (
    <>
      <Link
        href="/"
        aria-current={pathname === "/" ? "page" : undefined}
        className={`${base} ${pathname === "/" ? active : idle}`}
      >
        <span aria-hidden>🏠</span> হোম
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
            <span aria-hidden>{c.icon}</span> {c.nameBn}
          </Link>
        );
      })}
    </>
  );
}

export default function Navbar({ categories }: { categories: Category[] }) {
  return (
    <nav className="border-b border-gray-200 bg-[#fafcfa]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর লোগো"
              width={56}
              height={56}
              priority
              className="size-12 rounded-xl object-contain sm:size-14"
            />
            <span className="leading-tight">
              <span className="block text-xl font-extrabold text-gray-900 sm:text-2xl">
                বাজার দর
              </span>
              <BanglaDate className="block text-xs text-gray-600 sm:text-sm" />
            </span>
          </Link>

          <AuthButtons />
        </div>

        {/* Category links: alada row, choto screen e scroll kora jay */}
        <div className="-mx-4 flex items-center gap-1 overflow-x-auto border-t border-gray-200 px-4 py-2">
          <NavLinks categories={categories} />
        </div>
      </div>
    </nav>
  );
}