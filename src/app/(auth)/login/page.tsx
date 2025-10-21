"use client";

import Link from "next/link";
import { Store, FileText } from "lucide-react";
import ChainIcon from "@/components/icons/chain-icon";

export default function LoginChoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-light/10 to-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-light to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-medium to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          {/* Logo & Title */}
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-dark to-brand-medium rounded-xl flex items-center justify-center text-white shadow-lg">
                <ChainIcon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-dark to-brand-medium bg-clip-text text-transparent">
                UMKMChain
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Pilih Tipe Akun
            </h2>
            <p className="text-lg text-gray-600">
              Masuk sebagai UMKM atau Regulator
            </p>
          </div>

          {/* Choice Cards */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
            {/* UMKM Card */}
            <Link href="/login/umkm">
              <div className="group h-full bg-white rounded-3xl border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:border-accent transition-all duration-300 p-8 cursor-pointer">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-light/20 to-brand-medium/20 rounded-2xl flex items-center justify-center group-hover:from-brand-light/30 group-hover:to-brand-medium/30 transition-colors">
                    <Store className="w-8 h-8 text-brand-dark" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">UMKM</h3>
                    <p className="text-gray-600">
                      Masuk ke akun UMKM Anda untuk mengelola verifikasi
                      blockchain
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-dark flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      Kelola data bisnis
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-dark flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      Pantau status verifikasi
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-dark flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      Dapatkan sertifikat digital
                    </li>
                  </ul>

                  {/* Button */}
                  <button className="w-full mt-6 bg-gradient-to-r from-brand-dark to-brand-medium text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:from-brand-dark hover:to-brand-medium transition-all duration-200 shadow-md group-hover:scale-105">
                    Masuk sebagai UMKM
                  </button>
                </div>
              </div>
            </Link>

            {/* Regulator Card */}
            <Link href="/login/regulator">
              <div className="group h-full bg-white rounded-3xl border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:border-brand-medium transition-all duration-300 p-8 cursor-pointer">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-medium/20 to-brand-dark/20 rounded-2xl flex items-center justify-center group-hover:from-brand-medium/30 group-hover:to-brand-dark/30 transition-colors">
                    <FileText className="w-8 h-8 text-brand-dark" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Regulator
                    </h3>
                    <p className="text-gray-600">
                      Masuk sebagai regulator untuk memverifikasi UMKM
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-dark flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      Verifikasi data UMKM
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-dark flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      Kelola permohonan verifikasi
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-brand-dark flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      Akses dashboard lengkap
                    </li>
                  </ul>

                  {/* Button */}
                  <button className="w-full mt-6 bg-gradient-to-r from-brand-medium to-brand-dark text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:from-brand-medium hover:to-brand-dark transition-all duration-200 shadow-md group-hover:scale-105">
                    Masuk sebagai Regulator
                  </button>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/signup"
                className="text-brand-dark hover:text-brand-medium font-semibold"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
