"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  FileText,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpDown,
  ChevronDown,
  Search,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
} from "lucide-react";
import { mockReviewData } from "@/data";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const reviewStatusConfig = {
  approved: {
    label: "Disetujui",
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

const documentListMapped = mockReviewData.map((review) => ({
  id: review.id,
  umkmName: review.umkmName,
  owner: review.ownerName,
  documentType: review.documentType,
  fileName: `${review.documentType.toLowerCase()}_${review.ownerName.replace(
    /\s+/g,
    "_"
  )}.pdf`,
  uploadDate: review.submissionDate,
  status: review.status as keyof typeof reviewStatusConfig,
  fileSize: `${Math.floor(Math.random() * 2) + 1}.${Math.floor(
    Math.random() * 9
  )} MB`,
}));

type DocumentData = (typeof documentListMapped)[number];

export default function ReviewPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [documents, setDocuments] =
    React.useState<DocumentData[]>(documentListMapped);
  const [selectedDocument, setSelectedDocument] =
    React.useState<DocumentData | null>(null);

  const handleSetStatus = (id: string, status: DocumentData["status"]) => {
    setDocuments((current) =>
      current.map((doc) => (doc.id === id ? { ...doc, status } : doc))
    );
    setSelectedDocument(null);
  };

  const columns: ColumnDef<DocumentData>[] = [
    {
      accessorKey: "umkmName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UMKM <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="pl-4">
          <div className="font-medium text-foreground">
            {row.original.umkmName}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.owner}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "fileName",
      header: "Dokumen",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">
              {row.original.fileName}
            </p>
            <p className="text-xs text-muted-foreground">
              {row.original.fileSize}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "documentType",
      header: "Tipe",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.documentType}</Badge>
      ),
    },
    {
      accessorKey: "uploadDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tgl. Unggah <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("uploadDate")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue(
          "status"
        ) as keyof typeof reviewStatusConfig;
        const config = reviewStatusConfig[status];
        const StatusIcon = config.icon;
        return (
          <Badge
            variant="outline"
            className={`capitalize ${config.color} gap-1.5`}
          >
            <StatusIcon className="h-3 w-3" /> {config.label}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDocument(row.original)}
          >
            <Eye className="mr-1.5 h-3 w-3" /> Review
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: documents,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, globalFilter },
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
          Review Dokumen Digital
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Periksa dan validasi dokumen yang diunggah oleh UMKM
        </p>
      </motion.div>

      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Input
            placeholder="Cari UMKM atau nama file..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-9 h-9"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto h-9">
              Status Review <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => table.getColumn("status")?.setFilterValue(null)}
            >
              Semua Status
            </DropdownMenuItem>
            {Object.entries(reviewStatusConfig).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => table.getColumn("status")?.setFilterValue(key)}
              >
                <span className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${value.dot} mr-2`} />
                  {value.label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Container */}
      <div className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
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
                  <TableRow key={row.id}>
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
                        Tidak ada dokumen ditemukan.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          Total {table.getFilteredRowModel().rows.length} dokumen
        </div>
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
                <ChevronLastIcon className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Dialog */}
      <Dialog
        open={!!selectedDocument}
        onOpenChange={(open) => !open && setSelectedDocument(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle>Review Dokumen</DialogTitle>
                <DialogDescription>
                  Periksa kelengkapan dan keabsahan dokumen{" "}
                  <strong>{selectedDocument.fileName}</strong> milik{" "}
                  <strong>{selectedDocument.umkmName}</strong>.
                </DialogDescription>
              </DialogHeader>

              <div className="my-4 h-64 sm:h-96 rounded-lg bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground italic">
                  Preview Dokumen (misalnya PDF viewer) akan tampil di sini
                </p>
              </div>

              <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-2">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:text-red-700"
                  onClick={() =>
                    handleSetStatus(selectedDocument.id, "rejected")
                  }
                >
                  <XCircle className="mr-2 h-4 w-4" /> Tolak
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700"
                  onClick={() =>
                    handleSetStatus(selectedDocument.id, "approved")
                  }
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Setujui
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
