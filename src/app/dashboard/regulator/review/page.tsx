"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Eye, EyeOff } from "lucide-react";

export default function ReviewPage() {
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [reviewStatus, setReviewStatus] = useState<
    Record<number, "approved" | "rejected" | null>
  >({});

  const documents = [
    {
      id: 1,
      umkmName: "CV. Maju Jaya",
      owner: "Budi Santoso",
      documentType: "KTP",
      fileName: "ktp_budi_santoso.pdf",
      uploadDate: "2024-01-15",
      status: "pending",
      fileSize: "2.5 MB",
    },
    {
      id: 2,
      umkmName: "CV. Maju Jaya",
      owner: "Budi Santoso",
      documentType: "NIB",
      fileName: "nib_cv_maju_jaya.pdf",
      uploadDate: "2024-01-15",
      status: "pending",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      umkmName: "UD. Berkah",
      owner: "Siti Nurhaliza",
      documentType: "KTP",
      fileName: "ktp_siti_nurhaliza.pdf",
      uploadDate: "2024-01-14",
      status: "pending",
      fileSize: "2.3 MB",
    },
    {
      id: 4,
      umkmName: "Toko Kriya Indah",
      owner: "Ahmad Wijaya",
      documentType: "NIB",
      fileName: "nib_toko_kriya.pdf",
      uploadDate: "2024-01-13",
      status: "pending",
      fileSize: "1.9 MB",
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
          Review Dokumen Digital
        </h1>
        <p className="text-muted-foreground">
          Periksa dan validasi dokumen yang diunggah oleh UMKM
        </p>
      </motion.div>

      {/* Documents Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground">{doc.umkmName}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {doc.owner}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600">
                {doc.documentType}
              </span>
            </div>

            {/* Document Info */}
            <div className="space-y-3 mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">
                    {doc.fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {doc.fileSize}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Diunggah: {doc.uploadDate}
              </p>
            </div>

            {/* Preview Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                setSelectedDocument(selectedDocument === doc.id ? null : doc.id)
              }
              className="w-full py-2 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold mb-4 transition-all flex items-center justify-center gap-2"
            >
              {selectedDocument === doc.id ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Sembunyikan Preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Lihat Preview
                </>
              )}
            </motion.button>

            {/* Review Actions */}
            {selectedDocument === doc.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4 border-t border-border"
              >
                <div className="bg-muted/50 rounded-lg p-4 text-center text-sm text-muted-foreground">
                  Preview dokumen akan ditampilkan di sini
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setReviewStatus({ ...reviewStatus, [doc.id]: "approved" })
                    }
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      reviewStatus[doc.id] === "approved"
                        ? "bg-green-500 text-white"
                        : "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    }`}
                  >
                    Setujui
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setReviewStatus({ ...reviewStatus, [doc.id]: "rejected" })
                    }
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      reviewStatus[doc.id] === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                    }`}
                  >
                    Tolak
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {documents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card border border-border rounded-xl"
        >
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tidak Ada Dokumen
          </h3>
          <p className="text-muted-foreground">Semua dokumen telah direview</p>
        </motion.div>
      )}
    </div>
  );
}
