"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, CheckCircle, XCircle, Calendar, FileText } from "lucide-react";

export default function HistoryPage() {
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const historyData = [
    {
      id: 1,
      businessName: "CV. Maju Jaya",
      action: "Sertifikat Disetujui",
      status: "approved",
      date: "2024-01-15",
      time: "14:30",
      description: "Sertifikat digital telah disetujui dan diterbitkan",
    },
    {
      id: 2,
      businessName: "CV. Maju Jaya",
      action: "Dokumen Diunggah",
      status: "pending",
      date: "2024-01-14",
      time: "10:15",
      description: "Dokumen NIB dan KTP telah diunggah untuk verifikasi",
    },
    {
      id: 3,
      businessName: "UD. Berkah",
      action: "Verifikasi Dimulai",
      status: "pending",
      date: "2024-01-13",
      time: "09:45",
      description: "Proses verifikasi dokumen telah dimulai",
    },
    {
      id: 4,
      businessName: "Toko Kriya Indah",
      action: "Dokumen Ditolak",
      status: "rejected",
      date: "2024-01-12",
      time: "16:20",
      description: "Dokumen tidak lengkap, silakan upload ulang",
    },
    {
      id: 5,
      businessName: "UD. Berkah",
      action: "Sertifikat Disetujui",
      status: "approved",
      date: "2024-01-10",
      time: "11:00",
      description: "Sertifikat digital telah disetujui dan diterbitkan",
    },
  ];

  const filteredData =
    filter === "all"
      ? historyData
      : historyData.filter((item) => item.status === filter);

  const statusConfig = {
    pending: {
      label: "Pending",
      color: "bg-yellow-500/10 text-yellow-600",
      icon: Clock,
    },
    approved: {
      label: "Disetujui",
      color: "bg-green-500/10 text-green-600",
      icon: CheckCircle,
    },
    rejected: {
      label: "Ditolak",
      color: "bg-red-500/10 text-red-600",
      icon: XCircle,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Riwayat Izin</h1>
        <p className="text-muted-foreground">
          Pantau status verifikasi dan perubahan dokumen Anda
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3"
      >
        {(["all", "pending", "approved", "rejected"] as const).map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === status
                ? "bg-primary text-white shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {status === "all"
              ? "Semua"
              : status === "pending"
              ? "Pending"
              : status === "approved"
              ? "Disetujui"
              : "Ditolak"}
          </motion.button>
        ))}
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredData.map((item, index) => {
          const statusConfig_ =
            statusConfig[item.status as keyof typeof statusConfig];
          const IconComponent = statusConfig_.icon;
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig_.color}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {index < filteredData.length - 1 && (
                    <div className="w-1 h-12 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {item.action}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.businessName}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig_.color}`}
                    >
                      {statusConfig_.label}
                    </span>
                  </div>

                  <p className="text-sm text-foreground mb-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card border border-border rounded-xl"
        >
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tidak Ada Riwayat
          </h3>
          <p className="text-muted-foreground">
            Belum ada aktivitas untuk filter yang dipilih
          </p>
        </motion.div>
      )}
    </div>
  );
}
