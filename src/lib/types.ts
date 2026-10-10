export type Change = { dir: "up" | "down" | "flat"; pct: number };

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

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
  change: Change;
  markets?: Market[];
};

export type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};