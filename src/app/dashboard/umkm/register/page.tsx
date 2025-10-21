"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  ImageUpIcon,
  XIcon,
  AlertCircleIcon,
  PartyPopper,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { useFileUpload } from "@/hooks/use-file-upload";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// --- Data Types (No change needed here) ---
type OwnerData = { name: string; ktpNumber: string; ktpFile: File | null };
type BusinessData = {
  businessName: string;
  address: string;
  sector: string;
  nibNumber: string;
  nibFile: File | null;
};

type OwnerDataErrors = {
  name?: string;
  ktpNumber?: string;
  ktpFile?: string;
};

type BusinessDataErrors = {
  businessName?: string;
  address?: string;
  sector?: string;
  nibNumber?: string;
  nibFile?: string;
};

const registrationSteps = [
  { step: 1, title: "Data Pemilik", icon: User },
  { step: 2, title: "Data Usaha", icon: Briefcase },
];

export default function RegisterUMKMPage() {
  const [step, setStep] = useState(1);
  const [ownerData, setOwnerData] = useState<OwnerData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOwnerSubmit = (data: OwnerData) => {
    setOwnerData(data);
    setStep(2);
  };

  const handleBusinessSubmit = async (data: BusinessData) => {
    console.log("Registration data:", { ownerData, businessData: data });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="p-4 sm:p-6 max-w-2xl mx-auto flex flex-col items-center justify-center text-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <PartyPopper className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Pendaftaran Berhasil!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Data UMKM Anda telah berhasil dikirim. <br /> Tim kami akan segera
            melakukan verifikasi.
          </p>
          <Button onClick={() => window.location.reload()} className="mt-6">
            Daftarkan UMKM Lain
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8 text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
          Daftar UMKM Baru
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Lengkapi data identitas pemilik dan legalitas usaha Anda.
        </p>
      </motion.div>

      <div className="mb-8">
        <Stepper value={step}>
          {registrationSteps.map(({ step: currentStepVal, title }) => (
            <StepperItem
              key={currentStepVal}
              step={currentStepVal}
              className="flex-1"
            >
              <div className="flex items-center gap-3">
                <StepperIndicator>
                  {currentStepVal < 2 ? <User /> : <Briefcase />}
                </StepperIndicator>
                <div>
                  <StepperTitle className="text-sm sm:text-base">
                    {title}
                  </StepperTitle>
                </div>
              </div>
              {currentStepVal < registrationSteps.length && (
                <StepperSeparator className="ml-5 sm:ml-6" />
              )}
            </StepperItem>
          ))}
        </Stepper>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: step === 1 ? -30 : 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: step === 1 ? 30 : -30 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Card>
          {step === 1 ? (
            <OwnerForm onSubmit={handleOwnerSubmit} />
          ) : (
            <BusinessForm
              onSubmit={handleBusinessSubmit}
              onBack={() => setStep(1)}
            />
          )}
        </Card>
      </motion.div>
    </div>
  );
}

function FileUploader({
  onFileSelect,
  label,
  accept,
  maxSizeMB = 5,
}: {
  onFileSelect: (file: File | null) => void;
  initialFile: File | null;
  label: string;
  accept: string;
  maxSizeMB?: number;
}) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept,
    maxSize: maxSizeMB * 1024 * 1024,
    multiple: false,
  });

  React.useEffect(() => {
    onFileSelect(files[0]?.file || null);
  }, [files, onFileSelect]);

  const currentFile = files[0];
  const isImage = currentFile?.file.type.startsWith("image/");
  const isPdf = currentFile?.file.type === "application/pdf";
  const previewUrl = currentFile?.preview;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className={`relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors hover:bg-accent/50 ${
            isImage ? "has-[img]:border-none" : ""
          } has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring/50 data-[dragging=true]:bg-accent/50 ${
            errors.length > 0 ? "border-destructive" : "border-input"
          }`}
        >
          <input {...getInputProps()} className="sr-only" />
          {isImage && previewUrl ? (
            <div className="absolute inset-0">
              <Image
                src={previewUrl}
                alt={currentFile?.file?.name || "Preview"}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ) : isPdf && currentFile ? (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground truncate max-w-full">
                {currentFile.file.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                File PDF dipilih
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                aria-hidden="true"
              >
                <ImageUpIcon className="size-5 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Jatuhkan file di sini atau{" "}
                <span className="text-primary">klik untuk browse</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Maksimal {maxSizeMB}MB. Tipe:{" "}
                {accept
                  .replaceAll("image/*", "Gambar")
                  .replace("application/pdf", "PDF")}
              </p>
            </div>
          )}
        </div>
        {currentFile && (
          <div className="absolute top-2 right-2 z-10">
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="h-7 w-7 rounded-full shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(currentFile.id);
                onFileSelect(null);
              }}
            >
              <XIcon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Hapus file</span>
            </Button>
          </div>
        )}
      </div>
      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive mt-1"
          role="alert"
        >
          <AlertCircleIcon className="h-3.5 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}

