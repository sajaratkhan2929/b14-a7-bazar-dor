"use client";

import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/bangla";

const subscribe = () => () => {};

// Server e "" render hoy, client e date boshe. Tai hydration mismatch hoy na.
export default function BanglaDate({ className }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, () => banglaDate(), () => "");
  return <span className={className}>{text || "\u00A0"}</span>;
}