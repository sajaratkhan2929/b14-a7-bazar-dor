import { getCategories } from "@/lib/api";
import Navbar from "./navbar";

// Server component: category fetch kore client Navbar e pathay
export default async function SiteNav() {
  const categories = await getCategories().catch(() => []);
  return <Navbar categories={categories} />;
}