import Link from "next/link";
import { formatChange, formatTaka, formatUnit } from "@/lib/bangla";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const badge = formatChange(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-green-500 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gray-100 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-gray-900">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">{formatUnit(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">আজকের দাম</p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="text-lg font-extrabold text-gray-900">
            {formatTaka(product.today)}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.text}
          </span>
        </div>
      </div>
    </Link>
  );
}