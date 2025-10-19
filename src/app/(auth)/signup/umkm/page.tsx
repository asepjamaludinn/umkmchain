"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import BackButton from "@/components/back-button";
import ChainIcon from "@/components/icons/chain-icon";

const EyeIcon = () => (
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
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);
const EyeOffIcon = () => (
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
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.921 17.921l3.536 3.536M3.543 3.543l3.536 3.536"
    />
  </svg>
);

export default function UMKMSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    businessName: "",
    sector: "",
    address: "",
    walletAddress: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi submit
    console.log("Data Pendaftaran UMKM:", formData);
    setTimeout(() => {
      setIsLoading(false);
      // Arahkan ke halaman selanjutnya atau tampilkan pesan sukses
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

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
                Daftar UMKM
              </h2>
              <p className="text-lg text-muted-foreground">
                Lengkapi data bisnis Anda untuk memulai verifikasi
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Pemilik */}
              <div className="space-y-2">
                <label
                  htmlFor="ownerName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Nama Pemilik
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  placeholder="Masukkan nama pemilik"
                  value={formData.ownerName}
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
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@perusahaan.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* No Telepon */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-foreground"
                >
                  No Telepon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+62 812 3456 7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Nama Usaha */}
              <div className="space-y-2">
                <label
                  htmlFor="businessName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Nama Usaha
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Masukkan nama usaha"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Sektor */}
              <div className="space-y-2">
                <label
                  htmlFor="sector"
                  className="block text-sm font-semibold text-foreground"
                >
                  Sektor / Bidang Usaha
                </label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground"
                  required
                >
                  <option value="">Pilih sektor</option>
                  <option value="kuliner">Kuliner</option>
                  <option value="fashion">Fashion</option>
                  <option value="kriya">Kriya</option>
                </select>
              </div>

              {/* Alamat */}
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-foreground"
                >
                  Alamat
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              {/* Wallet Address */}
              <div className="space-y-2">
                <label
                  htmlFor="walletAddress"
                  className="block text-sm font-semibold text-foreground"
                >
                  Wallet Address (Alamat Dompet Kripto)
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
                <p className="text-xs text-muted-foreground mt-1">
                  Dibutuhkan untuk interaksi blockchain. Pastikan alamat benar.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat password yang kuat"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
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
                  href="/login/umkm"
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
