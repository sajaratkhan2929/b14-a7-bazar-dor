
import Link from "next/link";
import {
  getProducts,
  getUnit,
  toBanglaNumber,
} 
from "@/lib/products";

function ProductCard({
  product,
}: {
  product: Awaited<ReturnType<typeof getProducts>>[number];
}) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group rounded-xl border border-[#e4ebe4] bg-white p-4 transition hover:-translate-y-1 hover:border-[#b7d8bf] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0f6ef] text-3xl">
          {product.image}
        </div>

        {isUp && (
          <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            ▲ {toBanglaNumber(Math.abs(product.change.pct))}%
          </span>
        )}

        {isDown && (
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
            ▼ {toBanglaNumber(Math.abs(product.change.pct))}%
          </span>
        )}

        {!isUp && !isDown && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            অপরিবর্তিত
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        {product.categoryNameBn}
      </p>

      <h3 className="mt-1 font-bold text-[#26342b]">
        {product.nameBn}
      </h3>

      <p className="mt-3 text-xl font-extrabold text-[#078b43]">
        ৳{toBanglaNumber(product.today)}
        <span className="ml-1 text-xs font-normal text-gray-500">
          / {getUnit(product.unit)}
        </span>
      </p>

      <p className="mt-2 text-xs text-gray-500">
        গতকাল: ৳{toBanglaNumber(product.yesterday)}
      </p>
    </Link>
  );
}

export default async function ProductSections() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    products = await getProducts();
  } catch {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <p className="rounded-xl bg-red-50 p-5 text-sm text-red-700">
          দুঃখিত, পণ্যের তথ্য এখন লোড করা যাচ্ছে না।
          কিছুক্ষণ পর আবার চেষ্টা করো।
        </p>
      </section>
    );
  }

  const rising = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 4);

  const falling = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 4);

  const sections = [
    {
      id: "rising",
      title: "আজ দাম বেড়েছে",
      icon: "↗",
      color: "text-red-600",
      products: rising,
    },
    {
      id: "falling",
      title: "আজ দাম কমেছে",
      icon: "↘",
      color: "text-green-700",
      products: falling,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#26342b] sm:text-2xl">
                <span className={`mr-2 ${section.color}`}>
                  {section.icon}
                </span>
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {section.subtitle}
              </p>
            </div>

            
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3">
            {section.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}

      <section id="products">
        <div className="mb-5">
          <h2 className="text-xl font-extrabold text-[#26342b] sm:text-2xl">
            সব পণ্য
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            মোট ৩৩টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}