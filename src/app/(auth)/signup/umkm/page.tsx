"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import ChainIcon from "@/components/icons/chain-icon";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const umkmSignupSchema = z.object({
  ownerName: z.string().min(1, "Nama pemilik harus diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .regex(/^\+?\d+$/, {
      message: "Format nomor telepon tidak valid. Hanya angka dan '+' di awal.",
    })
    .min(10, "Nomor telepon minimal 10 digit (termasuk +62 jika ada)"),
  businessName: z.string().min(1, "Nama usaha harus diisi"),
  sector: z.string().min(1, "Sektor harus dipilih"),
  address: z.string().min(1, "Alamat harus diisi"),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Alamat wallet tidak valid")
    .optional()
    .or(z.literal("")),
  password: z.string().min(8, "Password minimal 8 karakter"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan",
  }),
});

type UmkmSignupForm = z.infer<typeof umkmSignupSchema>;

export default function UMKMSignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UmkmSignupForm>({
    resolver: zodResolver(umkmSignupSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phone: "",
      businessName: "",
      sector: "",
      address: "",
      walletAddress: "",
      password: "",
      terms: false,
    },
  });

  const { onChange: onPhoneChange, ...phoneRest } = register("phone");

  const onSubmit = async (data: UmkmSignupForm) => {
    console.log("Data Pendaftaran UMKM:", data);
    // Simulasi submit
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 relative z-10">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl bg-card rounded-3xl border-2 border-border shadow-xl p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                  <ChainIcon className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  UMKMChain
                </h1>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Daftar UMKM
              </h2>
              <p className="text-lg text-muted-foreground">
                Lengkapi data bisnis Anda untuk memulai verifikasi
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nama Pemilik */}
              <div className="space-y-2">
                <label
                  htmlFor="ownerName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Nama Pemilik
                </label>
                <input
                  id="ownerName"
                  type="text"
                  placeholder="Masukkan nama pemilik"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...register("ownerName")}
                />
                {errors.ownerName && (
                  <p className="text-sm text-destructive">
                    {errors.ownerName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="nama@perusahaan.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* No Telepon */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-foreground"
                >
                  No Telepon
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+6281234567890"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...phoneRest}
                  onChange={(e) => {
                    const val = e.target.value;

                    const filteredVal = val
                      .split("")
                      .filter((char, index) => {
                        if (index === 0 && char === "+") return true;

                        return /\d/.test(char);
                      })
                      .join("");

                    e.target.value = filteredVal;

                    onPhoneChange(e);
                  }}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Wallet Address */}
              <div className="space-y-2">
                <label
                  htmlFor="walletAddress"
                  className="block text-sm font-semibold text-foreground"
                >
                  Wallet Address (Opsional)
                </label>
                <input
                  id="walletAddress"
                  type="text"
                  placeholder="Contoh: 0xAbC...DeF"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...register("walletAddress")}
                />
                {errors.walletAddress && (
                  <p className="text-sm text-destructive">
                    {errors.walletAddress.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Dibutuhkan untuk interaksi blockchain. Pastikan alamat benar.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-foreground"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat password yang kuat"
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 rounded border-border text-primary mt-1 focus:ring-ring"
                  {...register("terms")}
                />
                <div className="flex-1">
                  <label htmlFor="terms" className="text-sm text-foreground">
                    Saya setuju dengan{" "}
                    <Link
                      href="#"
                      className="text-primary hover:text-accent font-medium"
                    >
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link
                      href="#"
                      className="text-primary hover:text-accent font-medium"
                    >
                      Kebijakan Privasi
                    </Link>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.terms.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center space-y-4 pt-4 border-t border-border">
              <p className="text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  href="/login/umkm"
                  className="text-primary hover:text-accent font-semibold"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
