import type { Change } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export const formatTaka = (n: number) =>
  `${toBn(n.toLocaleString("en-IN"))} টাকা`;

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
};

export const unitBn = (unit: string) => UNIT_BN[unit.toLowerCase()] ?? unit;
export const formatUnit = (unit: string) => `প্রতি ${unitBn(unit)}`;

export function formatChange(change: Change) {
  const pct = toBn(change.pct.toFixed(1));
  if (change.dir === "up")
    return {
      tone: "up" as const,
      text: `▲ ${pct}%`,
      className: "bg-green-100 text-green-700",
    };
  if (change.dir === "down")
    return {
      tone: "down" as const,
      text: `▼ ${pct}%`,
      className: "bg-red-100 text-red-700",
    };
  return {
    tone: "flat" as const,
    text: `—${toBn("0.0")}%`,
    className: "bg-gray-100 text-gray-600",
  };
}

export const banglaDate = (date = new Date()) =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);