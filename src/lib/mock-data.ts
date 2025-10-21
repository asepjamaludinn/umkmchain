// Mock Users Data
export const mockUsers = {
  umkm: [
    {
      id: "umkm-001",
      email: "budi@umkm.com",
      password: "demo123",
      name: "Budi Santoso",
      type: "umkm" as const,
      nik: "3201234567890123",
      phone: "081234567890",
      address: "Jl. Merdeka No. 123, Jakarta",
    },
    {
      id: "umkm-002",
      email: "siti@fashion.com",
      password: "demo123",
      name: "Siti Nurhaliza",
      type: "umkm" as const,
      nik: "3202345678901234",
      phone: "082345678901",
      address: "Jl. Sudirman No. 456, Bandung",
    },
  ],
  regulator: [
    {
      id: "reg-001",
      email: "admin@regulator.com",
      password: "demo123",
      name: "Admin Regulator",
      type: "regulator" as const,
      agency: "Dinas Koperasi dan UMKM",
      phone: "021-1234567",
    },
    {
      id: "reg-002",
      email: "verifikator@regulator.com",
      password: "demo123",
      name: "Verifikator Dokumen",
      type: "regulator" as const,
      agency: "Dinas Koperasi dan UMKM",
      phone: "021-7654321",
    },
  ],
};

// Mock UMKM Data
export const mockUMKMData = [
  {
    id: "umkm-001",
    ownerName: "Budi Santoso",
    ownerNIK: "3201234567890123",
    ownerKTP: "/ktp-card.png",
    businessName: "Toko Kuliner Budi",
    businessAddress: "Jl. Merdeka No. 123, Jakarta",
    sector: "kuliner",
    sectorIcon: "utensils",
    nib: "1234567890123456",
    nibDocument: "/nib.jpg",
    registrationDate: "2024-01-15",
    status: "approved",
    certificateHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e0",
    certificateDate: "2024-02-01",
    qrCode: "/qr.jpg",
    verificationHistory: [
      {
        id: "ver-001",
        date: "2024-01-15",
        status: "pending",
        notes: "Dokumen diterima",
      },
      {
        id: "ver-002",
        date: "2024-01-20",
        status: "approved",
        notes: "Verifikasi dokumen selesai",
      },
    ],
  },
  {
    id: "umkm-002",
    ownerName: "Siti Nurhaliza",
    ownerNIK: "3202345678901234",
    ownerKTP: "/ktp-card.png",
    businessName: "Fashion Siti Boutique",
    businessAddress: "Jl. Sudirman No. 456, Bandung",
    sector: "fashion",
    sectorIcon: "shirt",
    nib: "2345678901234567",
    nibDocument: "/nib.jpg",
    registrationDate: "2024-02-10",
    status: "pending",
    certificateHash: null,
    walletAddress: null,
    certificateDate: null,
    qrCode: null,
    verificationHistory: [
      {
        id: "ver-003",
        date: "2024-02-10",
        status: "pending",
        notes: "Menunggu verifikasi dokumen",
      },
    ],
  },
  {
    id: "umkm-003",
    ownerName: "Ahmad Wijaya",
    ownerNIK: "3203456789012345",
    ownerKTP: "/ktp-card.png",
    businessName: "Kerajinan Tangan Ahmad",
    businessAddress: "Jl. Ahmad Yani No. 789, Yogyakarta",
    sector: "kriya",
    sectorIcon: "palette",
    nib: "3456789012345678",
    nibDocument: "/nib.jpg",
    registrationDate: "2024-01-05",
    status: "approved",
    certificateHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q",
    walletAddress: "0x8a3f5d7e9c1b2a4f6e8d0c2b4a6f8e0d",
    certificateDate: "2024-01-25",
    qrCode: "/qr.jpg",
    verificationHistory: [
      {
        id: "ver-004",
        date: "2024-01-05",
        status: "pending",
        notes: "Dokumen diterima",
      },
      {
        id: "ver-005",
        date: "2024-01-15",
        status: "approved",
        notes: "Verifikasi dokumen selesai",
      },
    ],
  },
];

// Mock Regulator Review Data
export const mockReviewData = [
  {
    id: "review-001",
    umkmId: "umkm-002",
    umkmName: "Fashion Siti Boutique",
    ownerName: "Siti Nurhaliza",
    documentType: "NIB",
    submissionDate: "2024-02-10",
    status: "pending",
    reviewer: null,
    reviewDate: null,
    notes: null,
  },
  {
    id: "review-002",
    umkmId: "umkm-001",
    umkmName: "Toko Kuliner Budi",
    ownerName: "Budi Santoso",
    documentType: "KTP",
    submissionDate: "2024-01-15",
    status: "approved",
    reviewer: "Admin Regulator",
    reviewDate: "2024-01-20",
    notes: "Dokumen valid dan lengkap",
  },
];

// Mock Audit History
export const mockAuditHistory = [
  {
    id: "audit-001",
    timestamp: "2024-02-15 10:30",
    action: "UMKM Registered",
    actionIcon: "plus-circle",
    umkmName: "Fashion Siti Boutique",
    actor: "Siti Nurhaliza",
    details: "Pendaftaran UMKM baru",
  },
  {
    id: "audit-002",
    timestamp: "2024-02-14 14:15",
    action: "Document Reviewed",
    actionIcon: "check-circle",
    umkmName: "Toko Kuliner Budi",
    actor: "Admin Regulator",
    details: "Dokumen NIB disetujui",
  },
  {
    id: "audit-003",
    timestamp: "2024-02-13 09:45",
    action: "Certificate Generated",
    actionIcon: "award",
    umkmName: "Kerajinan Tangan Ahmad",
    actor: "Admin Regulator",
    details: "Sertifikat digital dibuat",
  },
  {
    id: "audit-004",
    timestamp: "2024-02-12 16:20",
    action: "Document Uploaded",
    actionIcon: "upload",
    umkmName: "Fashion Siti Boutique",
    actor: "Siti Nurhaliza",
    details: "Upload dokumen NIB",
  },
];

// Mock Dashboard Stats
export const mockDashboardStats = {
  umkm: {
    totalRegistered: 3,
    approved: 2,
    pending: 1,
    rejected: 0,
  },
  regulator: {
    totalUMKM: 3,
    pendingReview: 1,
    approved: 2,
    rejected: 0,
  },
};
