"use client";

import * as React from "react";
import { motion } from "framer-motion";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Clock,
  CheckCircle,
  Award,
  Building,
  ListChecks,
  MoreHorizontal,
  Upload,
  Download,
  Eye,
  Search,
  ChevronDown,
  XCircle,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import { mockUMKMData } from "@/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const statusConfig = {
  approved: {
    label: "Terverifikasi",
    icon: CheckCircle,
    color: "text-green-600",
    badgeClass: "bg-green-100 border-green-200 text-green-700",
    dot: "bg-green-500",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    badgeClass: "bg-yellow-100 border-yellow-200 text-yellow-700",
    dot: "bg-yellow-500",
  },
  rejected: {
    label: "Ditolak",
    icon: XCircle,
    color: "text-red-600",
    badgeClass: "bg-red-100 border-red-200 text-red-700",
    dot: "bg-red-500",
  },
};
const sectorConfig = { kuliner: "Kuliner", fashion: "Fashion", kriya: "Kriya" };
type UMKMData = {
  id: string;
  businessName: string;
  ownerName: string;
  sector: keyof typeof sectorConfig;
  nib: string;
  status: keyof typeof statusConfig;
  registrationDate: string;
  certificateHash: string | null;
};

export default function UMKMDashboard() {
  const userUmkmList: UMKMData[] = mockUMKMData.map((umkm) => ({
    ...umkm,
    sector: umkm.sector as keyof typeof sectorConfig,
    status: umkm.status as keyof typeof statusConfig,
  }));

  const totalUserUmkm = userUmkmList.length;
  const pendingCount = userUmkmList.filter(
    (u) => u.status === "pending"
  ).length;
  const approvedCount = userUmkmList.filter(
    (u) => u.status === "approved"
  ).length;
  const certificateCount = userUmkmList.filter(
    (u) => u.status === "approved" && u.certificateHash
  ).length;

  const stats = [
    {
      label: "Total UMKM Saya",
      value: totalUserUmkm.toString(),
      icon: Building,
    },
    { label: "Pending Review", value: pendingCount.toString(), icon: Clock },
    {
      label: "UMKM Terverifikasi",
      value: approvedCount.toString(),
      icon: ListChecks,
    },
    {
      label: "Sertifikat Tersedia",
      value: certificateCount.toString(),
      icon: Award,
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const handleDownloadCertificate = (
    certId: string | null | undefined,
    umkmName: string
  ) => {
    if (!certId) return;
    alert(`Fungsi download sertifikat ${certId} untuk ${umkmName} belum siap.`);
  };

  const columns: ColumnDef<UMKMData>[] = [
    {
      accessorKey: "businessName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama UMKM <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="pl-4">
          <div className="font-medium text-foreground">
            {row.original.businessName}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.nib}
          </div>
        </div>
      ),
      size: 250,
    },
    {
      accessorKey: "sector",
      header: "Sektor",
      cell: ({ row }) => (
        <div className="text-sm">
          {sectorConfig[row.getValue("sector") as keyof typeof sectorConfig]}
        </div>
      ),
      filterFn: (row, id, value) => {
        return value === undefined || value.includes(row.getValue(id));
      },
      size: 100,
    },
    {
      accessorKey: "status",
      header: "Status Verifikasi",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusConfig;
        const config = statusConfig[status];
        const StatusIcon = config.icon;
        return (
          <Badge
            variant="outline"
            className={`capitalize ${config.badgeClass} gap-1.5`}
          >
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value === undefined || value.includes(row.getValue(id));
      },
      size: 150,
    },
    {
      accessorKey: "certificateHash",
      header: "Sertifikat",
      cell: ({ row }) => {
        const certId = row.getValue("certificateHash") as string | null;
        const status = row.original.status;
        if (certId) {
          return (
            <Badge
              variant="outline"
              className="bg-green-100 border-green-200 text-green-700 gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              Tersedia
            </Badge>
          );
        } else if (status === "approved") {
          return (
            <Badge
              variant="outline"
              className="bg-blue-100 border-blue-200 text-blue-700 gap-1"
            >
              <Clock className="h-3 w-3" />
              Proses
            </Badge>
          );
        } else {
          return (
            <Badge
              variant="outline"
              className="bg-red-100 border-red-200 text-red-700 gap-1"
            >
              <XCircle className="h-3 w-3" />
              Belum
            </Badge>
          );
        }
      },
      size: 120,
    },
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const umkm = row.original;
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi Cepat</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/umkm/detail/${umkm.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                  </Link>
                </DropdownMenuItem>

                {(umkm.status === "pending" || umkm.status === "rejected") && (
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/umkm/upload/${umkm.id}`}>
                      <Upload className="mr-2 h-4 w-4" /> Upload/Edit Dokumen
                    </Link>
                  </DropdownMenuItem>
                )}
                {umkm.certificateHash && (
                  <DropdownMenuItem
                    onClick={() =>
                      handleDownloadCertificate(
                        umkm.certificateHash,
                        umkm.businessName
                      )
                    }
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Sertifikat
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      size: 80,
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data: userUmkmList,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, globalFilter, columnVisibility },
    initialState: { pagination: { pageSize: 5 } },
  });

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
          Dashboard UMKM
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Ringkasan status usaha dan sertifikat digital Anda.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          let valueContent: React.ReactNode;
          let iconColorClass = "text-muted-foreground";

          if (stat.label === "UMKM Terverifikasi") {
            iconColorClass = "text-green-600";
            valueContent = (
              <div className="text-2xl font-bold text-green-600">
                {stat.value}
              </div>
            );
          } else if (stat.label === "Sertifikat Tersedia") {
            const certCount = parseInt(stat.value);
            if (certCount > 0) {
              iconColorClass = "text-green-600";
              valueContent = (
                <div className="text-2xl font-bold text-green-600">
                  {stat.value}
                </div>
              );
            } else {
              valueContent = (
                <div className="text-2xl font-bold">{stat.value}</div>
              );
            }
          } else {
            valueContent = (
              <div className="text-2xl font-bold">{stat.value}</div>
            );
          }

          return (
            <motion.div key={index} variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <StatIcon className={`h-4 w-4 ${iconColorClass}`} />
                </CardHeader>
                <CardContent>{valueContent}</CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Daftar Usaha Anda</CardTitle>
            <CardDescription>
              Ringkasan status verifikasi dan sertifikat untuk setiap usaha.
            </CardDescription>

            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Cari nama usaha..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="h-8 pl-8"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <ListChecks className="mr-2 h-4 w-4" /> Status Verifikasi{" "}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      table.getColumn("status")?.setFilterValue(undefined)
                    }
                  >
                    Semua Status
                  </DropdownMenuItem>
                  {Object.entries(statusConfig).map(([key, value]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() =>
                        table.getColumn("status")?.setFilterValue(key)
                      }
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${value.dot} mr-2`}
                      ></div>
                      {value.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          style={{
                            width:
                              header.getSize() !== 150
                                ? `${header.getSize()}px`
                                : undefined,
                          }}
                          className="px-3 sm:px-4 py-2"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            style={{
                              width:
                                cell.column.getSize() !== 150
                                  ? `${cell.column.getSize()}px`
                                  : undefined,
                            }}
                            className="px-3 sm:px-4 py-2"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        Belum ada UMKM terdaftar.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          {table.getPageCount() > 1 && (
            <div className="flex items-center justify-end space-x-2 p-4 border-t">
              <span className="text-xs text-muted-foreground">
                Hal {table.getState().pagination.pageIndex + 1} dari{" "}
                {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Sebelumnya
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Selanjutnya
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
