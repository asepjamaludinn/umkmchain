"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, CheckCircle, Clock, XCircle, FileText } from "lucide-react";

export default function UMKMListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "verified" | "rejected"
  >("all");
  const [filterSector, setFilterSector] = useState<
    "all" | "kuliner" | "fashion" | "kriya"
  >("all");
  const [selectedUMKM, setSelectedUMKM] = useState<number | null>(null);

  const umkmList = [
    {
      id: 1,
      name: "CV. Maju Jaya",
      owner: "Budi Santoso",
      sector: "kuliner",
      address: "Jl. Merdeka No. 123, Jakarta",
      nib: "1234567890123456",
      status: "verified",
      registeredDate: "2024-01-15",
      documents: 3,
      certificateId: "0x7a3f8c2b9e1d4f6a5c8b2e9d1f3a5c7e",
    },
    {
      id: 2,
      name: "UD. Berkah",
      owner: "Siti Nurhaliza",
      sector: "fashion",
      address: "Jl. Ahmad Yani No. 456, Bandung",
      nib: "1234567890123457",
      status: "verified",
      registeredDate: "2024-01-10",
      documents: 3,
      certificateId: "0x9b2e4f1c8a3d5f7e2c9a1b4d6f8e3a5c",
    },
    {
      id: 3,
      name: "Toko Kriya Indah",
      owner: "Ahmad Wijaya",
      sector: "kriya",
      address: "Jl. Sudirman No. 789, Yogyakarta",
      nib: "1234567890123458",
      status: "pending",
      registeredDate: "2024-01-20",
      documents: 2,
      certificateId: null,
    },
    {
      id: 4,
      name: "Warung Makan Jaya",
      owner: "Dewi Lestari",
      sector: "kuliner",
      address: "Jl. Gatot Subroto No. 321, Surabaya",
      nib: "1234567890123459",
      status: "pending",
      registeredDate: "2024-01-18",
      documents: 2,
      certificateId: null,
    },
    {
      id: 5,
      name: "Butik Fashion Plus",
      owner: "Rini Handoko",
      sector: "fashion",
      address: "Jl. Diponegoro No. 654, Medan",
      nib: "1234567890123460",
      status: "rejected",
      registeredDate: "2024-01-12",
      documents: 1,
      certificateId: null,
    },
  ];

  const filteredList = umkmList.filter((umkm) => {
    const matchSearch =
      umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      umkm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      umkm.nib.includes(searchTerm);

    const matchStatus = filterStatus === "all" || umkm.status === filterStatus;
    const matchSector = filterSector === "all" || umkm.sector === filterSector;

    return matchSearch && matchStatus && matchSector;
  });

  const statusConfig = {
    verified: {
      label: "Terverifikasi",
      color: "bg-green-500/10 text-green-600",
      icon: CheckCircle,
    },
    pending: {
      label: "Pending",
      color: "bg-yellow-500/10 text-yellow-600",
      icon: Clock,
    },
    rejected: {
      label: "Ditolak",
      color: "bg-red-500/10 text-red-600",
      icon: XCircle,
    },
  };

  const sectorConfig = {
    kuliner: "Kuliner",
    fashion: "Fashion",
    kriya: "Kriya",
  };

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
          Daftar UMKM Terdaftar
        </h1>
        <p className="text-muted-foreground">
          Kelola dan pantau semua UMKM yang terdaftar dalam sistem
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nama UMKM, pemilik, atau NIB..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <div className="flex gap-2">
            {(["all", "pending", "verified", "rejected"] as const).map(
              (status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === status
                      ? "bg-primary text-white shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {status === "all"
                    ? "Semua Status"
                    : status === "pending"
                    ? "Pending"
                    : status === "verified"
                    ? "Terverifikasi"
                    : "Ditolak"}
                </motion.button>
              )
            )}
          </div>

          {/* Sector Filter */}
          <div className="flex gap-2">
            {(["all", "kuliner", "fashion", "kriya"] as const).map((sector) => (
              <motion.button
                key={sector}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterSector(sector)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  filterSector === sector
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {sector === "all" ? "Semua Sektor" : sectorConfig[sector]}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* UMKM Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Nama UMKM
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Pemilik
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Sektor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Terdaftar
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((umkm, index) => {
                const statusConfig_ =
                  statusConfig[umkm.status as keyof typeof statusConfig];
                const StatusIcon = statusConfig_.icon;
                return (
                  <motion.tr
                    key={umkm.id}
                    variants={itemVariants}
                    className="border-b border-border hover:bg-muted/50 transition-all"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">
                        {umkm.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {umkm.nib}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-foreground">{umkm.owner}</td>
                    <td className="px-6 py-4 text-foreground">
                      {sectorConfig[umkm.sector as keyof typeof sectorConfig]}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 w-fit ${statusConfig_.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig_.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {umkm.registeredDate}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedUMKM(
                            selectedUMKM === umkm.id ? null : umkm.id
                          )
                        }
                        className="px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-sm transition-all"
                      >
                        Detail
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredList.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tidak Ada UMKM
            </h3>
            <p className="text-muted-foreground">
              Tidak ada UMKM yang sesuai dengan filter yang dipilih
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      {selectedUMKM && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedUMKM(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {(() => {
              const umkm = umkmList.find((u) => u.id === selectedUMKM);
              if (!umkm) return null;

              const statusConfig_ =
                statusConfig[umkm.status as keyof typeof statusConfig];

              return (
                <div className="p-8 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {umkm.name}
                      </h2>
                      <p className="text-muted-foreground mt-1">{umkm.owner}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedUMKM(null)}
                      className="text-2xl text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </motion.button>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        label: "Sektor",
                        value:
                          sectorConfig[
                            umkm.sector as keyof typeof sectorConfig
                          ],
                      },
                      { label: "Status", value: statusConfig_.label },
                      { label: "NIB", value: umkm.nib },
                      { label: "Terdaftar", value: umkm.registeredDate },
                      { label: "Dokumen", value: `${umkm.documents} file` },
                      { label: "Alamat", value: umkm.address },
                    ].map((field, index) => (
                      <div key={index}>
                        <p className="text-xs text-muted-foreground font-semibold">
                          {field.label}
                        </p>
                        <p className="text-foreground font-medium mt-1">
                          {field.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
                    >
                      Review Dokumen
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all"
                    >
                      Tutup
                    </motion.button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
