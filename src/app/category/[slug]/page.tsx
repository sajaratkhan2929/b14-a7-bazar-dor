import { getCategory, getProductsByCategory } from "@/lib/api";
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold text-green-950">
          <span className="grid size-12 place-items-center rounded-xl bg-green-100 text-2xl">
            {icon}
          </span>
          {title}
        </h1>
        <SortDropdown value={order} />
      </div>
      <ProductGrid products={sortProducts(products, order)} />
    </div>
  );
}