
export const API_BASE =
  "https://api.api-store.workers.dev/api/bazardor";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  return response.json();
}

export function toBanglaNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

export function getUnit(unit: string): string {
  switch (unit) {
    case "kg":
      return "কেজি";
    case "litre":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "টি";
    default:
      return unit;
  }
}