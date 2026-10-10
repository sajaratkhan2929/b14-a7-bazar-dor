import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { formatChange, formatTaka, formatUnit } from "@/lib/bangla";
import type { Market } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const markets = product.markets ?? [];
  const minPrice = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const maxPrice = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  const avgPrice = markets.length
    ? Math.round(
        markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
          markets.length
      )
    : product.today;

  const byDivision = new Map<string, Market[]>();
  for (const m of markets) {
    byDivision.set(m.division, [...(byDivision.get(m.division) ?? []), m]);
  }

  const badge = formatChange(product.change);
  const stats = [
    { label: "সর্বনিম্ন দাম", value: formatTaka(minPrice) },
    { label: "সর্বোচ্চ দাম", value: formatTaka(maxPrice) },
    { label: "গড় দাম", value: formatTaka(avgPrice) },
    { label: "আজকের দাম", value: formatTaka(product.today) },
  ];
  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href={`/category/${product.category}`}
        className="text-sm font-medium text-green-800 hover:underline"
      >
        ← {product.categoryNameBn} ক্যাটাগরিতে ফিরুন
      </Link>

      <section className="mt-4 rounded-2xl border border-green-100 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-green-50 text-5xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold text-green-950">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-gray-600">
              {product.categoryNameBn} ক্যাটাগরির পণ্য। {formatUnit(product.unit)}{" "}
              দাম আজ {formatTaka(product.today)}, গতকাল ছিল{" "}
              {formatTaka(product.yesterday)}।
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-800"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                {formatUnit(product.unit)}
              </span>
              <span
                className={`rounded-full px-3 py-1 font-semibold ${badge.className}`}
              >
                {badge.text}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-green-100 bg-white p-4"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="mt-1 text-xl font-extrabold text-green-900">
              {s.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-3 gap-4">
        {history.map((h) => (
          <div
            key={h.label}
            className="rounded-2xl bg-green-50 p-3 text-center"
          >
            <p className="text-xs text-gray-500">{h.label}</p>
            <p className="font-bold text-green-900">{formatTaka(h.value)}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-extrabold text-green-950">
          বাজারভিত্তিক আজকের দাম
        </h2>
        {markets.length === 0 ? (
          <p className="mt-4 text-gray-500">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[...byDivision.entries()].map(([division, list]) => (
              <div
                key={division}
                className="overflow-hidden rounded-2xl border border-green-100 bg-white"
              >
                <h3 className="bg-green-800 px-4 py-2 font-bold text-white">
                  {division}
                </h3>
                <ul className="divide-y divide-gray-100">
                  {list.map((m) => (
                    <li
                      key={m.market}
                      className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                    >
                      <span className="font-medium">{m.market}</span>
                      <span className="whitespace-nowrap text-gray-700">
                        {formatTaka(m.min)} – {formatTaka(m.max)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}