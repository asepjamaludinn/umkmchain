import {
  BarChart3,
  FileText,
  Award,
  History,
  User,
  List,
  FileCheck,
  CheckCircle,
} from "lucide-react";

export const dataSidebar = {
  umkm: {
    navMain: [
      {
        group: "Main",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard/umkm",
            icon: BarChart3,
          },
        ],
      },
      {
        group: "Perizinan",
        items: [
          {
            title: "Daftar UMKM",
            url: "/dashboard/umkm/register",
            icon: FileText,
          },
          {
            title: "Sertifikat Digital",
            url: "/dashboard/umkm/certificate",
            icon: Award,
          },
          {
            title: "Riwayat Izin",
            url: "/dashboard/umkm/history",
            icon: History,
          },
        ],
      },
      {
        group: "Manajemen",
        items: [
          {
            title: "Profil Usaha",
            url: "/dashboard/umkm/profile",
            icon: User,
          },
        ],
      },
    ],
    user: {
      name: "Budi Santoso",
      email: "budi@umkm.com",
      avatar: "BS",
    },
  },

  regulator: {
    navMain: [
      {
        group: "Main",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard/regulator",
            icon: BarChart3,
          },
        ],
      },
      {
        group: "Data & Dokumen",
        items: [
          {
            title: "Daftar UMKM",
            url: "/dashboard/regulator/umkm-list",
            icon: List,
          },
          {
            title: "Review Dokumen",
            url: "/dashboard/regulator/review",
            icon: FileCheck,
          },
        ],
      },
      {
        group: "Verifikasi & Sertifikasi",
        items: [
          {
            title: "Verifikasi",
            url: "/dashboard/regulator/verify",
            icon: CheckCircle,
          },
          {
            title: "Generate Sertifikat",
            url: "/dashboard/regulator/generate",
            icon: Award,
          },
        ],
      },
      {
        group: "Monitoring",
        items: [
          {
            title: "Audit History",
            url: "/dashboard/regulator/audit",
            icon: History,
          },
        ],
      },
    ],
    user: {
      name: "Admin Regulator",
      email: "admin@regulator.com",
      avatar: "AR",
    },
  },
};
