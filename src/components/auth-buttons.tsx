"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

// DaisyUI dropdown focus chharle bondho hoy, tai click er por manually focus soriye dei
const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

export default function AuthButtons() {
  const router = useRouter();
  const { data, isPending } = useSession();

  if (isPending) {
    return (
      <div
        className="skeleton h-10 w-32 rounded-lg"
        aria-label="লোড হচ্ছে…"
      />
    );
  }

  if (!data) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-sm border-0 bg-green-700 text-white hover:bg-green-800 sm:btn-md"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = data;
  const firstName = user.name?.trim().split(" ")[0] || "প্রোফাইল";

  async function handleSignOut() {
    closeMenu();
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে।");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"),
      },
    });
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-gray-100"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-10 place-items-center rounded-full bg-green-100 text-lg font-bold text-green-800">
            {firstName.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="hidden max-w-28 truncate text-sm font-medium text-gray-800 sm:block">
          {firstName}
        </span>
        <ChevronDown aria-hidden className="size-4 text-gray-500" />
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-50 mt-2 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
      >
        <li className="px-3 py-2">
          <span className="pointer-events-none flex-col items-start gap-0 p-0">
            <span className="font-semibold text-gray-900">{user.name}</span>
            <span className="max-w-full truncate text-xs text-gray-500">
              {user.email}
            </span>
          </span>
        </li>
        <li>
          <Link href="/profile" onClick={closeMenu}>
            আমার প্রোফাইল
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleSignOut} className="text-red-600">
            সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}