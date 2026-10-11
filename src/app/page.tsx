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
          title="আজ দাম বেড়েছে ▲"
          subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের"
          products={topRisers(products)}
          tone="up"
        />
        <ProductSection
          title="আজ দাম কমেছে ▼"
          subtitle="গতকালের তুলনায় সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের"
          products={topFallers(products)}
          tone="down"
        />
        <ProductSection
          id="সব-পণ্য"
          title="সব পণ্য"
          subtitle="সব পণ্যের আজকের গড় দাম আর গতকালের তুলনায় পরিবর্তন"
          products={products}
        />
      </div>
    </>
  );
}