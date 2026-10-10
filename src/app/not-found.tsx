import EmptyState from "@/components/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      title="পেজটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে লিংকে গিয়েছেন সেটি ভুল অথবা পেজটি আর নেই।"
    />
  );
}