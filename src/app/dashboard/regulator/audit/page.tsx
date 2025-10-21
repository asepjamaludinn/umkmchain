"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  CheckCircle,
  Award,
  BarChart3,
  User,
  Clock,
} from "lucide-react";

export default function AuditPage() {
  const [filterType, setFilterType] = useState<
    "all" | "registration" | "verification" | "certificate"
  >("all");

  const auditLogs = [
    {
      id: 1,
      type: "registration",
      action: "UMKM Terdaftar",
      umkmName: "CV. Maju Jaya",
      actor: "Budi Santoso",
      timestamp: "2024-01-15 14:30",
      details: "Pendaftaran UMKM baru dengan NIB 1234567890123456",
      status: "success",
    },
    {
      id: 2,
      type: "verification",
      action: "Dokumen Disetujui",
      umkmName: "CV. Maju Jaya",
      actor: "Admin Regulator",
      timestamp: "2024-01-15 15:45",
      details: "Semua dokumen telah diverifikasi dan disetujui",
      status: "success",
    },
    {
      id: 3,
      type: "certificate",
      action: "Sertifikat Digenerate",
      umkmName: "CV. Maju Jaya",
      actor: "Admin Regulator",
      timestamp: "2024-01-15 16:00",
      details: "Sertifikat digital berhasil digenerate dengan ID 0x7a3f8c2b...",
      status: "success",
    },
    {
      id: 4,
      type: "verification",
      action: "Dokumen Ditolak",
      umkmName: "Butik Fashion Plus",
      actor: "Admin Regulator",
      timestamp: "2024-01-12 10:20",
      details: "Dokumen tidak lengkap, diminta untuk upload ulang",
      status: "warning",
    },
    {
      id: 5,
      type: "registration",
      action: "UMKM Terdaftar",
      umkmName: "UD. Berkah",
      actor: "Siti Nurhaliza",
      timestamp: "2024-01-10 09:15",
      details: "Pendaftaran UMKM baru dengan NIB 1234567890123457",
      status: "success",
    },
    {
      id: 6,
      type: "verification",
      action: "Dokumen Disetujui",
      umkmName: "UD. Berkah",
      actor: "Admin Regulator",
      timestamp: "2024-01-10 11:30",
      details: "Semua dokumen telah diverifikasi dan disetujui",
      status: "success",
    },
  ];

  const filteredLogs =
    filterType === "all"
      ? auditLogs
      : auditLogs.filter((log) => log.type === filterType);

  const typeConfig = {
    registration: {
      label: "Pendaftaran",
      color: "bg-blue-500/10 text-blue-600",
      icon: FileText,
    },
    verification: {
      label: "Verifikasi",
      color: "bg-purple-500/10 text-purple-600",
      icon: CheckCircle,
    },
    certificate: {
      label: "Sertifikat",
      color: "bg-green-500/10 text-green-600",
      icon: Award,
    },
  };

  const statusConfig = {
    success: { label: "Berhasil", color: "bg-green-500/10 text-green-600" },
    warning: { label: "Peringatan", color: "bg-yellow-500/10 text-yellow-600" },
    error: { label: "Error", color: "bg-red-500/10 text-red-600" },
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
        <h1 className="text-3xl font-bold text-foreground">Audit History</h1>
        <p className="text-muted-foreground">
          Pantau semua aktivitas dan perubahan dalam sistem
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3"
      >
        {(["all", "registration", "verification", "certificate"] as const).map(
          (type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === type
                  ? "bg-primary text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {type === "all"
                ? "Semua"
                : type === "registration"
                ? "Pendaftaran"
                : type === "verification"
                ? "Verifikasi"
                : "Sertifikat"}
            </motion.button>
          )
        )}
      </motion.div>

      {/* Audit Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredLogs.map((log, index) => {
          const typeConfig_ = typeConfig[log.type as keyof typeof typeConfig];
          const statusConfig_ =
            statusConfig[log.status as keyof typeof statusConfig];
          const IconComponent = typeConfig_.icon;

          return (
            <motion.div
              key={log.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${typeConfig_.color}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {index < filteredLogs.length - 1 && (
                    <div className="w-1 h-12 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {log.action}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {log.umkmName}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig_.color}`}
                    >
                      {statusConfig_.label}
                    </span>
                  </div>

                  <p className="text-sm text-foreground mb-3">{log.details}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{log.actor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card border border-border rounded-xl"
        >
          <div className="flex justify-center mb-4">
            <BarChart3 className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tidak Ada Log
          </h3>
          <p className="text-muted-foreground">
            Tidak ada aktivitas untuk filter yang dipilih
          </p>
        </motion.div>
      )}
    </div>
  );
}
