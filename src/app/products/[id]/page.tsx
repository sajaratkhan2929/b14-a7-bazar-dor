
import Link from "next/link";
import Image from "next/image";

const API_BASE =
  "https://api.api-store.workers.dev/api/bazardor";

type Market = {
  market?: string;
  name?: string;
  division?: string;
  min?: number;
  max?: number;
};

type Product = {
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image?: string;
  unit?: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir: string;
    pct: number;
  };
  markets?: Market[];
};

function bn(value: number | string) {
  return new Intl.NumberFormat("bn-BD").format(Number(value));
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${API_BASE}/products/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    const data = await response.json();

    // Supports APIs that return either a product or { product: ... }.
    return data.product ?? data.data ?? data;
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product || !product.nameBn) {
    return (
      <main className="min-h-screen bg-[#f7f9f5] px-4 py-20 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          পণ্যটি পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-gray-600">
          পণ্যটি মুছে ফেলা হয়েছে অথবা লোড করা যায়নি।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যাও
        </Link>
      </main>
    );
  }

  const rising = product.change?.dir === "up";
  const falling = product.change?.dir === "down";

  return (
    <main className="min-h-screen bg-[#f7f9f5] px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-medium text-green-800 hover:underline"
        >
          ← হোম পেজ
        </Link>

        <section className="mt-6 grid gap-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2">
          <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-[#f3f7ee] p-5">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.nameBn}
                width={420}
                height={320}
                unoptimized
                className="max-h-72 w-full object-contain"
              />
            ) : (
              <span className="text-8xl">
                {product.categoryIcon || "🛒"}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-800">
              {product.categoryIcon || "🛍️"}{" "}
              {product.categoryNameBn || "বাজার পণ্য"}
            </span>

            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-gray-500">
              একক: {product.unit || "প্রতি কেজি"}
            </p>

            <p className="mt-6 text-sm text-gray-500">আজকের দাম</p>

            <div className="mt-1 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-extrabold text-green-800">
                ৳{bn(product.today)}
              </span>
              <span className="text-gray-500">
                / {product.unit || "প্রতি কেজি"}
              </span>
            </div>

            {product.change && (
              <p
                className={`mt-4 w-fit rounded-lg px-3 py-2 text-sm font-semibold ${
                  rising
                    ? "bg-red-50 text-red-700"
                    : falling
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {rising ? "↑ দাম বেড়েছে" : falling ? "↓ দাম কমেছে" : "→ দাম অপরিবর্তিত"}
                {" "}
                {bn(Math.abs(product.change.pct))}%
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">গতকালের দাম</p>
                <p className="mt-1 text-xl font-bold text-gray-800">
                  {product.yesterday != null
                    ? `৳${bn(product.yesterday)}`
                    : "—"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">গত সপ্তাহের দাম</p>
                <p className="mt-1 text-xl font-bold text-gray-800">
                  {product.lastWeek != null
                    ? `৳${bn(product.lastWeek)}`
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            🏪 বিভিন্ন বাজারের দাম
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            বাজারভেদে সর্বনিম্ন ও সর্বোচ্চ দাম দেখে নাও।
          </p>

          {product.markets && product.markets.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b bg-gray-50 text-sm text-gray-600">
                    <th className="rounded-l-lg px-4 py-3">বাজার</th>
                    <th className="px-4 py-3">সর্বনিম্ন দাম</th>
                    <th className="rounded-r-lg px-4 py-3">সর্বোচ্চ দাম</th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market || market.name || "market"}-${index}`}
                      className="border-b last:border-0"
                    >
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {market.market || market.name || market.division || "স্থানীয় বাজার"}
                      </td>
                      <td className="px-4 py-4 font-semibold text-green-800">
                        {market.min != null ? `৳${bn(market.min)}` : "—"}
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {market.max != null ? `৳${bn(market.max)}` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-gray-50 p-5 text-gray-500">
              এই পণ্যের বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না।
            </p>
          )}
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            ← আরও পণ্য দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}