"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";

// SVG Icons
const ChevronLeftIcon = () => (
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
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const CheckCircleIcon = () => (
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

const ClockIcon = () => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XCircleIcon = () => (
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
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
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

export default function VerificationSearchPage() {
  const [searchId, setSearchId] = useState("");
  const [searchType, setSearchType] = useState<"umkm" | "regulator">("umkm");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  // Mock data untuk demo
  const mockData: Record<string, any> = {
    "NIB-001": {
      type: "umkm",
      namaUsaha: "PT Maju Jaya Indonesia",
      pemilik: "Budi Santoso",
      status: "Terverifikasi",
      tanggalVerifikasi: "2024-10-15",
      nomorSertifikat: "CERT-2024-001",
      statusSertifikat: "Aktif",
      bidangUsaha: "Manufaktur Tekstil",
      lokasi: "Jakarta, Indonesia",
    },
    "NIB-002": {
      type: "umkm",
      namaUsaha: "CV Kreatif Nusantara",
      pemilik: "Siti Nurhaliza",
      status: "Pending",
      tanggalVerifikasi: "-",
      nomorSertifikat: "CERT-2024-002",
      statusSertifikat: "Dalam Proses",
      bidangUsaha: "Kerajinan Tangan",
      lokasi: "Bandung, Indonesia",
    },
    "REG-001": {
      type: "regulator",
      nama: "Dinas Koperasi dan UMKM",
      instansi: "Pemerintah Kota Jakarta",
      status: "Terverifikasi",
      tanggalVerifikasi: "2024-09-20",
      nomorIdentitas: "REG-2024-001",
      statusAkun: "Aktif",
      wilayahTugas: "Jakarta Pusat",
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSearchResult(null);
    setIsSearching(true);

    setTimeout(() => {
      const result = mockData[searchId.toUpperCase()];
      if (result && result.type === searchType) {
        setSearchResult(result);
      } else {
        setError(
          "ID tidak ditemukan atau tipe tidak sesuai. Coba: NIB-001, NIB-002, atau REG-001"
        );
      }
      setIsSearching(false);
    }, 500);
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
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition"
            >
              <ChevronLeftIcon />
              <span className="text-sm font-semibold">Kembali</span>
            </Link>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
              Verifikasi Keaslian
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Cek status verifikasi sertifikat menggunakan ID
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tipe Pencarian
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="umkm"
                    checked={searchType === "umkm"}
                    onChange={(e) => setSearchType(e.target.value as "umkm")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 text-sm">UMKM (NIB)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="regulator"
                    checked={searchType === "regulator"}
                    onChange={(e) =>
                      setSearchType(e.target.value as "regulator")
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 text-sm">Regulator</span>
                </label>
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Masukkan ID{" "}
                {searchType === "umkm" ? "Usaha (NIB)" : "Regulator"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder={
                    searchType === "umkm"
                      ? "Contoh: NIB-001"
                      : "Contoh: REG-001"
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <SearchIcon />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Search Button */}
            <button
              type="submit"
              disabled={!searchId || isSearching}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {isSearching ? "Mencari..." : "Cari Verifikasi"}
            </button>
          </form>

          {/* Search Result */}
          {searchResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                {searchResult.status === "Terverifikasi" ? (
                  <>
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Status</p>
                      <p className="font-bold text-green-700">Terverifikasi</p>
                    </div>
                  </>
                ) : searchResult.status === "Pending" ? (
                  <>
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                      <ClockIcon />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Status</p>
                      <p className="font-bold text-yellow-700">Pending</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                      <XCircleIcon />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Status</p>
                      <p className="font-bold text-red-700">Ditolak</p>
                    </div>
                  </>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 pt-3 border-t border-blue-200">
                {searchType === "umkm" ? (
                  <>
                    <div>
                      <p className="text-xs text-gray-600">Nama Usaha</p>
                      <p className="font-semibold text-gray-900">
                        {searchResult.namaUsaha}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Pemilik</p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {searchResult.pemilik}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Bidang Usaha</p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {searchResult.bidangUsaha}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs text-gray-600">Nama Instansi</p>
                      <p className="font-semibold text-gray-900">
                        {searchResult.nama}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Wilayah Tugas</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {searchResult.wilayahTugas}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Login Navigation */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span>Masuk ke Akun</span>
              <ArrowRightIcon />
            </Link>

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
    </div>
  );
}
