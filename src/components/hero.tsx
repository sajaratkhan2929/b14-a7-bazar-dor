import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-green-50 to-[#f6faf6]">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            আজকের বাজারদর
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-green-950 sm:text-4xl lg:text-5xl">
            প্রতিদিনের বাজার দর, এক নজরে
          </h1>
          <p className="mt-4 max-w-prose text-base text-gray-600 sm:text-lg">
            চাল, ডাল, সবজি, মাছ-মাংস — দেশের বিভিন্ন বাজারের আজকের দাম আর
            গতকালের তুলনা এক জায়গায় দেখুন।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-0 bg-green-800 text-white hover:bg-green-900 sm:btn-lg"
          >
            সব পণ্যের দাম দেখুন
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/bazar-hero.png"
            alt="বাজারের পণ্যের ছবি"
            width={560}
            height={460}
            priority
            className="h-auto w-full max-w-md md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
}