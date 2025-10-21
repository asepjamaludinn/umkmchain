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
import { mockAuditHistory } from "@/data";

export default function AuditPage() {
  const [filterType, setFilterType] = useState<
    "all" | "registration" | "verification" | "certificate"
  >("all");

  const auditLogs = mockAuditHistory.map((audit) => ({
    id: audit.id,
    type: audit.action.includes("Registered")
      ? "registration"
      : audit.action.includes("Verified")
      ? "certificate"
      : "verification",
    action: audit.action,
    umkmName: audit.umkmName,
    actor: audit.actor,
    timestamp: audit.timestamp,
    details: audit.details,
    status: "success",
  }));

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
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Audit History
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Pantau semua aktivitas dan perubahan dalam sistem
        </p>
      </motion.div>

      {/* Filter Buttons - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2 sm:gap-3"
      >
        {(["all", "registration", "verification", "certificate"] as const).map(
          (type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(type)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
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

      {/* Audit Timeline - Responsive */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 sm:space-y-4"
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
              className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${typeConfig_.color}`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  {index < filteredLogs.length - 1 && (
                    <div className="w-1 h-10 sm:h-12 bg-border mt-1 sm:mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-0.5 sm:pt-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-sm sm:text-base truncate">
                        {log.action}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 truncate">
                        {log.umkmName}
                      </p>
                    </div>
                    <span
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${statusConfig_.color} whitespace-nowrap flex-shrink-0`}
                    >
                      {statusConfig_.label}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground mb-2 sm:mb-3">
                    {log.details}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{log.actor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{log.timestamp}</span>
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
          className="text-center py-8 sm:py-12 bg-card border border-border rounded-lg sm:rounded-xl"
        >
          <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
            Tidak Ada Log
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tidak ada aktivitas untuk filter yang dipilih
          </p>
        </motion.div>
      )}
    </div>
  );
}
