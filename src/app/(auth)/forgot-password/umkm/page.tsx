"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChainIcon from "@/components/icons/chain-icon";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function UMKMForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    console.log("Mengirim tautan reset UMKM ke:", data.email);
    // Simulasi request API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Setelah berhasil, update UI state
    setSubmittedEmail(data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Background blur effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      <div className="flex justify-center px-6 pt-40">
        <div className="w-full max-w-md bg-card rounded-3xl border-2 border-border shadow-xl p-8 space-y-8">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Periksa Email Anda
              </h2>
              <p className="text-muted-foreground">
                Tautan reset password untuk akun UMKM Anda telah dikirim ke{" "}
                <span className="font-semibold text-primary">
                  {submittedEmail}
                </span>
                .
              </p>
              <div className="pt-4">
                <Link
                  href="/login/umkm"
                  className="text-primary hover:text-accent font-semibold"
                >
                  Kembali ke Login UMKM
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                    <ChainIcon className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    UMKMChain
                  </h1>
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Lupa Password UMKM
                </h2>
                <p className="text-muted-foreground">
                  Masukkan email akun UMKM Anda untuk mengatur ulang password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Email Akun UMKM
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-ring focus:outline-none transition-colors bg-background text-foreground placeholder-muted-foreground"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Tautan Reset"}
                </button>
              </form>

              <div className="text-center pt-4">
                <p className="text-muted-foreground">
                  Ingat password?{" "}
                  <Link
                    href="/login/umkm"
                    className="text-primary hover:text-accent font-semibold"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
