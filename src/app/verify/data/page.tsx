"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ChainIcon from "@/components/icons/chain-icon";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  Building2,
  User,
  Tag,
  Calendar,
  MapPin,
  Hash,
  Users,
  Wallet,
  Award,
} from "lucide-react";

type UmkmData = {
  businessName: string;
  owner: string;
  status: string;
  registrationDate: string;
  businessType: string;
  location: string;
  employees: number;
  revenue: string;
  certifications: string[];
};

export default function VerifyDataPage() {
  const searchParams = useSearchParams();
  const idHash = searchParams.get("id") || "Tidak Diketahui";

  const mockData: Record<string, UmkmData> = {
    "NIB-001": {
      businessName: "PT Maju Jaya Indonesia",
      owner: "Budi Santoso",
      status: "Terverifikasi",
      registrationDate: "2024-01-15",
      businessType: "Fashion",
      location: "Jakarta, Indonesia",
      employees: 150,
      revenue: "$2.5M",
      certifications: ["ISO 9001", "ISO 14001"],
    },
    default: {
      businessName: "Nama Usaha Anda",
      owner: "Nama Pemilik",
      status: "Terverifikasi",
      registrationDate: "2024-10-19",
      businessType: "Kuliner",
      location: "Indonesia",
      employees: 50,
      revenue: "Rp. 500.000",
      certifications: ["ISO 9001"],
    },
  };

  const data = mockData[idHash] || mockData["default"];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 to-accent/10 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto py-20">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
              <ChainIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              UMKMChain
            </h1>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-card rounded-2xl shadow-lg p-8 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status */}
          <motion.div
            className="flex items-center gap-4 pb-6 border-b border-border"
            variants={itemVariants}
          >
            <motion.div
              className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <CheckCircle className="w-7 h-7" />
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground">Status Verifikasi</p>
              <p className="text-2xl font-bold text-green-600">{data.status}</p>
            </div>
          </motion.div>

          {/* Business Information */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: Building2,
                label: "Nama Usaha",
                value: data.businessName,
              },
              { icon: User, label: "Pemilik", value: data.owner },
              { icon: Tag, label: "Jenis Usaha", value: data.businessType },
              {
                icon: Calendar,
                label: "Tanggal Registrasi",
                value: data.registrationDate,
              },
              { icon: MapPin, label: "Lokasi", value: data.location },
              { icon: Hash, label: "ID Hash", value: idHash, mono: true },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <item.icon className="w-4 h-4" />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
                <p
                  className={`${
                    item.mono ? "font-mono" : ""
                  } text-lg font-semibold text-foreground`}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Details */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: Users,
                label: "Karyawan",
                value: data.employees,
                bg: "bg-secondary/20",
              },
              {
                icon: Wallet,
                label: "Pendapatan Tahunan",
                value: data.revenue,
                bg: "bg-green-50",
              },
              {
                icon: Award,
                label: "Sertifikasi",
                value: data.certifications.length,
                bg: "bg-accent/20",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.bg} rounded-lg p-4`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-4 h-4" />
                  <p className="text-sm">{item.label}</p>
                </div>
                <p className="text-2xl font-bold text-primary mt-1">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="pt-6 border-t border-border"
            variants={itemVariants}
          >
            <p className="text-sm text-muted-foreground font-medium mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" /> Sertifikasi
            </p>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert: string, index: number) => (
                <motion.span
                  key={cert}
                  className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {cert}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 pt-6 border-t border-border"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex-1" variants={itemVariants}>
              <Link
                href="/login"
                className="block w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-accent transition text-center"
              >
                Masuk ke Dashboard
              </Link>
            </motion.div>
            <motion.div className="flex-1" variants={itemVariants}>
              <Link
                href="/verify"
                className="block w-full bg-muted text-muted-foreground font-semibold py-3 rounded-lg hover:bg-border transition text-center"
              >
                Verifikasi ID Lain
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
