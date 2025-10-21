"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function VerifyPage() {
  const [selectedUMKM, setSelectedUMKM] = useState<number | null>(null);
  const [verificationNotes, setVerificationNotes] = useState<
    Record<number, string>
  >({});

  const pendingVerifications = [
    {
      id: 1,
      umkmName: "Toko Kriya Indah",
      owner: "Ahmad Wijaya",
      sector: "Kriya",
      address: "Jl. Sudirman No. 789, Yogyakarta",
      nib: "1234567890123458",
      submittedDate: "2024-01-20",
      documentsReady: true,
      completeness: 85,
      issues: ["Alamat tidak lengkap", "Foto usaha belum jelas"],
    },
    {
      id: 2,
      umkmName: "Warung Makan Jaya",
      owner: "Dewi Lestari",
      sector: "Kuliner",
      address: "Jl. Gatot Subroto No. 321, Surabaya",
      nib: "1234567890123459",
      submittedDate: "2024-01-18",
      documentsReady: true,
      completeness: 95,
      issues: [],
    },
    {
      id: 3,
      umkmName: "Butik Fashion Plus",
      owner: "Rini Handoko",
      sector: "Fashion",
      address: "Jl. Diponegoro No. 654, Medan",
      nib: "1234567890123460",
      submittedDate: "2024-01-12",
      documentsReady: false,
      completeness: 60,
      issues: ["KTP tidak jelas", "NIB belum diunggah", "Alamat tidak sesuai"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">
          Verifikasi Dokumen
        </h1>
        <p className="text-muted-foreground">
          Verifikasi dan validasi dokumen UMKM yang pending
        </p>
      </motion.div>

      {/* Verification List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {pendingVerifications.map((umkm) => (
          <motion.div
            key={umkm.id}
            variants={itemVariants}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {umkm.umkmName}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {umkm.owner}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {umkm.completeness}%
                  </p>
                  <p className="text-xs text-muted-foreground">Kelengkapan</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${umkm.completeness}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary/80"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Sektor", value: umkm.sector },
                  { label: "NIB", value: umkm.nib },
                  { label: "Diajukan", value: umkm.submittedDate },
                  {
                    label: "Status Dokumen",
                    value: umkm.documentsReady ? "Lengkap" : "Belum Lengkap",
                  },
                ].map((field, index) => (
                  <div key={index}>
                    <p className="text-xs text-muted-foreground font-semibold">
                      {field.label}
                    </p>
                    <p className="text-foreground font-medium text-sm mt-1">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Issues */}
              {umkm.issues.length > 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-red-600">
                      Masalah yang ditemukan:
                    </p>
                  </div>
                  <ul className="space-y-1">
                    {umkm.issues.map((issue, index) => (
                      <li
                        key={index}
                        className="text-sm text-red-600 flex items-start gap-2"
                      >
                        <span>•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expandable Details */}
              {selectedUMKM === umkm.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-border"
                >
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-2">
                      Alamat Usaha
                    </p>
                    <p className="text-foreground">{umkm.address}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Catatan Verifikasi
                    </label>
                    <textarea
                      value={verificationNotes[umkm.id] || ""}
                      onChange={(e) =>
                        setVerificationNotes({
                          ...verificationNotes,
                          [umkm.id]: e.target.value,
                        })
                      }
                      placeholder="Tambahkan catatan verifikasi..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 rounded-lg bg-green-500 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Setujui Verifikasi
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Tolak Verifikasi
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setSelectedUMKM(selectedUMKM === umkm.id ? null : umkm.id)
                }
                className="w-full py-2 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-all"
              >
                {selectedUMKM === umkm.id
                  ? "Sembunyikan Detail"
                  : "Lihat Detail & Verifikasi"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {pendingVerifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card border border-border rounded-xl"
        >
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Semua Terverifikasi
          </h3>
          <p className="text-muted-foreground">
            Tidak ada UMKM yang pending verifikasi
          </p>
        </motion.div>
      )}
    </div>
  );
}
