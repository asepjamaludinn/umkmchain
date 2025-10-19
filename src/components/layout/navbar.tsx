"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ChainIcon from "@/components/icons/chain-icon";

interface NavbarProps {
  showBackButton?: boolean;
  showAuthButtons?: boolean;
}

export default function Navbar({
  showBackButton = false,
  showAuthButtons = true,
}: NavbarProps) {
  const router = useRouter();

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                aria-label="Kembali"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Kembali</span>
              </button>
            )}

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground">
                <ChainIcon className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                UMKMChain
              </span>
            </Link>
          </div>

          {/* Right Side - Auth Buttons */}
          {showAuthButtons && (
            <div className="flex items-center gap-4">
              <Link
                href="/signup"
                className="px-6 py-2 text-primary hover:text-accent font-medium transition-colors"
              >
                Buat Akun
              </Link>
              <Link
                href="/login"
                className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-lg hover:shadow-md transition-all duration-200"
              >
                Masuk
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
