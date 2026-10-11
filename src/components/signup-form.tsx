"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import SocialButtons from "./social-buttons";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name || !email || !password || !confirm) {
      return fail("সবগুলো ঘর পূরণ করুন।");
    }
    if (password.length < 8) {
      return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    }
    if (password !== confirm) {
      return fail("দুটি পাসওয়ার্ড মিলছে না।");
    }

    setError("");
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });

    if (error) {
      setLoading(false);
      if (error.code?.startsWith("USER_ALREADY_EXISTS")) {
        return fail("এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।");
      }
      return fail(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  const input =
    "h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200";
  const label = "mb-1 block text-sm font-medium";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className={label}>
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="আপনার পুরো নাম"
            className={input}
          />
        </div>

        <div>
          <label htmlFor="email" className={label}>
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
          <label htmlFor="password" className={label}>
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={input}
          />
        </div>

        <div>
          <label htmlFor="confirm" className={label}>
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
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
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-500">
        <span className="h-px flex-1 bg-gray-200" />
        অথবা
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialButtons action="সাইন আপ" />

      <p className="mt-5 text-center text-sm text-gray-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}