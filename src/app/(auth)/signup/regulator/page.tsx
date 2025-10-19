"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import BackButton from "@/components/back-button";
import ChainIcon from "@/components/icons/chain-icon";
import { Eye, EyeOff } from "lucide-react";

export default function RegulatorSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: "",
    officerName: "",
    email: "",
    password: "",
    verificationCode: "",
    walletAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Data Pendaftaran Regulator:", formData);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Header with Back Button */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 relative z-10">
        <BackButton />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl bg-card rounded-3xl border-2 border-border shadow-xl p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                  <ChainIcon className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  UMKMChain
                </h1>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Daftar Regulator
              </h2>
              <p className="text-lg text-muted-foreground">
                Lengkapi data instansi Anda untuk memulai verifikasi
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Instansi */}
              <div className="space-y-2">
                <label
                  htmlFor="institutionName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Nama Instansi
                </label>
                <input
                  id="institutionName"
                  name="institutionName"
                  type="text"
                  placeholder="Masukkan nama instansi"
                  value={formData.institutionName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Nama Officer */}
              <div className="space-y-2">
                <label
                  htmlFor="officerName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Nama Officer
                </label>
                <input
                  id="officerName"
                  name="officerName"
                  type="text"
                  placeholder="Masukkan nama officer penanggung jawab"
                  value={formData.officerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground"
                >
                  Email Resmi
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@instansi.gov.id"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Password */}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat password yang kuat"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Kode Verifikasi */}
              <div className="space-y-2">
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-semibold text-foreground"
                >
                  Kode Verifikasi Instansi
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  placeholder="Masukkan kode verifikasi khusus"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Kode ini diberikan oleh administrator sistem.
                </p>
              </div>

              {/* Wallet Address */}
              <div className="space-y-2">
                <label
                  htmlFor="walletAddress"
                  className="block text-sm font-semibold text-foreground"
                >
                  Wallet Address
                </label>
                <input
                  id="walletAddress"
                  name="walletAddress"
                  type="text"
                  placeholder="Contoh: 0xAbC...DeF"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 rounded border-border text-primary mt-1 focus:ring-ring"
                  required
                />
                <label htmlFor="terms" className="text-sm text-foreground">
                  Saya setuju dengan{" "}
                  <Link
                    href="#"
                    className="text-primary hover:text-accent font-medium"
                  >
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link
                    href="#"
                    className="text-primary hover:text-accent font-medium"
                  >
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? "Memproses..." : "Daftar Sekarang"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center space-y-4 pt-4 border-t border-border">
              <p className="text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  href="/login/regulator"
                  className="text-primary hover:text-accent font-semibold"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
