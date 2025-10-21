"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, CheckCircle, XCircle } from "lucide-react";
import { mockDashboardStats, mockUMKMData } from "@/data";

export default function RegulatorDashboard() {
  const stats = [
    {
      label: "Total UMKM",
      value: mockDashboardStats.regulator.totalUMKM.toString(),
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Pending Review",
      value: mockDashboardStats.regulator.pendingReview.toString(),
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Terverifikasi",
      value: mockDashboardStats.regulator.approved.toString(),
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Ditolak",
      value: mockDashboardStats.regulator.rejected.toString(),
      icon: XCircle,
      color: "from-red-500 to-red-600",
    },
  ];

  const pendingReviews = mockUMKMData
    .filter((umkm) => umkm.status === "pending")
    .map((umkm) => ({
      name: umkm.businessName,
      sector: umkm.sector.charAt(0).toUpperCase() + umkm.sector.slice(1),
      status: "Pending",
      date: umkm.registrationDate,
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
          Dashboard Regulator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Kelola verifikasi dan sertifikasi UMKM
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
          const StatIcon = stat.icon;
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
                  <StatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pending Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6"
      >
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
          Pending Review
        </h2>
        <div className="space-y-2 sm:space-y-3">
          {pendingReviews.length > 0 ? (
            pendingReviews.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-muted transition-all border border-border/50"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                    {item.name}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {item.sector}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {item.status}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Tidak ada pending review
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
