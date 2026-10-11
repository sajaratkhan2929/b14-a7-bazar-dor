"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import SocialButtons from "./social-buttons";

export default function SigninForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  // Protected page theke redirect hoye ashle toast dekhao
  const isProtected = params.get("protected");
  useEffect(() => {
    if (isProtected) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", { id: "protected" });
    }
  }, [isProtected]);

  // Protected page theke ashle login er por sei page e pathabo
  const redirect = params.get("redirect");
  const next =
    redirect && redirect.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন।";
      setError(msg);
      toast.error(msg);
      return;
    }

    setError("");
    setLoading(true);
    const { error } = await signIn.email({ email, password });

    if (error) {
      const msg =
        error.status === 401
          ? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।"
          : (error.message ?? "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে।");
    router.push(next);
    router.refresh();
  }

  const input =
    "h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={input}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={input}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn h-11 w-full border-0 bg-green-700 text-white hover:bg-green-800 disabled:opacity-70"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "সাইন ইন"
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-500">
        <span className="h-px flex-1 bg-gray-200" />
        অথবা
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialButtons action="সাইন ইন" />

      <p className="mt-5 text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}