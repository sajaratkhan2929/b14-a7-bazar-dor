import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SigninForm from "@/components/signin-form";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SigninPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <h1 className="text-center text-3xl font-extrabold text-gray-900">
        সাইন ইন
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        আপনার অ্যাকাউন্টে ঢুকে পণ্যের বিস্তারিত দাম দেখুন।
      </p>

      <div className="mt-6">
        {/* useSearchParams ba form er jonno Suspense lage, na hole build e error ashe */}
        <Suspense
          fallback={<div className="skeleton h-96 w-full rounded-2xl" />}
        >
          <SigninForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-gray-600 hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}