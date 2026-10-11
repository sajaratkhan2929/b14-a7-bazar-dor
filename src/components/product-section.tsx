import type { Product } from "@/lib/types";
import ProductGrid from "./product-grid";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  tone?: "up" | "down" | "neutral";
};

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
  tone = "neutral",
}: Props) {
  return (
    <section id={id} className="scroll-mt-52 py-8">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 text-2xl font-extrabold text-black">
          {tone === "up" && (
            <span aria-hidden className="text-lg text-red-600">
              ▲
            </span>
          )}
          {tone === "down" && (
            <span aria-hidden className="text-lg text-green-600">
              ▼
            </span>
          )}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
      </div>
      {products.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
          আজ এই তালিকায় কোনো পণ্য নেই।
        </p>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}