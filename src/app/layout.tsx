import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import NavbarWrapper from "@/components/layout/navbar-wrapper"
import { AuthProvider } from "@/lib/auth-context"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

export const metadata: Metadata = {
  title: "UMKMChain - Verifikasi Blockchain untuk UMKM",
  description: "Platform blockchain terpercaya untuk verifikasi legalitas dan aset UMKM Indonesia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <AuthProvider>
          <NavbarWrapper />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
