import Image from "next/image";
import BanglaDate from "./bangla-date";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 md:grid-cols-[1fr_auto] md:gap-10">
        <div>
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            <BanglaDate />
          </span>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-base text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-0 bg-green-700 text-white shadow-md hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/bazar-hero.png"
            alt=""
            width={320}
            height={260}
            priority
            className="h-auto w-52 sm:w-60 md:w-64"
          />
        </div>
      </div>
    </section>
  );
}