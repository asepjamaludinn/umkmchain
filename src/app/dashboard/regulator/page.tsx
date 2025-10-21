"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import colors from "tailwindcss/colors";
import { mockDashboardStats, mockUMKMData } from "@/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RegulatorDashboard() {
  const stats = [
    {
      label: "Total UMKM",
      value: mockDashboardStats.regulator.totalUMKM.toString(),
      icon: BarChart3,
    },
    {
      label: "Pending Review",
      value: mockDashboardStats.regulator.pendingReview.toString(),
      icon: Clock,
    },
    {
      label: "Terverifikasi",
      value: mockDashboardStats.regulator.approved.toString(),
      icon: CheckCircle,
    },
    {
      label: "Ditolak",
      value: mockDashboardStats.regulator.rejected.toString(),
      icon: XCircle,
    },
  ];

  const pendingReviews = mockUMKMData
    .filter((umkm) => umkm.status === "pending")
    .map((umkm) => ({
      id: umkm.id,
      name: umkm.businessName,
      sector: umkm.sector.charAt(0).toUpperCase() + umkm.sector.slice(1),
      status: "Pending",
      date: umkm.registrationDate,
    }));

  type ChartData = {
    name: string;
    value: number;
    fill: string;
  };

  const statusChartData: ChartData[] = [
    {
      name: "Pending",
      value: mockDashboardStats.regulator.pendingReview,
      fill: colors.yellow[500],
    },
    {
      name: "Terverifikasi",
      value: mockDashboardStats.regulator.approved,
      fill: colors.green[500],
    },
    {
      name: "Ditolak",
      value: mockDashboardStats.regulator.rejected,
      fill: colors.red[500],
    },
  ];

  if (statusChartData.every((d) => d.value === 0)) {
    statusChartData.push({
      name: "Belum Ada Data",
      value: 1,
      fill: colors.gray[400],
    });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
          Dashboard Regulator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Kelola verifikasi dan sertifikasi UMKM
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <StatIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {" "}
        <div className="space-y-6">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Status UMKM</CardTitle>
                <CardDescription>
                  Persentase UMKM berdasarkan status verifikasi.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} UMKM`, name]}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          {/* Pending Reviews Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg sm:text-xl font-bold">
                  Pending Review
                </CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard/regulator/verify">
                    Lihat Semua
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 sm:px-6">UMKM</TableHead>
                      <TableHead className="hidden md:table-cell px-4 sm:px-6">
                        Sektor
                      </TableHead>
                      <TableHead className="hidden sm:table-cell px-4 sm:px-6">
                        Tanggal
                      </TableHead>
                      <TableHead className="text-right px-4 sm:px-6">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReviews.length > 0 ? (
                      pendingReviews.slice(0, 5).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="px-4 sm:px-6">
                            <div className="font-medium text-foreground truncate">
                              {item.name}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground px-4 sm:px-6">
                            {item.sector}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground px-4 sm:px-6">
                            {item.date}
                          </TableCell>
                          <TableCell className="text-right px-4 sm:px-6">
                            <Badge
                              variant="outline"
                              className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-24 text-center text-muted-foreground px-4 sm:px-6"
                        >
                          Tidak ada pending review.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
