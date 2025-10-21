"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChainIcon from "@/components/icons/chain-icon";
import BackButton from "@/components/back-button";
import { ArrowRight, Check, Shield, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

const DashboardCard = () => (
  <motion.div
    className="relative w-full h-64 bg-card rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 cursor-grab active:cursor-grabbing border border-border/20"
    style={{
      perspective: "1000px",
      transformStyle: "preserve-3d",
      boxShadow:
        "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
    }}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
        <motion.div
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 border border-border/50 hover:border-accent transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Pendapatan
          </p>
          <p className="text-xl font-bold text-foreground mt-1">
            Rp 25.684.000
          </p>
        </motion.div>
        <motion.div
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 border border-border/50 hover:border-green-200 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Pertumbuhan
          </p>
          <p className="text-xl font-bold text-green-600 mt-1">+12,5%</p>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const FeatureCard = ({
  icon: IconComponent,
  title,
  description,
  rotation = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  rotation?: number;
}) => (
  <motion.div
    className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
    style={{
      transform: `rotate(${rotation}deg)`,
      transformOrigin: "center",
    }}
    whileHover={{ scale: 1.1, y: -4 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
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

        <motion.div
          className="max-w-md mx-auto w-full space-y-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                <label
                  htmlFor="idHash"
                  className="block text-sm font-semibold text-foreground mb-3"
                >
                  Masukkan ID Hash Anda
                </label>
                <motion.input
                  id="idHash"
                  type="text"
                  value={idHash}
                  onChange={(e) => setIdHash(e.target.value)}
                  placeholder="Masukkan ID Hash Anda..."
                  className="w-full px-5 py-4 bg-background border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 font-medium shadow-sm"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <motion.button
                  type="submit"
                  disabled={!idHash.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      Memverifikasi...
                    </>
                  ) : (
                    <>
                      Verifikasi
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
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
        </motion.div>
      </div>

      {/* Right Side - Hero Section with Blue Background */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-accent to-secondary flex-col justify-center items-center p-12 relative overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>

        {/* Main Content */}
        <div className="relative z-10 space-y-12 max-w-lg w-full">
          <motion.div
            className="text-white space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold leading-tight">
              Verifikasi Legalitas dan Aset UMKM
            </h2>
            <p className="text-lg leading-relaxed">
              UMKMChain menyediakan platform transparan untuk memverifikasi izin
              usaha, kepemilikan, dan sertifikasi aset.
            </p>
          </motion.div>

          <div className="relative h-96">
            {/* Main Dashboard Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <DashboardCard />
            </div>

            {/* Feature Cards */}
            <div className="absolute -top-2 -left-16 z-20">
              <FeatureCard
                icon={Shield}
                title="Aman"
                description="Verifikasi terenkripsi"
                rotation={-8}
              />
            </div>
            <div className="absolute -top-1 -right-16 z-20">
              <FeatureCard
                icon={Zap}
                title="Cepat"
                description="Proses instan"
                rotation={8}
              />
            </div>
            <div className="absolute -bottom-2 -left-12 z-20">
              <FeatureCard
                icon={Star}
                title="Terpercaya"
                description="Sertifikat resmi"
                rotation={6}
              />
            </div>
            <div className="absolute -bottom-2 -right-12 z-20">
              <FeatureCard
                icon={Check}
                title="Terverifikasi"
                description="Status jelas"
                rotation={-6}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            {[
              { value: "10K+", label: "Pengguna Aktif" },
              { value: "99%", label: "Waktu Aktif" },
              { value: "24/7", label: "Dukungan" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white mt-1 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
