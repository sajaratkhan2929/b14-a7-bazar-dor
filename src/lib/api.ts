import type { Category, Product } from "./types";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://openapi.programming-hero.com/api/bazardor";

async function get<T>(path: string): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// List endpoint array hote pare, abar { data: [...] } o hote pare
function toList<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;
    for (const key of ["data", "products", "categories", "items"]) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
}

export async function getProducts(): Promise<Product[]> {
  return toList<Product>(await get("/products"));
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return toList<Product>(
    await get(`/products?category=${encodeURIComponent(slug)}`)
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const found = toList<Product>(
    await get(`/products?slug=${encodeURIComponent(slug)}`)
  )[0];
  if (!found) return null;
  // markets shoho full data pete id diye abar fetch
  return (await get<Product>(`/products/${found.id}`)) ?? found;
}

export async function getCategories(): Promise<Category[]> {
  return toList<Category>(await get("/categories"));
}

export async function getCategory(slug: string): Promise<Category | null> {
  const c = await get<Category>(`/categories/${encodeURIComponent(slug)}`);
  return c && typeof c === "object" && "slug" in c ? c : null;
}