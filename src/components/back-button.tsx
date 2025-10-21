"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground transition-all duration-200 font-medium shadow-sm hover:shadow-md"
      aria-label="Kembali"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Kembali</span>
    </button>
  );
}
