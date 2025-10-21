"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import ChainIcon from "@/components/icons/chain-icon";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const regulatorSignupSchema = z.object({
  institutionName: z.string().min(1, "Nama instansi harus diisi"),
  officerName: z.string().min(1, "Nama officer harus diisi"),
  email: z.string().email("Email instansi tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  verificationCode: z.string().min(1, "Kode verifikasi harus diisi"),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Alamat wallet tidak valid"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan",
  }),
});

type RegulatorSignupForm = z.infer<typeof regulatorSignupSchema>;

export default function RegulatorSignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegulatorSignupForm>({
    resolver: zodResolver(regulatorSignupSchema),
  });

  const onSubmit = async (data: RegulatorSignupForm) => {
    console.log("Data Pendaftaran Regulator:", data);
    // Simulasi submit
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

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
                Daftar Regulator
              </h2>
              <p className="text-lg text-muted-foreground">
                Lengkapi data instansi Anda untuk memulai verifikasi
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nama Instansi */}
              <div className="space-y-2">
                <label
                  htmlFor="institutionName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Nama Instansi
                </label>
                <input
                  id="institutionName"
                  type="text"
                  placeholder="Masukkan nama instansi"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...register("institutionName")}
                />
                {errors.institutionName && (
                  <p className="text-sm text-destructive">
                    {errors.institutionName.message}
                  </p>
                )}
              </div>

              {/* Nama Officer */}
              <div className="space-y-2">
                <label
                  htmlFor="officerName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Nama Officer
                </label>
                <input
                  id="officerName"
                  type="text"
                  placeholder="Masukkan nama officer penanggung jawab"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...register("officerName")}
                />
                {errors.officerName && (
                  <p className="text-sm text-destructive">
                    {errors.officerName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground"
                >
                  Email Resmi
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="nama@instansi.gov.id"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
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

              {/* Kode Verifikasi */}
              <div className="space-y-2">
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-semibold text-foreground"
                >
                  Kode Verifikasi Instansi
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  placeholder="Masukkan kode verifikasi khusus"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                  {...register("verificationCode")}
                />
                {errors.verificationCode && (
                  <p className="text-sm text-destructive">
                    {errors.verificationCode.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Kode ini diberikan oleh administrator sistem.
                </p>
              </div>

              {/* Wallet Address */}
              <div className="space-y-2">
                <label
                  htmlFor="walletAddress"
                  className="block text-sm font-semibold text-foreground"
                >
                  Wallet Address
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
                  href="/login/regulator"
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
