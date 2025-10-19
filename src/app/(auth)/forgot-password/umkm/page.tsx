"use client";

import React, { useState } from "react";
import Link from "next/link";
import BackButton from "@/components/back-button";
import ChainIcon from "@/components/icons/chain-icon";

const MailIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export default function UMKMForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    console.log("Mengirim tautan reset UMKM ke:", email);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 relative z-10">
        <BackButton />
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-150px)] px-6">
        <div className="w-full max-w-md bg-card rounded-3xl border-2 border-border shadow-xl p-8 space-y-8">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
                <MailIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Periksa Email Anda
              </h2>
              <p className="text-muted-foreground">
                Tautan reset password untuk akun UMKM Anda telah dikirim ke{" "}
                <span className="font-semibold text-primary">{email}</span>.
              </p>
              <div className="pt-4">
                <Link
                  href="/login/umkm"
                  className="text-primary hover:text-accent font-semibold"
                >
                  Kembali ke Login UMKM
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                    <ChainIcon className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    UMKMChain
                  </h1>
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Lupa Password UMKM
                </h2>
                <p className="text-muted-foreground">
                  Masukkan email akun UMKM Anda untuk mengatur ulang password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Email Akun UMKM
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? "Mengirim..." : "Kirim Tautan Reset"}
                </button>
              </form>

              <div className="text-center pt-4">
                <p className="text-muted-foreground">
                  Ingat password?{" "}
                  <Link
                    href="/login/umkm"
                    className="text-primary hover:text-accent font-semibold"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
