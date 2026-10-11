"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে।");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
          setLoading(false);
        },
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="btn btn-outline btn-sm gap-2 border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50 hover:text-red-700 sm:btn-md"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <LogOut aria-hidden className="size-4" />
      )}
      সাইন আউট
    </button>
  );
}