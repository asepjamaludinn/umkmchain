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
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
  CircleAlertIcon,
  Search,
  Award,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockUMKMData } from "@/data";

const statusConfig = {
  approved: {
    label: "Terverifikasi",
    color: "bg-green-500/10 text-green-600 border border-green-500/20",
    icon: CheckCircle,
    dot: "bg-green-500",
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
    icon: Clock,
    dot: "bg-yellow-500",
  },
  rejected: {
    label: "Ditolak",
    color: "bg-red-500/10 text-red-600 border border-red-500/20",
    icon: XCircle,
    dot: "bg-red-500",
  },
};
const sectorConfig = { kuliner: "Kuliner", fashion: "Fashion", kriya: "Kriya" };

const umkmListMapped = mockUMKMData.map((umkm) => ({
  ...umkm,
  name: umkm.businessName,
  owner: umkm.ownerName,
  status: (umkm.status === "verified"
    ? "approved"
    : umkm.status) as keyof typeof statusConfig,
  sector: umkm.sector as keyof typeof sectorConfig,
}));

type UMKMData = (typeof umkmListMapped)[number];

export default function UMKMListPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [selectedUMKM, setSelectedUMKM] = React.useState<string | null>(null);
  const [umkmData, setUmkmData] = React.useState<UMKMData[]>(umkmListMapped);
  const [umkmToDelete, setUmkmToDelete] = React.useState<string | null>(null);

  const confirmDelete = () => {
    if (!umkmToDelete) return;
    setUmkmData((currentData) =>
      currentData.filter((item) => item.id !== umkmToDelete)
    );
    setUmkmToDelete(null);
  };

  const columns: ColumnDef<UMKMData>[] = [
    {
      accessorKey: "name",
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
          <div className="font-medium text-foreground">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">
            NIB: {row.original.nib}
          </div>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "owner",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pemilik <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("owner")}</div>,
    },
    {
      accessorKey: "sector",
      header: "Sektor",
      cell: ({ row }) => {
        const sector = row.getValue("sector") as keyof typeof sectorConfig;
        return <div>{sectorConfig[sector]}</div>;
      },

      filterFn: (row, id, value) =>
        value === undefined || value.includes(row.getValue(id)),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusConfig;
        const config = statusConfig[status];
        const StatusIcon = config.icon;
        return (
          <Badge
            variant="outline"
            className={`capitalize ${config.color} gap-1.5`}
          >
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
      filterFn: (row, id, value) =>
        value === undefined || value.includes(row.getValue(id)),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const umkm = row.original;
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Buka menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedUMKM(umkm.id)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat Detail
                </DropdownMenuItem>
                {umkm.certificateDate && (
                  <DropdownMenuItem
                    onClick={() =>
                      alert(
                        `Membuka sertifikat yang diterbitkan: ${umkm.certificateDate}`
                      )
                    }
                  >
                    <Award className="mr-2 h-4 w-4 text-blue-500" />
                    Lihat Sertifikat
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={() => setUmkmToDelete(umkm.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: umkmData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, globalFilter, columnVisibility },
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Daftar UMKM Terdaftar
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Kelola dan pantau semua UMKM yang terdaftar dalam sistem.
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, pemilik, NIB..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="w-full h-9 pl-9"
              />
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-1/2 sm:w-auto h-9">
                    Status <ChevronDown className="ml-2 h-4 w-4" />
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
                      <span className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${value.dot} mr-2`}
                        ></div>
                        {value.label}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-1/2 sm:w-auto h-9">
                    Sektor <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      table.getColumn("sector")?.setFilterValue(undefined)
                    }
                  >
                    Semua Sektor
                  </DropdownMenuItem>
                  {Object.entries(sectorConfig).map(([key, value]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() =>
                        table
                          .getColumn("sector")
                          ?.setFilterValue(key as keyof typeof sectorConfig)
                      }
                    >
                      {value}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden sm:flex h-9">
                    Kolom <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      const label =
                        column.id === "owner"
                          ? "Pemilik"
                          : column.id === "sector"
                          ? "Sektor"
                          : column.id;

                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {table.getHeaderGroups().map((hg) =>
                    hg.headers.map((h) => (
                      <TableHead
                        key={h.id}
                        className="py-2 sm:py-3 px-3 sm:px-4"
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </TableHead>
                    ))
                  )}
                </TableRow>
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
                          className="py-2 sm:py-3 px-3 sm:px-4"
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
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileText className="w-12 h-12 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Tidak ada UMKM ditemukan.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          Total {table.getFilteredRowModel().rows.length} UMKM ditemukan.
        </div>
        <div className="flex gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <span className="sr-only">Halaman pertama</span>
                  <ChevronFirstIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <span className="sr-only">Halaman sebelumnya</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <span className="sr-only">Halaman selanjutnya</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <span className="sr-only">Halaman terakhir</span>
                  <ChevronLastIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <AlertDialog
        open={!!umkmToDelete}
        onOpenChange={(open) => !open && setUmkmToDelete(null)}
      >
        <AlertDialogContent>
          {umkmToDelete &&
            (() => {
              const umkmName =
                umkmData.find((u) => u.id === umkmToDelete)?.name || "UMKM ini";
              return (
                <>
                  <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                      aria-hidden="true"
                    >
                      <CircleAlertIcon
                        className="opacity-80 text-red-500"
                        size={16}
                      />
                    </div>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Anda yakin ingin menghapus?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus
                        data untuk <strong>{umkmName}</strong> secara permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setUmkmToDelete(null)}>
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={confirmDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Ya, Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </>
              );
            })()}
        </AlertDialogContent>
      </AlertDialog>

      {selectedUMKM && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedUMKM(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-lg sm:rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {(() => {
              const umkm = umkmData.find((u) => u.id === selectedUMKM);
              if (!umkm) return null;
              const statusConfig_ =
                statusConfig[umkm.status as keyof typeof statusConfig];
              return (
                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                        {umkm.name}
                      </h2>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {umkm.owner}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedUMKM(null)}
                      className="text-xl sm:text-2xl text-muted-foreground hover:text-foreground flex-shrink-0"
                    >
                      ✕
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    {[
                      {
                        label: "Sektor",
                        value:
                          sectorConfig[
                            umkm.sector as keyof typeof sectorConfig
                          ],
                      },
                      { label: "Status", value: statusConfig_.label },
                      { label: "NIB", value: umkm.nib },
                      { label: "Terdaftar", value: umkm.registrationDate },
                      {
                        label: "Dokumen",
                        value:
                          [umkm.nibDocument, umkm.ownerKTP].filter(Boolean)
                            .length + " file",
                      },
                      { label: "Alamat", value: umkm.businessAddress },
                    ].map((field, index) => (
                      <div key={index}>
                        <p className="text-xs text-muted-foreground font-semibold">
                          {field.label}
                        </p>
                        <p className="text-foreground font-medium mt-1 text-sm break-words">
                          {field.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-border">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-primary text-white font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      Review Dokumen
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedUMKM(null)}
                      className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-all text-sm"
                    >
                      Tutup
                    </motion.button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
