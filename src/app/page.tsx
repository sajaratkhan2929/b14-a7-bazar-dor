import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/helpers";
import Hero from "@/components/hero";
import ProductSection from "@/components/product-section";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4">
        <ProductSection
          title="আজ দাম বেড়েছে "
          
          products={topRisers(products)}
          tone="up"
        />
        <ProductSection
          title="আজ দাম কমেছে"
          
          products={topFallers(products)}
          tone="down"
        />
        <ProductSection
          id="সব-পণ্য"
          title="সব পণ্য"
          subtitle="মোট ৩৩টি পণ্য দেখানো হচ্ছে"
          products={products}
        />
      </div>
    </>
  );
}