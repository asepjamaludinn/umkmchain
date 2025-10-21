"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterUMKMPage() {
  const [step, setStep] = useState<"owner" | "business">("owner");
  const [ownerData, setOwnerData] = useState({
    name: "",
    ktpNumber: "",
    ktpFile: null as File | null,
  });
  const [businessData, setBusinessData] = useState({
    businessName: "",
    address: "",
    sector: "",
    nibNumber: "",
    nibFile: null as File | null,
  });

  const handleOwnerSubmit = (data: typeof ownerData) => {
    setOwnerData(data);
    setStep("business");
  };

  const handleBusinessSubmit = async (data: typeof businessData) => {
    setBusinessData(data);
    // Here you would send the data to your backend
    console.log("Registration data:", { ownerData, businessData: data });
    alert("UMKM berhasil didaftarkan!");
  };

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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Daftar UMKM Baru
        </h1>
        <p className="text-muted-foreground">
          Lengkapi data identitas pemilik dan legalitas usaha Anda
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 flex items-center justify-between"
      >
        {[
          { step: "owner", label: "Data Pemilik" },
          { step: "business", label: "Data Usaha" },
        ].map((item, index) => (
          <motion.div
            key={item.step}
            variants={itemVariants}
            className="flex items-center flex-1"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step === item.step ||
                (step === "business" && item.step === "owner")
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-3">
              <p className="font-semibold text-foreground">{item.label}</p>
            </div>
            {index < 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                  step === "business" ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Form Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-xl p-8"
      >
        {step === "owner" ? (
          <OwnerForm onSubmit={handleOwnerSubmit} />
        ) : (
          <BusinessForm
            onSubmit={handleBusinessSubmit}
            onBack={() => setStep("owner")}
          />
        )}
      </motion.div>
    </div>
  );
}

function OwnerForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    ktpNumber: "",
    ktpFile: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Nama harus diisi";
    if (!formData.ktpNumber) newErrors.ktpNumber = "Nomor KTP harus diisi";
    if (!formData.ktpFile) newErrors.ktpFile = "Scan KTP harus diunggah";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Identitas Pemilik Usaha
      </h2>

      {/* Nama */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Nama Lengkap
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Masukkan nama lengkap"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* NIK */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Nomor Induk Kependudukan (NIK)
        </label>
        <input
          type="text"
          value={formData.ktpNumber}
          onChange={(e) =>
            setFormData({ ...formData, ktpNumber: e.target.value })
          }
          placeholder="Masukkan 16 digit NIK"
          maxLength={16}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {errors.ktpNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.ktpNumber}</p>
        )}
      </div>

      {/* KTP Upload */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Scan KTP
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all cursor-pointer">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) =>
              setFormData({ ...formData, ktpFile: e.target.files?.[0] || null })
            }
            className="hidden"
            id="ktp-upload"
          />
          <label htmlFor="ktp-upload" className="cursor-pointer">
            <div className="flex justify-center mb-2">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="font-semibold text-foreground">
              {formData.ktpFile
                ? formData.ktpFile.name
                : "Klik untuk upload atau drag & drop"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Format: JPG, PNG, PDF (Max 5MB)
            </p>
          </label>
        </div>
        {errors.ktpFile && (
          <p className="text-red-500 text-sm mt-1">{errors.ktpFile}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-lg transition-all"
      >
        Lanjut ke Data Usaha
      </motion.button>
    </form>
  );
}

function BusinessForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: any) => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    sector: "",
    nibNumber: "",
    nibFile: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.businessName)
      newErrors.businessName = "Nama usaha harus diisi";
    if (!formData.address) newErrors.address = "Alamat usaha harus diisi";
    if (!formData.sector) newErrors.sector = "Sektor usaha harus dipilih";
    if (!formData.nibNumber) newErrors.nibNumber = "Nomor NIB harus diisi";
    if (!formData.nibFile) newErrors.nibFile = "Dokumen NIB harus diunggah";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Legalitas Dasar Usaha
      </h2>

      {/* Nama Usaha */}
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
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {errors.businessName && (
          <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
        )}
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Alamat Usaha
        </label>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Masukkan alamat lengkap usaha"
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* Sektor */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Sektor Usaha
        </label>
        <select
          value={formData.sector}
          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        >
          <option value="">Pilih sektor usaha</option>
          <option value="kuliner">Kuliner</option>
          <option value="fashion">Fashion</option>
          <option value="kriya">Kriya</option>
        </select>
        {errors.sector && (
          <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
        )}
      </div>

      {/* NIB */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Nomor Induk Berusaha (NIB)
        </label>
        <input
          type="text"
          value={formData.nibNumber}
          onChange={(e) =>
            setFormData({ ...formData, nibNumber: e.target.value })
          }
          placeholder="Masukkan nomor NIB"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {errors.nibNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.nibNumber}</p>
        )}
      </div>

      {/* NIB Upload */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Upload Dokumen NIB
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all cursor-pointer">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) =>
              setFormData({ ...formData, nibFile: e.target.files?.[0] || null })
            }
            className="hidden"
            id="nib-upload"
          />
          <label htmlFor="nib-upload" className="cursor-pointer">
            <div className="flex justify-center mb-2">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="font-semibold text-foreground">
              {formData.nibFile
                ? formData.nibFile.name
                : "Klik untuk upload atau drag & drop"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Format: JPG, PNG, PDF (Max 5MB)
            </p>
          </label>
        </div>
        {errors.nibFile && (
          <p className="text-red-500 text-sm mt-1">{errors.nibFile}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all"
        >
          Kembali
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-lg transition-all"
        >
          Daftar UMKM
        </motion.button>
      </div>
    </form>
  );
}
