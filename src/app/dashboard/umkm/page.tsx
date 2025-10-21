"use client";

import { motion } from "framer-motion";
import { BarChart3, FileText, Clock, CheckCircle } from "lucide-react";
import { mockDashboardStats, mockUMKMData } from "@/data";

export default function UMKMDashboard() {
  const stats = [
    {
      label: "UMKM Terdaftar",
      value: mockDashboardStats.umkm.totalRegistered.toString(),
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Sertifikat Aktif",
      value: mockDashboardStats.umkm.totalCertificates.toString(),
      icon: FileText,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Pending Verifikasi",
      value: mockDashboardStats.umkm.pending.toString(),
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Dokumen Lengkap",
      value: `${Math.round(
        (mockDashboardStats.umkm.approved /
          mockDashboardStats.umkm.totalRegistered) *
          100
      )}%`,
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const recentActivities = mockUMKMData.slice(0, 3).map((umkm, index) => ({
    title:
      umkm.status === "approved"
        ? "Sertifikat Disetujui"
        : "Verifikasi Dimulai",
    desc: `${umkm.businessName} - Sertifikat Digital`,
    time: `${index + 1} ${index === 0 ? "jam" : "hari"} lalu`,
  }));

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
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Dashboard UMKM
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Kelola data dan sertifikat digital UMKM Anda
        </p>
      </motion.div>

      {/* Stats Grid - Responsive */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground text-xs sm:text-sm font-medium truncate">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 sm:mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="space-y-2 sm:space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  {activity.title}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {activity.desc}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
