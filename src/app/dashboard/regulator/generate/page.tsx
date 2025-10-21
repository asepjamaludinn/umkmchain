"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Download, Zap } from "lucide-react";

export default function GeneratePage() {
  const [selectedUMKM, setSelectedUMKM] = useState<number | null>(null);
  const [generatedCerts, setGeneratedCerts] = useState<Record<number, boolean>>(
    {}
  );

  const verifiedUMKMs = [
    {
      id: 1,
      name: "CV. Maju Jaya",
      owner: "Budi Santoso",
      sector: "Kuliner",
      nib: "1234567890123456",
      verifiedDate: "2024-01-15",
      certificateId: null,
    },
    {
      id: 2,
      name: "UD. Berkah",
      owner: "Siti Nurhaliza",
      sector: "Fashion",
      nib: "1234567890123457",
      verifiedDate: "2024-01-10",
      certificateId: "0x9b2e4f1c8a3d5f7e2c9a1b4d6f8e3a5c",
    },
    {
      id: 3,
      name: "Warung Makan Jaya",
      owner: "Dewi Lestari",
      sector: "Kuliner",
      nib: "1234567890123459",
      verifiedDate: "2024-01-18",
      certificateId: null,
    },
  ];

  const handleGenerateCertificate = (umkmId: number) => {
    setGeneratedCerts({ ...generatedCerts, [umkmId]: true });
    setTimeout(() => {
      alert("Sertifikat digital berhasil digenerate!");
    }, 1000);
  };

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
          Generate Sertifikat Digital
        </h1>
        <p className="text-muted-foreground">
          Buat dan terbitkan sertifikat digital untuk UMKM yang terverifikasi
        </p>
      </motion.div>

      {/* UMKM List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {verifiedUMKMs.map((umkm) => (
          <motion.div
            key={umkm.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {umkm.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {umkm.owner}
                  </p>
                </div>
                {umkm.certificateId ? (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600">
                    Sudah Digenerate
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600">
                    Siap Generate
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Sektor", value: umkm.sector },
                  { label: "NIB", value: umkm.nib },
                  { label: "Terverifikasi", value: umkm.verifiedDate },
                  {
                    label: "Status",
                    value: umkm.certificateId ? "Generated" : "Pending",
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

              {/* Expandable Details */}
              {selectedUMKM === umkm.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-border"
                >
                  {umkm.certificateId && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-xs text-green-600 font-semibold mb-2">
                        Certificate ID:
                      </p>
                      <p className="text-foreground font-mono text-xs break-all">
                        {umkm.certificateId}
                      </p>
                    </div>
                  )}

                  {!umkm.certificateId && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm text-blue-600 font-semibold">
                        Siap untuk generate sertifikat digital
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Sertifikat akan disimpan di blockchain
                      </p>
                    </div>
                  )}

                  {/* Generate Button */}
                  {!umkm.certificateId && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenerateCertificate(umkm.id)}
                      disabled={generatedCerts[umkm.id]}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      {generatedCerts[umkm.id]
                        ? "Generating..."
                        : "Generate Sertifikat"}
                    </motion.button>
                  )}

                  {umkm.certificateId && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 rounded-lg bg-green-500 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Sertifikat
                    </motion.button>
                  )}
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
                {selectedUMKM === umkm.id ? "Sembunyikan" : "Lihat Detail"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
