"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, CheckCircle, Clock, XCircle, FileText } from "lucide-react";
import { mockUMKMData } from "@/data";

export default function UMKMListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [filterSector, setFilterSector] = useState<
    "all" | "kuliner" | "fashion" | "kriya"
  >("all");
  const [selectedUMKM, setSelectedUMKM] = useState<string | null>(null);

  const umkmList = mockUMKMData.map((umkm) => ({
    id: umkm.id,
    name: umkm.businessName,
    owner: umkm.ownerName,
    sector: umkm.sector,
    address: umkm.businessAddress,
    nib: umkm.nib,
    status: umkm.status,
    registeredDate: umkm.registrationDate,
    documents: 3,
    certificateId: umkm.certificateHash,
  }));

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
    approved: {
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
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Daftar UMKM Terdaftar
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Kelola dan pantau semua UMKM yang terdaftar dalam sistem
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 sm:space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nama UMKM, pemilik, atau NIB..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-9 sm:pl-10 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
          <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Status Filter */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(["all", "pending", "approved", "rejected"] as const).map(
              (status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    filterStatus === status
                      ? "bg-primary text-white shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {status === "all"
                    ? "Semua Status"
                    : status === "pending"
                    ? "Pending"
                    : status === "approved"
                    ? "Terverifikasi"
                    : "Ditolak"}
                </motion.button>
              )
            )}
          </div>

          {/* Sector Filter */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(["all", "kuliner", "fashion", "kriya"] as const).map((sector) => (
              <motion.button
                key={sector}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterSector(sector)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
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
        className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground">
                  Nama UMKM
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground hidden sm:table-cell">
                  Pemilik
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground hidden md:table-cell">
                  Sektor
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-center text-xs sm:text-sm font-semibold text-foreground">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((umkm) => {
                const statusConfig_ =
                  statusConfig[umkm.status as keyof typeof statusConfig];
                const StatusIcon = statusConfig_.icon;
                return (
                  <motion.tr
                    key={umkm.id}
                    variants={itemVariants}
                    className="border-b border-border hover:bg-muted/50 transition-all"
                  >
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <p className="font-semibold text-foreground text-xs sm:text-sm truncate">
                        {umkm.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {umkm.nib}
                      </p>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-foreground text-xs sm:text-sm hidden sm:table-cell truncate">
                      {umkm.owner}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-foreground text-xs sm:text-sm hidden md:table-cell">
                      {sectorConfig[umkm.sector as keyof typeof sectorConfig]}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <span
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${statusConfig_.color}`}
                      >
                        <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">
                          {statusConfig_.label}
                        </span>
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedUMKM(
                            selectedUMKM === umkm.id ? null : umkm.id
                          )
                        }
                        className="px-2 sm:px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-xs sm:text-sm transition-all"
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
          <div className="text-center py-8 sm:py-12">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
              Tidak Ada UMKM
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
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
            className="bg-card border border-border rounded-lg sm:rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {(() => {
              const umkm = umkmList.find((u) => u.id === selectedUMKM);
              if (!umkm) return null;

              const statusConfig_ =
                statusConfig[umkm.status as keyof typeof statusConfig];

              return (
                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                        {umkm.name}
                      </h2>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {umkm.owner}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedUMKM(null)}
                      className="text-xl sm:text-2xl text-muted-foreground hover:text-foreground flex-shrink-0"
                    >
                      ✕
                    </motion.button>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
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
                        <p className="text-foreground font-medium mt-1 text-sm break-words">
                          {field.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      Review Dokumen
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedUMKM(null)}
                      className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all text-sm"
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
