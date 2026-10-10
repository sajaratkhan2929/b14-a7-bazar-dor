import ProductGridSkeleton from "@/components/product-grid-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="skeleton h-10 w-48" />
        <div className="skeleton h-10 w-44" />
      </div>
      <ProductGridSkeleton count={8} />
    </div>
  );
}