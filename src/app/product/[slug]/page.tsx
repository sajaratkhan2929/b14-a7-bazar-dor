import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { formatChange, formatTaka, formatUnit, toBn } from "@/lib/bangla";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const markets = product.markets ?? [];
  const avgOf = (min: number, max: number) => (min + max) / 2;

  const cheapest = markets.reduce<(typeof markets)[number] | null>(
    (best, m) => (best === null || m.min < best.min ? m : best),
    null
  );
  const costliest = markets.reduce<(typeof markets)[number] | null>(
    (best, m) => (best === null || m.max > best.max ? m : best),
    null
  );
  const avgPrice = markets.length
    ? markets.reduce((sum, m) => sum + avgOf(m.min, m.max), 0) / markets.length
    : product.today;

  const badge = formatChange(product.change);

  const summary = [
    {
      label: "সর্বনিম্ন দাম",
      value: formatTaka(cheapest?.min ?? product.today),
      note: cheapest ? cheapest.market : "—",
      color: "text-green-700",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: formatTaka(costliest?.max ?? product.today),
      note: costliest ? costliest.market : "—",
      color: "text-red-600",
    },
    {
      label: "গড় দাম",
      value: formatTaka(Math.round(avgPrice * 100) / 100),
      note: `${toBn(markets.length)}টি বাজারের গড়`,
      color: "text-gray-900",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav
        aria-label="breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
      >
        <Link href="/" className="hover:text-green-800 hover:underline">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-800 hover:underline"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-700">{product.nameBn}</span>
      </nav>

      <section className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-gray-100 text-4xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-gray-900">
              {product.nameBn}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800"
              >
                {product.categoryNameBn}
              </Link>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-700">
                {formatUnit(product.unit)}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              গতকাল {formatUnit(product.unit)} দাম ছিল{" "}
              <b>{formatTaka(product.yesterday)}</b>, আজ{" "}
              <b>{formatTaka(product.today)}</b>।
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl border border-green-100 bg-green-50 px-5 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-green-900">
            {toBn(product.today.toLocaleString("en-IN"))}
          </p>
          <p className="text-xs text-gray-600">
            টাকা / {formatUnit(product.unit).replace("প্রতি ", "")}
          </p>
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.text}
          </span>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {summary.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gray-200 p-4"
            >
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`mt-1 text-2xl font-extrabold ${s.color}`}>
                {s.value}
              </p>
              <p className="mt-1 text-xs text-gray-500">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>
        {markets.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">বাজার</th>
                  <th className="px-4 py-3 font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((m) => (
                  <tr key={`${m.division}-${m.market}`}>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {m.market}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.division}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(m.min)}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(m.max)}</td>
                    <td className="px-4 py-3 text-right font-bold">
                      {formatTaka(avgOf(m.min, m.max))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}