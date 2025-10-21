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
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "+62 812-3456-7890",
    nik: "3201234567890123",
    address: "Jl. Merdeka No. 123, Jakarta",
    joinDate: "2024-01-01",
  };

  const businesses = [
    {
      id: 1,
      name: "CV. Maju Jaya",
      sector: "Kuliner",
      address: "Jl. Merdeka No. 123, Jakarta",
      nib: "1234567890123456",
      status: "Terverifikasi",
      employees: 5,
      revenue: "Rp 500 Juta",
    },
    {
      id: 2,
      name: "UD. Berkah",
      sector: "Fashion",
      address: "Jl. Ahmad Yani No. 456, Bandung",
      nib: "1234567890123457",
      status: "Terverifikasi",
      employees: 3,
      revenue: "Rp 300 Juta",
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
        <h1 className="text-3xl font-bold text-foreground">Profil Usaha</h1>
        <p className="text-muted-foreground">
          Kelola profil pemilik dan data usaha Anda
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 border-b border-border"
      >
        {(["owner", "businesses"] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 font-semibold transition-all border-b-2 ${
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
          className="space-y-6"
        >
          {/* Owner Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-3xl font-bold">
                    {ownerProfile.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {ownerProfile.name}
                    </h2>
                    <p className="text-muted-foreground mt-1">Pemilik UMKM</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Bergabung sejak {ownerProfile.joinDate}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingOwner(!editingOwner)}
                  className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
                >
                  {editingOwner ? "Batal" : "Edit"}
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
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
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <IconComponent className="w-5 h-5 text-primary" />
                            <label className="text-sm font-semibold text-muted-foreground">
                              {field.label}
                            </label>
                          </div>
                          <p className="text-foreground font-medium">
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
          className="space-y-6"
        >
          {/* Add Business Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddBusiness(!showAddBusiness)}
            className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-primary text-primary font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tambah Usaha Baru
          </motion.button>

          {/* Add Business Form */}
          {showAddBusiness && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <AddBusinessForm onClose={() => setShowAddBusiness(false)} />
            </motion.div>
          )}

          {/* Businesses Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {businesses.map((business) => (
              <motion.div
                key={business.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {business.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {business.sector}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600">
                      {business.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
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
                        <div key={index} className="flex items-start gap-3">
                          <IconComponent className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">
                              {field.label}
                            </p>
                            <p className="text-foreground font-medium text-sm">
                              {field.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-3 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all text-sm"
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Nama Lengkap", key: "name" },
          { label: "Email", key: "email" },
          { label: "Nomor Telepon", key: "phone" },
          { label: "NIK", key: "nik" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={formData[field.key as keyof typeof formData]}
              onChange={(e) =>
                setFormData({ ...formData, [field.key]: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Alamat
        </label>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
        />
      </div>

      <div className="flex gap-3">
        <motion.button
          type="button"
          onClick={onSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all"
        >
          Batal
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-foreground">Tambah Usaha Baru</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Nama Usaha
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            placeholder="Masukkan nama usaha"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Sektor Usaha
          </label>
          <select
            value={formData.sector}
            onChange={(e) =>
              setFormData({ ...formData, sector: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          >
            <option value="">Pilih sektor</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Fashion">Fashion</option>
            <option value="Kriya">Kriya</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            NIB
          </label>
          <input
            type="text"
            value={formData.nib}
            onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
            placeholder="Masukkan nomor NIB"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Jumlah Karyawan
          </label>
          <input
            type="number"
            value={formData.employees}
            onChange={(e) =>
              setFormData({ ...formData, employees: e.target.value })
            }
            placeholder="Masukkan jumlah karyawan"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Alamat Usaha
        </label>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Masukkan alamat lengkap"
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          required
        />
      </div>

      <div className="flex gap-3">
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all"
        >
          Batal
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all"
        >
          Tambah Usaha
        </motion.button>
      </div>
    </form>
  );
}
