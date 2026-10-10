"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { SortOrder } from "@/lib/helpers";

export default function SortDropdown({ value }: { value: SortOrder }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-medium text-gray-700">সাজান:</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            router.push(v === "default" ? pathname : `${pathname}?sort=${v}`, {
              scroll: false,
            });
          }}
          className="h-10 cursor-pointer appearance-none rounded-lg border border-green-200 bg-white pl-3 pr-9 text-sm focus-visible:outline-2 focus-visible:outline-green-700"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-500"
        />
      </span>
    </label>
  );
}