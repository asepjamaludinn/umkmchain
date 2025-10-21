"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Eye, EyeOff } from "lucide-react";
import { mockReviewData } from "@/data";

export default function ReviewPage() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [reviewStatus, setReviewStatus] = useState<
    Record<string, "approved" | "rejected" | null>
  >({});

  const documents = mockReviewData.map((review) => ({
    id: review.id,
    umkmName: review.umkmName,
    owner: review.ownerName,
    documentType: review.documentType,
    fileName: `${review.documentType.toLowerCase()}_${review.ownerName.replace(
      /\s+/g,
      "_"
    )}.pdf`,
    uploadDate: review.submissionDate,
    status: review.status,
    fileSize: `${Math.floor(Math.random() * 2) + 1}.${Math.floor(
      Math.random() * 9
    )} MB`,
  }));

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
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Review Dokumen Digital
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Periksa dan validasi dokumen yang diunggah oleh UMKM
        </p>
      </motion.div>

      {/* Documents Grid - Responsive */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
      >
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-sm sm:text-base truncate">
                  {doc.umkmName}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
                  {doc.owner}
                </p>
              </div>
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600 whitespace-nowrap flex-shrink-0">
                {doc.documentType}
              </span>
            </div>

            {/* Document Info */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-xs sm:text-sm truncate">
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
              className="w-full py-2 px-3 sm:px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold mb-3 sm:mb-4 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              {selectedDocument === doc.id ? (
                <>
                  <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                  Sembunyikan Preview
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
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
                className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border"
              >
                <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground">
                  Preview dokumen akan ditampilkan di sini
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setReviewStatus({ ...reviewStatus, [doc.id]: "approved" })
                    }
                    className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
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
                    className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
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
          className="text-center py-8 sm:py-12 bg-card border border-border rounded-lg sm:rounded-xl"
        >
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
            Tidak Ada Dokumen
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Semua dokumen telah direview
          </p>
        </motion.div>
      )}
    </div>
  );
}
