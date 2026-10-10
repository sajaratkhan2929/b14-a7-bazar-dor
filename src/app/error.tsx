"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-4 text-2xl font-bold">ডেটা লোড করা যায়নি</h1>
      <p className="mt-2 text-gray-600">
        ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।
      </p>
      <button
        onClick={reset}
        className="btn mt-6 border-0 bg-green-800 text-white hover:bg-green-900"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}