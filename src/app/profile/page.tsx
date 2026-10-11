import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/sign-out-button";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile");

  const { user } = session;

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-600">
        আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
      </p>

      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex min-w-0 items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="size-16 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-green-100 text-2xl font-bold text-green-800">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-gray-900">তথ্য</h2>

        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-xs text-gray-500">নাম</dt>
            <dd className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900">
              {user.name}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500">ইমেইল</dt>
            <dd className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900">
              {user.email}
            </dd>
          </div>
        </dl>

        <Link
          href="/profile/update"
          className="btn mt-5 h-11 w-full border-0 bg-green-700 text-white hover:bg-green-800"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}