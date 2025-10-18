"use client";

import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ChainIcon = () => (
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
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const RoleCard = ({
  title,
  description,
  icon,
  href,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
      isSelected
        ? "border-blue-600 bg-blue-50 shadow-lg"
        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300"
        }`}
      >
        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>
    </div>
  </button>
);

const BuildingIcon = () => (
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
      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
    />
  </svg>
);

const GovernmentIcon = () => (
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
      d="M12 3v1m6.364 1.636l-.707.707M21 12h-1m1.364 6.364l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M3 12h1M3.636 5.636l.707.707"
    />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"umkm" | "regulator" | null>(
    null
  );

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/login/${selectedRole}`);
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
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⛓</span>
              </div>
              <span className="text-lg font-bold text-gray-900">UMKMChain</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
              Masuk ke Akun Anda
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Pilih tipe akun untuk melanjutkan
            </p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <RoleCard
              title="Sebagai UMKM"
              description="Daftarkan aset dan dokumen bisnis Anda"
              icon={<BuildingIcon />}
              href="/login/umkm"
              isSelected={selectedRole === "umkm"}
              onClick={() => setSelectedRole("umkm")}
            />

            <RoleCard
              title="Sebagai Regulator"
              description="Pantau dan verifikasi aset UMKM"
              icon={<GovernmentIcon />}
              href="/login/regulator"
              isSelected={selectedRole === "regulator"}
              onClick={() => setSelectedRole("regulator")}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`w-full py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
                selectedRole
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 active:scale-95"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Lanjutkan
            </button>

            <div className="text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Daftar di sini
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-200">
              <Link
                href="/verify"
                className="text-blue-600 hover:underline font-medium"
              >
                Cek Verifikasi ID
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
