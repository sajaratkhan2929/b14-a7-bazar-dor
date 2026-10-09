
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getUnit, toBanglaNumber } from "@/lib/products";

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  tel: "তেল",
  sobji: "সবজি",
  shobji: "সবজি",
  mach: "মাছ",
  fish: "মাছ",
  mangsho: "মাংস",
  meat: "মাংস",
  "dim-dudh": "ডিম-দুধ",
  mosla: "মসলা",
  moshla: "মসলা",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName = categoryNames[category];

  if (!categoryName) notFound();

  const products = await getProducts();

  const filteredProducts = products.filter(
    (product) => product.categoryNameBn === categoryName
  );

  return (
    <main className="min-h-screen bg-[#fbfcfa] px-4 py-10 text-[#26372c] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-semibold text-[#078b43] hover:underline"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        <div className="mt-6 mb-8">
          <p className="text-sm text-[#078b43]">বাজার দর · পণ্যের তালিকা</p>
          <h1 className="mt-2 text-3xl font-extrabold">
            {categoryName}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            মোট {toBanglaNumber(filteredProducts.length)}টি পণ্য
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="rounded-xl border border-gray-200 bg-white p-6">
            এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="rounded-xl border border-[#e4ebe4] bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f0f6ef] text-3xl">
                  {product.image}
                </div>

                <p className="mt-4 font-bold">{product.nameBn}</p>

                <p className="mt-2 text-lg font-extrabold text-[#078b43]">
                  ৳{toBanglaNumber(product.today)}
                  <span className="ml-1 text-xs font-normal text-gray-500">
                    / {getUnit(product.unit)}
                  </span>
                </p>

                <span
                  className={`mt-3 inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    product.change.dir === "up"
                      ? "bg-red-50 text-red-600"
                      : product.change.dir === "down"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "▲ দাম বেড়েছে"
                    : product.change.dir === "down"
                      ? "▼ দাম কমেছে"
                      : "দাম অপরিবর্তিত"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}