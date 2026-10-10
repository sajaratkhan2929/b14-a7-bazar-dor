import ProductGridSkeleton from "@/components/product-grid-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton mb-3 h-8 w-64" />
      <div className="skeleton mb-8 h-4 w-96 max-w-full" />
      <ProductGridSkeleton count={8} />
    </div>
  );
}