function OwnerForm({ onSubmit }: { onSubmit: (data: OwnerData) => void }) {
  const [formData, setFormData] = useState<OwnerData>({
    name: "",
    ktpNumber: "",
    ktpFile: null,
  });

  const [errors, setErrors] = useState<OwnerDataErrors>({});

  const handleKtpFileSelect = React.useCallback(
    (file: File | null) => {
      setFormData((prev) => ({ ...prev, ktpFile: file }));

      if (file && errors.ktpFile) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.ktpFile;
          return newErrors;
        });
      }
    },
    [errors.ktpFile]
  );

  const validate = () => {
    const newErrors: OwnerDataErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi.";
      isValid = false;
    }
    if (!formData.ktpNumber.trim()) {
      newErrors.ktpNumber = "Nomor KTP (NIK) wajib diisi.";
      isValid = false;
    } else if (!/^\d{16}$/.test(formData.ktpNumber)) {
      newErrors.ktpNumber = "NIK harus terdiri dari 16 digit angka.";
      isValid = false;
    }

    if (!formData.ktpFile) {
      newErrors.ktpFile = "Scan/Foto KTP wajib diunggah.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Identitas Pemilik Usaha
        </CardTitle>
        <CardDescription>Masukkan data sesuai KTP Anda.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="owner-name">Nama Lengkap (sesuai KTP)</Label>
          <Input
            id="owner-name"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            placeholder="Masukkan nama lengkap"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner-ktp">Nomor Induk Kependudukan (NIK)</Label>
          <Input
            id="owner-ktp"
            value={formData.ktpNumber}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                ktpNumber: e.target.value.replace(/\D/g, ""),
              }))
            }
            placeholder="Masukkan 16 digit NIK"
            maxLength={16}
            className={errors.ktpNumber ? "border-destructive" : ""}
          />
          {errors.ktpNumber && (
            <p className="text-xs text-destructive">{errors.ktpNumber}</p>
          )}
        </div>
        <FileUploader
          label="Scan/Foto KTP"
          accept="image/*,.pdf"
          initialFile={formData.ktpFile}
          onFileSelect={handleKtpFileSelect}
        />
        {errors.ktpFile && (
          <p className="text-xs text-destructive -mt-2">{errors.ktpFile}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Lanjut ke Data Usaha
        </Button>
      </CardFooter>
    </form>
  );
}

function BusinessForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: BusinessData) => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState<BusinessData>({
    businessName: "",
    address: "",
    sector: "",
    nibNumber: "",
    nibFile: null,
  });

  const [errors, setErrors] = useState<BusinessDataErrors>({});

  const handleNibFileSelect = React.useCallback(
    (file: File | null) => {
      setFormData((prev) => ({ ...prev, nibFile: file }));

      if (file && errors.nibFile) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.nibFile;
          return newErrors;
        });
      }
    },
    [errors.nibFile]
  );

  const validate = () => {
    const newErrors: BusinessDataErrors = {};
    let isValid = true;

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Nama usaha wajib diisi.";
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Alamat usaha wajib diisi.";
      isValid = false;
    }
    if (!formData.sector) {
      newErrors.sector = "Sektor usaha wajib dipilih.";
      isValid = false;
    }
    if (!formData.nibNumber.trim()) {
      newErrors.nibNumber = "Nomor NIB wajib diisi.";
      isValid = false;
    }

    if (!formData.nibFile) {
      newErrors.nibFile = "Dokumen NIB wajib diunggah.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Legalitas Dasar Usaha
        </CardTitle>
        <CardDescription>
          Masukkan informasi mengenai usaha Anda.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business-name">Nama Usaha</Label>
          <Input
            id="business-name"
            value={formData.businessName}
            onChange={(e) =>
              setFormData((p) => ({ ...p, businessName: e.target.value }))
            }
            placeholder="Contoh: Warung Makan Barokah"
            className={errors.businessName ? "border-destructive" : ""}
          />
          {errors.businessName && (
            <p className="text-xs text-destructive">{errors.businessName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="business-address">Alamat Lengkap Usaha</Label>
          <Textarea
            id="business-address"
            value={formData.address}
            onChange={(e) =>
              setFormData((p) => ({ ...p, address: e.target.value }))
            }
            placeholder="Masukkan alamat lengkap usaha"
            rows={3}
            className={errors.address ? "border-destructive" : ""}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="business-sector">Sektor Usaha</Label>
          <Select
            value={formData.sector}
            onValueChange={(value) => {
              setFormData((p) => ({ ...p, sector: value }));
              if (errors.sector) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.sector;
                  return newErrors;
                });
              }
            }}
          >
            <SelectTrigger
              id="business-sector"
              className={errors.sector ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Pilih sektor usaha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kuliner">Kuliner</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="kriya">Kriya</SelectItem>
            </SelectContent>
          </Select>
          {errors.sector && (
            <p className="text-xs text-destructive">{errors.sector}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="business-nib">Nomor Induk Berusaha (NIB)</Label>
          <Input
            id="business-nib"
            value={formData.nibNumber}
            onChange={(e) =>
              setFormData((p) => ({ ...p, nibNumber: e.target.value }))
            }
            placeholder="Masukkan nomor NIB"
            className={errors.nibNumber ? "border-destructive" : ""}
          />
          {errors.nibNumber && (
            <p className="text-xs text-destructive">{errors.nibNumber}</p>
          )}
        </div>
        <FileUploader
          label="Upload Dokumen NIB"
          accept="application/pdf"
          initialFile={formData.nibFile}
          onFileSelect={handleNibFileSelect}
        />
        {errors.nibFile && (
          <p className="text-xs text-destructive -mt-2">{errors.nibFile}</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          Kembali
        </Button>
        <Button type="submit" className="w-full sm:flex-1">
          Daftar UMKM
        </Button>
      </CardFooter>
    </form>
  );
}
