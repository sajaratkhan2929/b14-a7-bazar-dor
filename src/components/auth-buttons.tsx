import Link from "next/link";

// Step 6 e ekhane session dekhe profile / sign-out dekhabo
export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="btn btn-sm border-0 bg-green-800 text-white hover:bg-green-900 sm:btn-md"
      >
        সাইন আপ
      </Link>
    </div>
  );
}