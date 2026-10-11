import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/update-profile-form";

export const metadata: Metadata = { title: "তথ্য আপডেট করুন" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile/update");

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <h1 className="text-center text-2xl font-extrabold text-gray-900">
        তথ্য আপডেট করুন
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
      </p>

      <div className="mt-6">
        <UpdateProfileForm currentName={session.user.name} />
      </div>
    </div>
  );
}