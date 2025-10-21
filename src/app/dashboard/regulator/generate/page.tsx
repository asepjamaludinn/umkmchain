"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, Zap, Info, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const initialVerifiedUMKMs = [
  {
    id: 1,
    name: "CV. Maju Jaya",
    owner: "Budi Santoso",
    sector: "Kuliner",
    nib: "1234567890123456",
    verifiedDate: "2024-01-15",
    certificateId: null as string | null,
  },
  {
    id: 2,
    name: "UD. Berkah",
    owner: "Siti Nurhaliza",
    sector: "Fashion",
    nib: "1234567890123457",
    verifiedDate: "2024-01-10",
    certificateId: "0x9b2e4f1c8a3d5f7e2c9a1b4d6f8e3a5c" as string | null,
  },
  {
    id: 3,
    name: "Warung Makan Jaya",
    owner: "Dewi Lestari",
    sector: "Kuliner",
    nib: "1234567890123459",
    verifiedDate: "2024-01-18",
    certificateId: null as string | null,
  },
];
type VerifiedUMKM = (typeof initialVerifiedUMKMs)[number];

export default function GeneratePage() {
  const [openItemId, setOpenItemId] = React.useState<number | null>(null);
  const [umkmList, setUmkmList] =
    React.useState<VerifiedUMKM[]>(initialVerifiedUMKMs);

  const [generatingId, setGeneratingId] = React.useState<number | null>(null);

  const handleGenerateCertificate = (umkmId: number) => {
    setGeneratingId(umkmId);
    setTimeout(() => {
      // Buat ID sertifikat dummy (di aplikasi nyata ini dari respons API/blockchain)
      const newCertificateId = `0x${Math.random()
        .toString(16)
        .substring(2, 12)}${Math.random().toString(16).substring(2, 12)}`;

      setUmkmList((currentList) =>
        currentList.map((umkm) =>
          umkm.id === umkmId
            ? { ...umkm, certificateId: newCertificateId }
            : umkm
        )
      );

      setGeneratingId(null);
      console.log(
        `Sertifikat digital untuk UMKM ID ${umkmId} berhasil digenerate! ID: ${newCertificateId}`
      );
    }, 1500);
  };

  const handleDownloadCertificate = (certificateId: string | null) => {
    if (!certificateId) return;
    console.log(`Mulai download sertifikat dengan ID: ${certificateId}`);
    alert(
      `Fungsi download untuk sertifikat ${certificateId} belum diimplementasikan.`
    );
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
          Generate Sertifikat Digital
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Buat dan terbitkan sertifikat digital untuk UMKM yang terverifikasi.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
      >
        {umkmList.map((umkm) => (
          <motion.div key={umkm.id} variants={itemVariants}>
            <Collapsible
              open={openItemId === umkm.id}
              onOpenChange={(isOpen) => setOpenItemId(isOpen ? umkm.id : null)}
            >
              <Card className="overflow-hidden transition-all">
                {/* Header Kartu */}
                <CardHeader className="p-4 sm:p-6 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">
                      {umkm.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {umkm.owner}
                    </CardDescription>
                  </div>
                  {/* Badge Status */}
                  {umkm.certificateId ? (
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-600 border-green-500/20 whitespace-nowrap"
                    >
                      <Check className="h-3 w-3 mr-1" /> Generated
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 whitespace-nowrap"
                    >
                      <Zap className="h-3 w-3 mr-1" /> Siap Generate
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Sektor", value: umkm.sector },
                      { label: "NIB", value: umkm.nib },
                      { label: "Terverifikasi", value: umkm.verifiedDate },
                    ].map((field, index) => (
                      <div key={index}>
                        <p className="text-xs text-muted-foreground font-semibold uppercase">
                          {field.label}
                        </p>
                        <p className="text-foreground font-medium text-sm mt-1">
                          {field.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {openItemId === umkm.id
                        ? "Sembunyikan Detail"
                        : "Lihat Detail & Generate"}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-4 pt-4 mt-4 border-t">
                    {umkm.certificateId ? (
                      <Alert
                        variant="default"
                        className="bg-green-500/5 border-green-500/20"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-700">
                          Sertifikat Telah Digenerate
                        </AlertTitle>
                        <AlertDescription className="mt-2">
                          <Label className="text-xs font-semibold uppercase text-muted-foreground">
                            Certificate ID:
                          </Label>
                          <p className="font-mono text-xs break-all mt-1">
                            {umkm.certificateId}
                          </p>
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert
                        variant="default"
                        className="bg-blue-500/5 border-blue-500/20"
                      >
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-700">
                          Siap Generate Sertifikat
                        </AlertTitle>
                        <AlertDescription className="text-xs mt-1">
                          Klik tombol di bawah untuk membuat sertifikat digital
                          UMKM ini yang akan disimpan di blockchain.
                        </AlertDescription>
                      </Alert>
                    )}

                    {!umkm.certificateId ? (
                      <Button
                        onClick={() => handleGenerateCertificate(umkm.id)}
                        disabled={generatingId === umkm.id}
                        className="w-full"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {generatingId === umkm.id
                          ? "Generating..."
                          : "Generate Sertifikat"}
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleDownloadCertificate(umkm.certificateId)
                        }
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Sertifikat
                      </Button>
                    )}
                  </CollapsibleContent>
                </CardContent>
              </Card>
            </Collapsible>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {umkmList.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-card border border-border rounded-xl mt-6"
        >
          <Info className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
            Tidak Ada UMKM Terverifikasi
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Belum ada UMKM yang siap untuk dibuatkan sertifikat digital.
          </p>
        </motion.div>
      )}
    </div>
  );
}
