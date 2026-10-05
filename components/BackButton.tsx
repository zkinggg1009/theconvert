"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-sm font-medium text-[var(--muted)] transition-[color,transform] duration-150 hover:-translate-x-0.5 hover:text-[var(--foreground)] active:translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] motion-reduce:transition-none"
    >
      <span aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  );
}
