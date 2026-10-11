import type { Product } from "@/lib/types";
import ProductGrid from "./product-grid";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  tone?: "up" | "down" | "neutral";
};

const titleColor = {
  up: "text-green-700",
  down: "text-red-700",
  neutral: "text-green-950",
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
        <h2 className={`text-2xl font-extrabold ${titleColor[tone]}`}>
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