
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBasket, ChevronRight } from "lucide-react";

const categories = [
  { name: "চাল", href: "/categories/chal" },
  { name: "ডাল", href: "/categories/dal" },
  { name: "তেল", href: "/categories/tel" },
  { name: "সবজি", href: "/categories/sobji" },
  { name: "মাছ", href: "/categories/mach" },
  { name: "মাংস", href: "/categories/mangsho" },
  { name: "ডিম-দুধ", href: "/categories/dim-dui" },
  { name: "মসলা", href: "/categories/mosla" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 12);

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const today = new Intl.DateTimeFormat("bn-BD", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setDate(today.format(new Date()));

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-green-100/80 bg-white/95 shadow-md backdrop-blur-xl"
          : "border-b border-green-100 bg-white"
      }`}
    >
      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="বাজারদর হোম"
        >
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-green-700 text-white shadow-sm transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
            <Image
              src="/images/logo-icon.png"
              alt="BazarDor"
              width={38}
              height={38}
              className="object-contain"
            />
          </span>

          <span>
            <span className="block text-xl font-extrabold tracking-tight text-green-800">
              বাজারদর
            </span>
            <span className="block text-[10px] font-medium tracking-[0.16em] text-gray-500">
              প্রতিদিনের বাজার, এক নজরে
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {date && (
            <span className="mr-2 text-xs text-gray-500">{date}</span>
          )}

          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-green-800 transition-all duration-200 hover:bg-green-50 hover:text-green-700"
          >
            লগইন
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md active:translate-y-0"
          >
            নিবন্ধন করুন
            <ChevronRight className="ml-1 inline-block" size={15} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 text-green-800 transition hover:bg-green-50 md:hidden"
          aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Category navigation */}
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="border-t border-gray-100/80"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-3 py-2 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const active = pathname === category.href;

            return (
              <Link
                key={category.href}
                href={category.href}
                className={`relative shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                }`}
              >
                {category.name}

                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 animate-in bg-green-700" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Animated mobile menu */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="space-y-2 border-t border-green-100 bg-white px-4 py-4">
            {date && (
              <p className="pb-2 text-xs text-gray-500">{date}</p>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                className="rounded-xl border border-green-100 px-4 py-3 text-center text-sm font-semibold text-green-800 transition hover:bg-green-50"
              >
                লগইন
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-green-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-800"
              >
                নিবন্ধন করুন
              </Link>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50"
            >
              <ShoppingBasket size={18} />
              হোম পেজ
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}