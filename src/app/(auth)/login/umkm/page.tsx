"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import BackButton from "@/components/back-button";
import ChainIcon from "@/components/icons/chain-icon";
import { Eye, EyeOff } from "lucide-react";
import { CheckCircleIcon } from "lucide-react";

export default function UMKMLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Header with Back Button */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 relative z-10">
        <BackButton />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Side - Welcome Section */}
          <div className="space-y-8 hidden lg:block">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                  <ChainIcon className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  UMKMChain
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Masuk ke dashboard UMKM Anda dan kelola verifikasi blockchain
                dengan mudah.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-primary">
                  <CheckCircleIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Akses Dashboard Lengkap
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Pantau status verifikasi dan kelola data bisnis Anda
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-primary">
                  <CheckCircleIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Sertifikat Digital
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Dapatkan sertifikat blockchain yang tidak dapat diubah
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-primary">
                  <CheckCircleIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Keamanan Terjamin
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Teknologi blockchain terdepan untuk melindungi data Anda
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-card rounded-3xl border-2 border-border shadow-xl p-8 space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Masuk UMKM
                </h2>
                <p className="text-muted-foreground">
                  Kelola verifikasi blockchain UMKM Anda
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password Anda"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <span className="text-foreground">Ingat saya</span>
                  </label>
                  <Link
                    href="/forgot-password/umkm"
                    className="text-primary hover:text-accent font-medium"
                  >
                    Lupa password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isLoading ? "Memproses..." : "Masuk"}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center space-y-4 pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Belum punya akun?{" "}
                  <Link
                    href="/signup/umkm"
                    className="text-primary hover:text-accent font-semibold"
                  >
                    Daftar di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
