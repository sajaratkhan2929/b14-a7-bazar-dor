import { getProducts } from "@/lib/api";
import { formatChange, toBn, unitBn } from "@/lib/bangla";

const toneClass = {
  up: "text-green-600",
  down: "text-red-600",
  flat: "text-gray-500",
};

export default async function Ticker() {
  const products = await getProducts().catch(() => []);
  if (products.length === 0) return null;

  return (
    <div
      className="overflow-hidden border-b border-gray-200 bg-white"
      role="marquee"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="ticker-track flex w-max text-sm">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {products.map((p) => {
              const change = formatChange(p.change);
              return (
                <span
                  key={p.id}
                  className="flex items-center gap-2 whitespace-nowrap border-r border-gray-200 px-6 py-3"
                >
                  <span aria-hidden>{p.image}</span>
                  <span className="font-semibold text-gray-900">
                    {p.nameBn}
                  </span>
                  <span className="text-gray-600">
                    {toBn(p.today.toLocaleString("en-IN"))} টাকা/{unitBn(p.unit)}
                  </span>
                  <span className={`font-semibold ${toneClass[change.tone]}`}>
                    {change.text}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}