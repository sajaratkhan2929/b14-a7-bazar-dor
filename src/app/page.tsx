
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Menu,
} from "lucide-react";

const categories = [
  { name: "চাল", emoji: "🍚", href: "/categories/chal" },
  { name: "ডাল", emoji: "🫘", href: "/categories/dal" },
  { name: "তেল", emoji: "🧴", href: "/categories/tel" },
  { name: "সবজি", emoji: "🥬", href: "/categories/shobji" },
  { name: "মাছ", emoji: "🐟", href: "/categories/fish" },
  { name: "মাংস", emoji: "🥩", href: "/categories/meat" },
  { name: "ডিম-দুধ", emoji: "🥛", href: "/categories/dim-dudh" },
  { name: "মসলা", emoji: "🌶️", href: "/categories/moshla" },
];

const marketUpdates = [
  { name: "স্বর্ণমতি চাল", price: "৬৫", unit: "টাকা/কেজি", change: "২.১%", up: true, emoji: "🍚" },
  { name: "মিনিকেট চাল", price: "৫৮", unit: "টাকা/কেজি", change: "১.৩%", up: false, emoji: "🍚" },
  { name: "সয়াবিন তেল", price: "১৭৫", unit: "টাকা/লিটার", change: "০.৮%", up: true, emoji: "🧴" },
  { name: "পেঁয়াজ", price: "৮০", unit: "টাকা/কেজি", change: "২.৫%", up: true, emoji: "🧅" },
  { name: "আলু", price: "৩৫", unit: "টাকা/কেজি", change: "২.৪%", up: false, emoji: "🥔" },
];

function MarketTicker() {
  return (
    <div className="ticker border-y border-[#e4eae3] bg-[#f1f7f0]">
      <div className="ticker-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
           
            {marketUpdates.map((item) => (
              <div
                key={`${copy}-${item.name}`}
                className="flex shrink-0 items-center gap-2 border-l border-[#dce5dc] px-6 py-3 text-sm"
              >
                <span>{item.emoji}</span>
                <span className="font-semibold text-[#293a30]">
                  {item.name}
                </span>
                <span className="text-[#536258]">
                  {item.price} {item.unit}
                </span>
                <span
                  className={`flex items-center gap-0.5 font-bold ${
                    item.up ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {item.up ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfcfa] text-[#26372c]">
      {/* Main Navbar */}
      <header className="border-b border-[#edf0eb]">
        <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            {/* Green circular logo with your cart image */}
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#078b43] p-2 shadow-sm sm:h-14 sm:w-14">
              <Image
                src="/images/logo-icon.png"
                alt="BazarDor cart logo"
                width={48}
                height={48}
                priority
                className="h-full w-full object-contain"
              />
            </span>

            <span className="leading-tight">
              <span className="block text-xl font-extrabold tracking-tight sm:text-2xl">
                বাজার দর
              </span>
              <span className="mt-1 block text-[10px] text-[#737d73] sm:text-xs">
                শনিবার, ১০ অক্টোবর, ২০২৬
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 sm:flex sm:gap-5">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-[#edf5ec]"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#078b43] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-900/15 transition hover:bg-[#067638]"
            >
              সাইন আপ
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <Link
              href="/login"
              className="rounded-lg bg-[#078b43] px-3 py-2 text-xs font-bold text-white"
            >
              সাইন ইন
            </Link>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="rounded-lg border border-[#e2e9df] p-2"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="border-b border-[#e6ebe4]">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto px-5 py-2.5 sm:justify-center sm:gap-4 sm:px-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                index === 0
                  ? "bg-[#e5f4e8] text-[#087e3d]"
                  : "text-[#3d493f] hover:bg-[#edf5ec]"
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Scrolling Market Price Ticker */}
      <MarketTicker />

      {/* Blank area for the next homepage section */}
      <section className="mx-auto min-h-[400px] max-w-[1440px] px-5 py-10 sm:px-8">
        {/* We will build the hero section here next. */}
      </section>
    </main>
  );
}