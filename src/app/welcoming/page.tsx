"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import Navbar from "@/components/layout/navbar";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  LayoutDashboard,
  Database,
} from "lucide-react";

export function ChainIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={`${className} aspect-square`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

interface Step {
  number: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactElement<{ className?: string }>;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Verifikasi Identitas",
    description: "Masukkan ID Hash Anda untuk memulai proses",
    details: [
      "Masukkan ID Hash unik Anda",
      "Sistem akan memvalidasi kredensial bisnis",
      "Proses berlangsung kurang dari 1 menit",
    ],
    icon: <ShieldCheck className="w-8 h-8" />,
  },
  {
    number: 2,
    title: "Verifikasi Data Bisnis",
    description: "Lengkapi informasi bisnis dan aset Anda",
    details: [
      "Unggah dokumen izin usaha",
      "Verifikasi kepemilikan aset",
      "Konfirmasi data perusahaan",
    ],
    icon: <FileText className="w-8 h-8" />,
  },
  {
    number: 3,
    title: "Sertifikasi Blockchain",
    description: "Data Anda akan disertifikasi di blockchain",
    details: [
      "Pencatatan di blockchain Ethereum",
      "Sertifikat digital yang tidak dapat diubah",
      "Akses dashboard verifikasi real-time",
    ],
    icon: <Database className="w-8 h-8" />,
  },
  {
    number: 4,
    title: "Akses Dashboard",
    description: "Kelola dan pantau status verifikasi Anda",
    details: [
      "Dashboard analytics lengkap",
      "Laporan verifikasi terperinci",
      "Integrasi dengan sistem bisnis Anda",
    ],
    icon: <LayoutDashboard className="w-8 h-8" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function WelcomingPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background overflow-hidden relative">
      <Navbar />

      {/* Decorative Gradients */}
      <motion.div
        animate={{ rotate: [0, 360, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-0 right-0 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl opacity-25 pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ rotate: [0, -360, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-0 left-0 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl opacity-25 pointer-events-none"
      ></motion.div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg">
              <ChainIcon className="w-10 h-10 sm:w-8 sm:h-8 text-primary-foreground aspect-square" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent py-2 text-center sm:text-left">
              Selamat datang di UMKMChain
            </h1>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Platform blockchain terpercaya untuk verifikasi legalitas dan aset
            UMKM. Ikuti 4 langkah mudah untuk memulai perjalanan digital Anda.
          </motion.p>
        </motion.div>

        {/* Steps Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Steps List */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {steps.map((step, index) => (
              <motion.button
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeStep === index
                    ? "border-primary bg-gradient-to-r from-secondary/20 to-accent/20 shadow-lg"
                    : "border-border bg-card hover:border-accent hover:shadow-md"
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 aspect-square w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeStep === index
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {React.cloneElement(step.icon, { className: "w-6 h-6" })}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg ${
                        activeStep === index
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Step Details */}
          <motion.div
            className="sticky top-24"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-card/70 backdrop-blur-lg rounded-3xl border-2 border-border/50 shadow-xl p-6 sm:p-8 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg aspect-square">
                      {React.cloneElement(steps[activeStep].icon, {
                        className: "w-8 h-8 sm:w-9 sm:h-9",
                      })}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        {steps[activeStep].title}
                      </h2>
                      <p className="text-muted-foreground">
                        {steps[activeStep].description}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-primary/50 via-accent/50 to-transparent"></div>

                  {/* Details */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Apa yang akan Anda lakukan:
                    </p>
                    <ul className="space-y-3">
                      {steps[activeStep].details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="flex-shrink-0 w-5 h-5 text-primary mt-0.5" />
                          <span className="text-foreground font-medium">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-muted-foreground uppercase">
                  <span>Progress</span>
                  <span className="text-primary">
                    {activeStep + 1} dari {steps.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    animate={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                    }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
              </div>

              {/* Button */}
              <motion.div
                className="pt-4"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <NextLink
                  href="/verify"
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  Mulai Verifikasi
                  <ArrowRight className="w-5 h-5" />
                </NextLink>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
