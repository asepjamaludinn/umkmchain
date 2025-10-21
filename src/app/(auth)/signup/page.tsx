"use client";

import Link from "next/link";
import { Store, FileText } from "lucide-react";
import ChainIcon from "@/components/icons/chain-icon";

export default function SignupChoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Background Gradient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          {/* Logo & Title */}
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                <ChainIcon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                UMKMChain
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Buat Akun Baru
            </h2>
            <p className="text-lg text-muted-foreground">
              Daftar sebagai UMKM atau Regulator
            </p>
          </div>

          {/* Choice Cards */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
            {/* UMKM Card */}
            <Link href="/signup/umkm">
              <div className="group h-full bg-card rounded-3xl border-2 border-border shadow-lg hover:shadow-2xl hover:border-accent transition-all duration-300 p-8 cursor-pointer">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:from-secondary/30 group-hover:to-accent/30 transition-colors">
                    <Store className="w-8 h-8 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Daftar UMKM
                    </h3>
                    <p className="text-muted-foreground">
                      Buat akun UMKM untuk memulai verifikasi blockchain
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {[
                      "Proses pendaftaran mudah",
                      "Verifikasi cepat dan aman",
                      "Dukungan pelanggan 24/7",
                    ].map((text, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-foreground"
                      >
                        <svg
                          className="w-5 h-5 text-primary flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        {text}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md group-hover:scale-105">
                    Daftar sebagai UMKM
                  </button>
                </div>
              </div>
            </Link>

            {/* Regulator Card */}
            <Link href="/signup/regulator">
              <div className="group h-full bg-card rounded-3xl border-2 border-border shadow-lg hover:shadow-2xl hover:border-accent transition-all duration-300 p-8 cursor-pointer">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-primary/30 transition-colors">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Daftar Regulator
                    </h3>
                    <p className="text-muted-foreground">
                      Buat akun Regulator untuk memverifikasi UMKM
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {[
                      "Verifikasi terstruktur",
                      "Dashboard manajemen lengkap",
                      "Keamanan tingkat enterprise",
                    ].map((text, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-foreground"
                      >
                        <svg
                          className="w-5 h-5 text-primary flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        {text}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full mt-6 bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md group-hover:scale-105">
                    Daftar sebagai Regulator
                  </button>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-accent font-semibold"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
