"use client";

import Link from "next/link";
import { useState } from "react";

// Simple SVG Icons
const FileTextIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    className="w-6 h-6"
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

const ElegantButton = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
  >
    <span>{label}</span>
    <ArrowRightIcon />
  </Link>
);

// Data untuk langkah-langkah alur proyek
const flowSteps = [
  {
    title: "Registrasi UMKM / Aset & Dokumen",
    description:
      "UMKM mendaftarkan informasi usaha, aset, dan mengunggah dokumen pendukung (surat tanah, izin usaha, dll.) yang akan diproses pada jaringan blockchain.",
    icon: FileTextIcon,
  },
  {
    title: "Verifikasi Smart Contract & Digital Certificate",
    description:
      "Dokumen yang terdaftar diverifikasi oleh smart contract untuk menghasilkan Sertifikat Digital Unik (NFT/Hash) yang menjamin keaslian dan kepemilikan aset secara permanen.",
    icon: ShieldIcon,
  },
  {
    title: "Distribusi & Akses Universal",
    description:
      "Sertifikat digital dapat ditampilkan kepada pihak ketiga untuk pengajuan pinjaman/pendanaan, mengikuti tender, atau sebagai bukti legalitas global yang tepercaya.",
    icon: TrendingUpIcon,
  },
  {
    title: "Monitoring & Audit Real-Time Regulator",
    description:
      "Pemerintah dan regulator dapat memantau status legalitas (aktif, perpanjangan, atau kedaluwarsa) aset UMKM secara transparan dan real-time langsung di blockchain.",
    icon: SearchIcon,
  },
];

const InteractiveCard = ({
  step,
  isFlipped,
  onClick,
  index,
}: {
  step: (typeof flowSteps)[0];
  isFlipped: boolean;
  onClick: () => void;
  index: number;
}) => {
  const IconComponent = step.icon;
  const stepNumber = index + 1;

  return (
    <div
      className="w-full h-80 cursor-pointer perspective"
      onClick={onClick}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center items-start"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-blue-600 rounded-full shadow-md flex-shrink-0">
              {stepNumber}
            </div>
            <div className="text-blue-600">
              <IconComponent />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
            {step.title}
          </h3>
          <p className="text-sm text-gray-500">Klik untuk melihat detail...</p>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-blue-600 p-8 rounded-2xl shadow-lg border border-blue-400 flex flex-col justify-start text-white"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-xs font-semibold uppercase opacity-80 mb-3">
            Langkah {stepNumber}
          </p>
          <h3 className="text-lg font-bold mb-4 leading-snug">{step.title}</h3>
          <p className="text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function WelcomePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextStep = () => {
    if (currentStep < flowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsFlipped(false);
    }
  };

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      setCurrentStep(index);
      setIsFlipped(false);
    }
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">⛓</span>
            </div>
            <span className="text-lg font-bold text-gray-900">UMKMChain</span>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
              Transformasi Digital Aset UMKM
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Jaminan legalitas & transparansi bisnis Anda.
            </p>
          </div>

          {/* Steps Section */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600">
              ALUR PROYEK 4 LANGKAH
            </h2>

            <div className="flex gap-3 justify-center">
              {flowSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  disabled={index > currentStep}
                  className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                    index === currentStep
                      ? "bg-blue-600 text-white shadow-lg scale-110"
                      : index < currentStep
                      ? "bg-blue-200 text-blue-700 hover:bg-blue-300 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Current Step Card */}
            <InteractiveCard
              step={flowSteps[currentStep]}
              index={currentStep}
              isFlipped={isFlipped}
              onClick={handleCardClick}
            />
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300"
            >
              <span className="text-sm">Lewati</span>
            </Link>

            {currentStep === flowSteps.length - 1 ? (
              <ElegantButton href="/verify" label="Mulai Sekarang" />
            ) : (
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                aria-label="Langkah berikutnya"
              >
                <span className="text-sm">Lanjut</span>
                <ChevronRightIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
