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
  XCircle,
  FileText,
  Search,
  ChevronDown,
  ArrowUpDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
} from "lucide-react";
import { mockAuditHistory } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    badgeClass: "bg-yellow-100 border-yellow-200 text-yellow-700",
    dot: "bg-yellow-500",
  },
  approved: {
    label: "Disetujui",
    icon: CheckCircle,
    color: "text-green-600",
    badgeClass: "bg-green-100 border-green-200 text-green-700",
    dot: "bg-green-500",
  },
  rejected: {
    label: "Ditolak",
    icon: XCircle,
    color: "text-red-600",
    badgeClass: "bg-red-100 border-red-200 text-red-700",
    dot: "bg-red-500",
  },
};

type HistoryData = {
  id: string;
  businessName: string;
  action: string;
  status: keyof typeof statusConfig;
  date: string;
  time: string;
  description: string;
};

const historyData: HistoryData[] = mockAuditHistory.map((audit) => ({
  id: audit.id,
  businessName: audit.umkmName,
  action: audit.action,
  status: audit.action.toLowerCase().includes("rejected")
    ? "rejected"
    : audit.action.toLowerCase().includes("approved") ||
      audit.action.toLowerCase().includes("verified")
    ? "approved"
    : "pending",
  date: audit.timestamp.split(" ")[0],
  time: audit.timestamp.split(" ")[1],
  description: audit.details,
}));

export default function HistoryPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const columns: ColumnDef<HistoryData>[] = [
    {
      accessorKey: "action",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aktivitas <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="pl-4">
          <div className="font-medium text-foreground">
            {row.original.action}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.businessName}
          </div>
        </div>
      ),
      size: 300,
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
      cell: ({ row }) => (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {row.original.description}
        </p>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm">{row.original.date}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.time}
          </span>
        </div>
      ),
      size: 150,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const config = statusConfig[row.original.status];
        return (
          <Badge variant="outline" className={`${config.badgeClass} gap-1.5`}>
            <config.icon className="h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
      filterFn: (row, id, value) =>
        value === undefined || value.includes(row.getValue(id)),
      size: 120,
    },
  ];

  const table = useReactTable({
    data: historyData,
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
          Riwayat Izin
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Pantau status verifikasi dan perubahan dokumen Anda.
        </p>
      </motion.div>

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari aktivitas..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full h-9 pl-9"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto h-9">
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
                  onClick={() => table.getColumn("status")?.setFilterValue(key)}
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
        </div>
      </div>

      {/* Tabel Riwayat */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
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
                          className="py-2 sm:py-3 px-3 sm:px-4"
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
                            className="py-3 px-3 sm:px-4"
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
                            Tidak ada riwayat ditemukan.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Paginasi */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          Total {table.getFilteredRowModel().rows.length} riwayat ditemukan.
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
    </div>
  );
}
