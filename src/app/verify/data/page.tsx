"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ChainIcon from "@/components/icons/chain-icon";
import CheckStrokeIcon from "@/components/icons/check-stroke-icon";

export default function VerifyDataPage() {
  const searchParams = useSearchParams();
  const idHash = searchParams.get("id") || "Tidak Diketahui";

  const mockData: Record<string, any> = {
    "NIB-001": {
      businessName: "PT Maju Jaya Indonesia",
      owner: "Budi Santoso",
      status: "Terverifikasi",
      registrationDate: "2024-01-15",
      businessType: "Fashion",
      location: "Jakarta, Indonesia",
      employees: 150,
      revenue: "$2.5M",
      certifications: ["ISO 9001", "ISO 14001"],
    },
    default: {
      businessName: "Nama Usaha Anda",
      owner: "Nama Pemilik",
      status: "Terverifikasi",
      registrationDate: "2024-10-19",
      businessType: "Kuliner",
      location: "Indonesia",
      employees: 50,
      revenue: "$500K",
      certifications: ["ISO 9001"],
    },
  };

  const data = mockData[idHash] || mockData["default"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 to-accent/10 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <ChainIcon className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              UMKMChain
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 space-y-8">
          {/* Status */}
          <div className="flex items-center gap-4 pb-6 border-b border-border">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckStrokeIcon />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status Verifikasi</p>
              <p className="text-2xl font-bold text-green-600">{data.status}</p>
            </div>
          </div>

          {/* Business Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Nama Usaha
                </p>
                <p className="text-xl font-bold text-foreground mt-1">
                  {data.businessName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Pemilik
                </p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {data.owner}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Jenis Usaha
                </p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {data.businessType}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Tanggal Registrasi
                </p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {data.registrationDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Lokasi
                </p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {data.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  ID Hash
                </p>
                <p className="text-lg font-semibold text-foreground mt-1 font-mono">
                  {idHash}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Karyawan</p>
              <p className="text-2xl font-bold text-primary mt-1">
                {data.employees}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Pendapatan Tahunan
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {data.revenue}
              </p>
            </div>
            <div className="bg-accent/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Sertifikasi</p>
              <p className="text-lg font-bold text-accent mt-1">
                {data.certifications.length}
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground font-medium mb-3">
              Sertifikasi
            </p>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert: string) => (
                <span
                  key={cert}
                  className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-border">
            <Link
              href="/login"
              className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-accent transition text-center"
            >
              Masuk ke Dashboard
            </Link>
            <Link
              href="/verify"
              className="flex-1 bg-muted text-muted-foreground font-semibold py-3 rounded-lg hover:bg-border transition text-center"
            >
              Verifikasi ID Lain
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
