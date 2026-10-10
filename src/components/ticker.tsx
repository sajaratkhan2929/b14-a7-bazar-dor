import { getProducts } from "@/lib/api";
import { formatChange, toBn, unitBn } from "@/lib/bangla";

const toneClass = {
  up: "text-green-300",
  down: "text-red-300",
  flat: "text-gray-300",
};

export default async function Ticker() {
  const products = await getProducts().catch(() => []);
  if (products.length === 0) return null;

  return (
    <div
      className="overflow-hidden bg-green-900 text-white"
      role="marquee"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="ticker-track flex w-max py-2 text-sm">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-8 pr-8"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {products.map((p) => {
              const change = formatChange(p.change);
              return (
                <span key={p.id} className="whitespace-nowrap">
                  {p.image} {p.nameBn}{" "}
                  <span className="font-semibold">
                    {toBn(p.today.toLocaleString("en-IN"))} টাকা/{unitBn(p.unit)}
                  </span>{" "}
                  <span className={toneClass[change.tone]}>{change.text}</span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}