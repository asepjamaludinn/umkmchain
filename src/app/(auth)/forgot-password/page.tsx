"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-50 font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col p-8 sm:p-10 border border-gray-100">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 128, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(128, 0, 255, 0.1) 100%)",
          }}
        >
          <div className="absolute bottom-0 -right-1/4 w-3/4 h-3/4 rounded-full bg-blue-500 opacity-5 blur-3xl transform translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-8">
          {/* Header */}
          <div>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-4 text-sm font-semibold"
            >
              <svg
                className="w-4 h-4"
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
              Kembali
            </Link>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⛓</span>
              </div>
              <span className="text-lg font-bold text-gray-900">UMKMChain</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
              {isSubmitted ? "Cek Email Anda" : "Lupa Password?"}
            </h1>
            <p className="mt-2 text-base text-gray-600">
              {isSubmitted
                ? "Kami telah mengirimkan link reset password ke email Anda. Silakan cek inbox atau folder spam."
                : "Masukkan email Anda dan kami akan mengirimkan link untuk reset password."}
            </p>
          </div>

          {/* Form atau Success Message */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Mengirim..." : "Kirim Link Reset"}
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Back to Login Button */}
              <Link
                href="/login"
                className="w-full py-3 px-4 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center block"
              >
                Kembali ke Login
              </Link>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">atau</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
