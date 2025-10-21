"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  FileText,
  CheckCircle,
  Award,
  BarChart3,
  User,
  Search,
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
} from "lucide-react";
import { mockAuditHistory } from "@/data";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const typeConfig = {
  registration: {
    label: "Pendaftaran",
    color: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
    icon: FileText,
    dot: "bg-blue-500",
  },
  verification: {
    label: "Verifikasi",
    color: "bg-purple-500/10 text-purple-600 border border-purple-500/20",
    icon: CheckCircle,
    dot: "bg-purple-500",
  },
  certificate: {
    label: "Sertifikat",
    color: "bg-green-500/10 text-green-600 border border-green-500/20",
    icon: Award,
    dot: "bg-green-500",
  },
};

const auditLogsMapped = mockAuditHistory.map((audit) => ({
  id: audit.id,
  type: audit.action.toLowerCase().includes("register")
    ? "registration"
    : audit.action.toLowerCase().includes("verified") ||
      audit.action.toLowerCase().includes("approved") ||
      audit.action.toLowerCase().includes("rejected")
    ? "verification"
    : audit.action.toLowerCase().includes("generated") ||
      audit.action.toLowerCase().includes("certificate")
    ? "certificate"
    : "verification",
  action: audit.action,
  umkmName: audit.umkmName,
  actor: audit.actor,
  timestamp: audit.timestamp,
  details: audit.details,
  status: "success",
})) as AuditLogData[];

type AuditLogData = {
  id: string;
  type: keyof typeof typeConfig;
  action: string;
  umkmName: string;
  actor: string;
  timestamp: string;
  details: string;
  status: string;
};

export default function AuditPage() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const columns: ColumnDef<AuditLogData>[] = [
    {
      accessorKey: "timestamp",
      header: "Waktu",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          {row.getValue("timestamp")}
        </div>
      ),
      size: 150,
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: "Tipe",
      cell: ({ row }) => {
        const type = row.getValue("type") as keyof typeof typeConfig;
        const config = typeConfig[type];
        if (!config) return null;
        const IconComponent = config.icon;
        return (
          <Badge variant="outline" className={`${config.color} gap-1.5`}>
            <IconComponent className="h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
      size: 120,
    },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="font-medium text-foreground">
          {row.getValue("action")}
        </div>
      ),
      size: 250,
    },
    {
      accessorKey: "umkmName",
      header: "UMKM Terkait",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("umkmName")}
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: "actor",
      header: "Aktor",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4 flex-shrink-0" />
          <span>{row.getValue("actor")}</span>
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: "details",
      header: "Detail",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground line-clamp-2">
          {row.getValue("details")}
        </div>
      ),
      size: 300,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("status") === "success" ? "default" : "destructive"
          }
          className={
            row.getValue("status") === "success"
              ? "bg-green-100 text-green-700"
              : ""
          }
        >
          {row.getValue("status")}
        </Badge>
      ),
      size: 80,
    },
  ];

  const table = useReactTable({
    data: auditLogsMapped,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Audit History
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Pantau semua aktivitas dan perubahan penting dalam sistem.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Input
            placeholder="Cari aksi, UMKM, aktor..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-9 h-9"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-1/2 sm:w-auto h-9">
                Tipe Log <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  table.getColumn("type")?.setFilterValue(undefined)
                }
              >
                Semua Tipe
              </DropdownMenuItem>
              {Object.entries(typeConfig).map(([key, value]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => table.getColumn("type")?.setFilterValue(key)}
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
              <Button variant="outline" className="hidden sm:flex h-9">
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  let columnLabel = column.id;
                  if (column.id === "umkmName") columnLabel = "UMKM Terkait";
                  if (column.id === "actor") columnLabel = "Aktor";
                  if (column.id === "details") columnLabel = "Detail";
                  if (column.id === "status") columnLabel = "Status";
                  if (column.id === "type") columnLabel = "Tipe";

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnLabel}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {" "}
          <div className="border rounded-lg overflow-hidden">
            {" "}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            style={{
                              width:
                                header.getSize() !== 150
                                  ? `${header.getSize()}px`
                                  : undefined,
                            }}
                            className="py-2 sm:py-3 px-3 sm:px-4 whitespace-nowrap"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
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
                          <BarChart3 className="w-12 h-12 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Tidak ada log ditemukan.
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
          {table.getPageCount()} ({table.getFilteredRowModel().rows.length}{" "}
          total log)
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
