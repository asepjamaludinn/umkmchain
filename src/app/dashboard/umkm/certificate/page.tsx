"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileText } from "lucide-react";

export default function CertificatePage() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certificates = [
    {
      id: 1,
      hash: "0x7a3f8c2b9e1d4f6a5c8b2e9d1f3a5c7e",
      businessName: "CV. Maju Jaya",
      owner: "Budi Santoso",
      businessType: "Kuliner",
      address: "Jl. Merdeka No. 123, Jakarta",
      issueDate: "2024-01-15",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e",
      status: "Terverifikasi",
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x7a3f8c2b9e1d4f6a5c8b2e9d1f3a5c7e",
    },
    {
      id: 2,
      hash: "0x9b2e4f1c8a3d5f7e2c9a1b4d6f8e3a5c",
      businessName: "UD. Berkah",
      owner: "Siti Nurhaliza",
      businessType: "Fashion",
      address: "Jl. Ahmad Yani No. 456, Bandung",
      issueDate: "2024-01-10",
      walletAddress: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      status: "Terverifikasi",
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x9b2e4f1c8a3d5f7e2c9a1b4d6f8e3a5c",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
          Sertifikat Digital
        </h1>
        <p className="text-muted-foreground">
          Kelola dan lihat sertifikat digital UMKM Anda
        </p>
      </motion.div>

      {/* Certificates Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              setSelectedCert(selectedCert === cert.id ? null : cert.id)
            }
            className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg"
          >
            {/* Certificate Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {cert.businessName}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cert.owner}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600">
                  {cert.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span className="font-mono">{cert.hash.slice(0, 16)}...</span>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Jenis Usaha
                  </p>
                  <p className="text-foreground font-medium mt-1">
                    {cert.businessType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Tanggal Terbit
                  </p>
                  <p className="text-foreground font-medium mt-1">
                    {cert.issueDate}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground font-semibold">
                  Alamat Usaha
                </p>
                <p className="text-foreground font-medium mt-1 text-sm">
                  {cert.address}
                </p>
              </div>

              {/* Expandable Details */}
              {selectedCert === cert.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-border"
                >
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Wallet Address
                    </p>
                    <p className="text-foreground font-mono text-xs mt-1 break-all">
                      {cert.walletAddress}
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs text-muted-foreground font-semibold">
                      QR Code
                    </p>
                    <img
                      src={cert.qrCode || "/placeholder.svg"}
                      alt="QR Code"
                      className="w-32 h-32 border border-border rounded-lg p-2"
                    />
                  </div>

                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Download Sertifikat
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card border border-border rounded-xl"
        >
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Belum Ada Sertifikat
          </h3>
          <p className="text-muted-foreground">
            Daftarkan UMKM Anda terlebih dahulu untuk mendapatkan sertifikat
            digital
          </p>
        </motion.div>
      )}
    </div>
  );
}
