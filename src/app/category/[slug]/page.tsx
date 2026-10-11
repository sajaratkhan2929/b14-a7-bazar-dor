import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/bangla";
import { parseSort, sortProducts } from "@/lib/helpers";
import EmptyState from "@/components/empty-state";
import ProductGrid from "@/components/product-grid";
import SortDropdown from "@/components/sort-dropdown";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const order = parseSort((await searchParams).sort);

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (products.length === 0) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="ক্যাটাগরিটি ভুল হতে পারে অথবা এখানে এখনো কোনো পণ্য যোগ হয়নি।"
      />
    );
  }

  const title = category?.nameBn ?? products[0].categoryNameBn;
  const icon = category?.icon ?? products[0].categoryIcon;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-4 sm:p-5">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gray-100 text-3xl">
          {icon}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-green-950">{title}</h1>
          <p className="text-sm text-gray-500">
            এই ক্যাটাগরির পণ্যের আজকের দাম
          </p>
        </div>
      </section>

      <div className="mt-4 flex justify-end rounded-2xl border border-green-100 bg-white p-3">
        <SortDropdown value={order} />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        মোট {toBn(products.length)}টি পণ্য পাওয়া গেছে
      </p>

      <div className="mt-3">
        <ProductGrid products={sortProducts(products, order)} />
      </div>
    </div>
  );
}