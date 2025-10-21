"use client";

import { motion } from "framer-motion";
import { BarChart3, FileText, Clock, CheckCircle } from "lucide-react";

export default function UMKMDashboard() {
  const stats = [
    {
      label: "UMKM Terdaftar",
      value: "3",
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Sertifikat Aktif",
      value: "2",
      icon: FileText,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Pending Verifikasi",
      value: "1",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Dokumen Lengkap",
      value: "85%",
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
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
        <h1 className="text-3xl font-bold text-foreground">Dashboard UMKM</h1>
        <p className="text-muted-foreground">
          Kelola data dan sertifikat digital UMKM Anda
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
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
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-foreground mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="space-y-3">
          {[
            {
              title: "Sertifikat Disetujui",
              desc: "CV. Maju Jaya - Sertifikat Digital",
              time: "2 jam lalu",
            },
            {
              title: "Dokumen Diunggah",
              desc: "Dokumen NIB untuk CV. Sukses Bersama",
              time: "5 jam lalu",
            },
            {
              title: "Verifikasi Dimulai",
              desc: "Proses verifikasi untuk UD. Berkah",
              time: "1 hari lalu",
            },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">{activity.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
