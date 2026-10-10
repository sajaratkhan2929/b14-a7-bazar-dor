import type { Product } from "./types";

export const topRisers = (products: Product[], n = 6) =>
  products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

export const topFallers = (products: Product[], n = 6) =>
  products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

export type SortOrder = "default" | "asc" | "desc";

export const parseSort = (value?: string): SortOrder =>
  value === "asc" || value === "desc" ? value : "default";

// today number, tai Bengali numeral e string sort er jhamela nei
export function sortProducts(products: Product[], order: SortOrder) {
  if (order === "default") return products;
  return [...products].sort((a, b) =>
    order === "asc" ? a.today - b.today : b.today - a.today
  );
}