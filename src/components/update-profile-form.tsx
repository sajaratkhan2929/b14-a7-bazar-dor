"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

export default function UpdateProfileForm({
  currentName,
}: {
  currentName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();

    if (!name) return fail("নাম খালি রাখা যাবে না।");
    if (name === currentName) return fail("নতুন একটি নাম লিখুন।");

    setError("");
    setLoading(true);
    const { error } = await updateUser({ name });

    if (error) {
      setLoading(false);
      return fail(error.message ?? "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    }

    toast.success("আপনার তথ্য আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          নাম
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={currentName}
          placeholder="আপনার নতুন নাম"
          className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
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
          "তথ্য আপডেট করুন"
        )}
      </button>

      <Link
        href="/profile"
        className="block text-center text-sm text-gray-600 hover:text-green-700"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </form>
  );
}