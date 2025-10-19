"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import ChainIcon from "@/components/icons/chain-icon";

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

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

interface Step {
  number: number;
  title: string;
  description: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: 1,
    title: "Verifikasi Identitas",
    description: "Masukkan ID Hash Anda untuk memulai proses verifikasi",
    details: [
      "Masukkan ID Hash unik Anda",
      "Sistem akan memvalidasi kredensial bisnis",
      "Proses berlangsung kurang dari 1 menit",
    ],
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
  },
];

export default function WelcomingPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <Navbar />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
              <ChainIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Selamat datang di UMKMChain
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Platform blockchain terpercaya untuk verifikasi legalitas dan aset
            UMKM. Ikuti 4 langkah mudah untuk memulai perjalanan digital Anda.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Steps List */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeStep === index
                    ? "border-primary bg-gradient-to-r from-secondary/20 to-accent/20 shadow-lg"
                    : "border-border bg-card hover:border-accent hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      activeStep === index
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg transition-colors duration-300 ${
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
              </button>
            ))}
          </div>

          {/* Right Side - Step Details */}
          <div className="sticky top-24">
            <div className="bg-card rounded-3xl border-2 border-border shadow-xl p-8 space-y-6">
              {/* Step Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                    {steps[activeStep].number}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {steps[activeStep].title}
                    </h2>
                    <p className="text-muted-foreground">
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-primary/50 via-accent/50 to-transparent"></div>

              {/* Details List */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Apa yang akan Anda lakukan:
                </p>
                <ul className="space-y-3">
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mt-0.5 text-primary-foreground">
                        <CheckCircleIcon />
                      </div>
                      <span className="text-foreground font-medium">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {activeStep + 1} dari {steps.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 space-y-3">
                <Link
                  href="/verify"
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                >
                  Mulai Verifikasi
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
