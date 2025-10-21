"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, CheckCircle, XCircle } from "lucide-react";

export default function RegulatorDashboard() {
  const stats = [
    {
      label: "Total UMKM",
      value: "1,234",
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Pending Review",
      value: "45",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      label: "Terverifikasi",
      value: "1,189",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Ditolak",
      value: "12",
      icon: XCircle,
      color: "from-red-500 to-red-600",
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
          Dashboard Regulator
        </h1>
        <p className="text-muted-foreground">
          Kelola verifikasi dan sertifikasi UMKM
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
          const StatIcon = stat.icon;
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
                  <StatIcon className="w-6 h-6 text-white" />
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
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-foreground mb-4">
          Pending Review
        </h2>
        <div className="space-y-3">
          {[
            {
              name: "CV. Maju Jaya",
              sector: "Kuliner",
              status: "Pending",
              date: "2024-01-15",
            },
            {
              name: "UD. Berkah",
              sector: "Fashion",
              status: "Pending",
              date: "2024-01-14",
            },
            {
              name: "Toko Kriya Indah",
              sector: "Kriya",
              status: "Pending",
              date: "2024-01-13",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-all border border-border/50"
            >
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.sector}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full font-medium">
                  {item.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
