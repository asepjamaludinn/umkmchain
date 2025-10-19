"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChainIcon from "@/components/icons/chain-icon";
import BackButton from "@/components/back-button";

const ArrowRightIcon = () => (
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
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
  </svg>
);
const LightningIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const DashboardCard = () => (
  <div
    className="relative w-full h-64 bg-card rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-grab active:cursor-grabbing border border-border/20"
    style={{
      perspective: "1000px",
      transformStyle: "preserve-3d",
      boxShadow:
        "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-card to-accent/10 rounded-3xl opacity-60"></div>

    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-20"></div>

    <div className="relative z-10 space-y-4 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Penjualan
          </p>
          <p className="text-3xl font-bold text-foreground mt-1">
            Rp 189.374.000
          </p>
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
          <ChainIcon className="w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 border border-border/50 hover:border-accent transition-colors">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Pendapatan
          </p>
          <p className="text-xl font-bold text-foreground mt-1">
            Rp 25.684.000
          </p>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 border border-border/50 hover:border-green-200 transition-colors">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Pertumbuhan
          </p>
          <p className="text-xl font-bold text-green-600 mt-1">+12,5%</p>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  rotation = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  rotation?: number;
}) => (
  <div
    className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
    style={{
      transform: `rotate(${rotation}deg)`,
      transformOrigin: "center",
    }}
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
        {Icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </div>
);

export default function VerifyPage() {
  const [idHash, setIdHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idHash.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      router.push(`/verify/data?id=${encodeURIComponent(idHash)}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form with White Background */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-background via-secondary/10 to-background flex flex-col justify-center p-8 lg:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl opacity-10"></div>

        <div className="absolute top-8 left-8 z-20">
          <BackButton />
        </div>

        <div className="max-w-md mx-auto w-full space-y-8 relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
              <ChainIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              UMKMChain
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground leading-tight">
                Verifikasi Identitas Anda
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Masukkan ID Hash Anda untuk memverifikasi kredensial bisnis dan
                mengakses dashboard Anda.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Masukkan ID Hash Anda
                </label>
                <input
                  type="text"
                  value={idHash}
                  onChange={(e) => setIdHash(e.target.value)}
                  placeholder="Masukkan ID Hash Anda..."
                  className="w-full px-5 py-4 bg-background border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 font-medium shadow-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!idHash.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isLoading ? "Memverifikasi..." : "Verifikasi"}
                  {!isLoading && <ArrowRightIcon />}
                </button>
              </div>
            </form>

            {/* Footer Links */}
            <div className="flex gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
              <Link
                href="/login"
                className="hover:text-primary transition font-medium"
              >
                Sudah punya akun?
              </Link>
              <span className="text-muted">•</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section with Blue Background */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-accent to-secondary flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 space-y-12 max-w-lg w-full">
          <div className="text-white space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Verifikasi Legalitas dan Aset UMKM
            </h2>
            <p className="text-lg  leading-relaxed">
              UMKMChain menyediakan platform transparan untuk memverifikasi izin
              usaha, kepemilikan, dan sertifikasi aset.
            </p>
          </div>

          <div className="relative h-96">
            {/* Main Dashboard Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <DashboardCard />
            </div>

            {/* Feature Cards */}
            <div className="absolute -top-2 -left-16 z-20">
              <FeatureCard
                icon={<ShieldIcon />}
                title="Aman"
                description="Verifikasi terenkripsi"
                rotation={-8}
              />
            </div>
            <div className="absolute -top-1 -right-16 z-20">
              <FeatureCard
                icon={<LightningIcon />}
                title="Cepat"
                description="Proses instan"
                rotation={8}
              />
            </div>
            <div className="absolute -bottom-2 -left-12 z-20">
              <FeatureCard
                icon={<StarIcon />}
                title="Terpercaya"
                description="Sertifikat resmi"
                rotation={6}
              />
            </div>
            <div className="absolute -bottom-2 -right-12 z-20">
              <FeatureCard
                icon={<CheckIcon />}
                title="Terverifikasi"
                description="Status jelas"
                rotation={-6}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <p className="text-3xl font-bold text-white">10K+</p>
              <p className="text-sm text-white mt-1 font-medium">
                Pengguna Aktif
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <p className="text-3xl font-bold text-white">99%</p>
              <p className="text-sm text-white mt-1 font-medium">Waktu Aktif</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-sm text-white mt-1 font-medium">Dukungan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  