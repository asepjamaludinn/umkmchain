"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  FileText,
  MapPin,
  Users,
  TrendingUp,
  Plus,
} from "lucide-react";
import { mockUMKMData } from "@/data";

type OwnerProfile = {
  name: string;
  email: string;
  phone: string;
  nik: string;
  address: string;
  joinDate: string;
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"owner" | "businesses">("owner");
  const [editingOwner, setEditingOwner] = useState(false);
  const [showAddBusiness, setShowAddBusiness] = useState(false);

  const ownerProfile: OwnerProfile = {
    name: mockUMKMData[0]?.ownerName || "Budi Santoso",
    email: "budi@email.com",
    phone: "+62 812-3456-7890",
    nik: mockUMKMData[0]?.ownerNIK || "3201234567890123",
    address: mockUMKMData[0]?.businessAddress || "Jl. Merdeka No. 123, Jakarta",
    joinDate: mockUMKMData[0]?.registrationDate || "2024-01-01",
  };

  const businesses = mockUMKMData.map((umkm) => ({
    id: umkm.id,
    name: umkm.businessName,
    sector: umkm.sector.charAt(0).toUpperCase() + umkm.sector.slice(1),
    address: umkm.businessAddress,
    nib: umkm.nib,
    status: umkm.status === "approved" ? "Terverifikasi" : "Pending",
    employees: Math.floor(Math.random() * 10) + 1,
    revenue: `Rp ${Math.floor(Math.random() * 500) + 100} Juta`,
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
          Profil Usaha
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Kelola profil pemilik dan data usaha Anda
        </p>
      </motion.div>

      {/* Tabs - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 sm:gap-4 border-b border-border overflow-x-auto"
      >
        {(["owner", "businesses"] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all border-b-2 whitespace-nowrap text-sm sm:text-base ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "owner" ? "Profil Pemilik" : "Data Usaha"}
          </motion.button>
        ))}
      </motion.div>

      {/* Owner Profile Tab */}
      {activeTab === "owner" && (
        <motion.div
          key="owner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Owner Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:p-8 border-b border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
                    {ownerProfile.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                      {ownerProfile.name}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Pemilik UMKM
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Bergabung sejak {ownerProfile.joinDate}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingOwner(!editingOwner)}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all text-sm sm:text-base w-full sm:w-auto"
                >
                  {editingOwner ? "Batal" : "Edit"}
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8">
              {editingOwner ? (
                <OwnerEditForm
                  owner={ownerProfile}
                  onSave={() => setEditingOwner(false)}
                />
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      { label: "Email", value: ownerProfile.email, icon: Mail },
                      {
                        label: "Nomor Telepon",
                        value: ownerProfile.phone,
                        icon: Phone,
                      },
                      { label: "NIK", value: ownerProfile.nik, icon: FileText },
                      {
                        label: "Alamat",
                        value: ownerProfile.address,
                        icon: MapPin,
                      },
                    ].map((field, index) => {
                      const IconComponent = field.icon;
                      return (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                            <label className="text-xs sm:text-sm font-semibold text-muted-foreground">
                              {field.label}
                            </label>
                          </div>
                          <p className="text-foreground font-medium text-sm sm:text-base break-words">
                            {field.value}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Businesses Tab */}
      {activeTab === "businesses" && (
        <motion.div
          key="businesses"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Add Business Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddBusiness(!showAddBusiness)}
            className="w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg border-2 border-dashed border-primary text-primary font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Tambah Usaha Baru
          </motion.button>

          {/* Add Business Form */}
          {showAddBusiness && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-8"
            >
              <AddBusinessForm onClose={() => setShowAddBusiness(false)} />
            </motion.div>
          )}

          {/* Businesses Grid - Responsive */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            {businesses.map((business) => (
              <motion.div
                key={business.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:p-6 border-b border-border">
                  <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                        {business.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {business.sector}
                      </p>
                    </div>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 whitespace-nowrap flex-shrink-0">
                      {business.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      {
                        label: "Alamat",
                        value: business.address,
                        icon: MapPin,
                      },
                      { label: "NIB", value: business.nib, icon: FileText },
                      {
                        label: "Karyawan",
                        value: `${business.employees} orang`,
                        icon: Users,
                      },
                      {
                        label: "Omset",
                        value: business.revenue,
                        icon: TrendingUp,
                      },
                    ].map((field, index) => {
                      const IconComponent = field.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground font-semibold">
                              {field.label}
                            </p>
                            <p className="text-foreground font-medium text-xs sm:text-sm break-words">
                              {field.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-2 sm:px-3 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all text-xs sm:text-sm"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-2 sm:px-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all text-xs sm:text-sm"
                    >
                      Lihat Detail
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function OwnerEditForm({
  owner,
  onSave,
}: {
  owner: OwnerProfile;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState(owner);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated owner data:", formData);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {[
          { label: "Nama Lengkap", key: "name" },
          { label: "Email", key: "email" },
          { label: "Nomor Telepon", key: "phone" },
          { label: "NIK", key: "nik" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={formData[field.key as keyof typeof formData]}
              onChange={(e) =>
                setFormData({ ...formData, [field.key]: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
          Alamat
        </label>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          rows={3}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
        />
      </div>

      <div className="flex gap-2 sm:gap-3">
        <motion.button
          type="button"
          onClick={onSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all text-sm"
        >
          Batal
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all text-sm"
        >
          Simpan Perubahan
        </motion.button>
      </div>
    </form>
  );
}

function AddBusinessForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    businessName: "",
    sector: "",
    address: "",
    nib: "",
    employees: "",
    revenue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New business data:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-bold text-foreground">
        Tambah Usaha Baru
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            Nama Usaha
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            placeholder="Masukkan nama usaha"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            Sektor Usaha
          </label>
          <select
            value={formData.sector}
            onChange={(e) =>
              setFormData({ ...formData, sector: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            required
          >
            <option value="">Pilih sektor</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Fashion">Fashion</option>
            <option value="Kriya">Kriya</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            NIB
          </label>
          <input
            type="text"
            value={formData.nib}
            onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
            placeholder="Masukkan nomor NIB"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            Jumlah Karyawan
          </label>
          <input
            type="number"
            value={formData.employees}
            onChange={(e) =>
              setFormData({ ...formData, employees: e.target.value })
            }
            placeholder="Masukkan jumlah karyawan"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
          Alamat Usaha
        </label>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Masukkan alamat lengkap"
          rows={3}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
          required
        />
      </div>

      <div className="flex gap-2 sm:gap-3">
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all text-sm"
        >
          Batal
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all text-sm"
        >
          Tambah Usaha
        </motion.button>
      </div>
    </form>
  );
}
