import Link from "next/link";

type Props = { title: string; message: string };

export default function EmptyState({ title, message }: Props) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <p className="text-6xl font-extrabold text-green-800">৪০৪</p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">{message}</p>
      <Link
        href="/"
        className="btn mt-6 border-0 bg-green-800 text-white hover:bg-green-900"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}