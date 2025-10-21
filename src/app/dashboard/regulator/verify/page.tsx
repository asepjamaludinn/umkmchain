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
  CheckCircle,
  XCircle,
  FileWarning,
  CircleAlertIcon,
  ArrowUpDown,
  Search,
  ChevronDown,
  Eye,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ListFilter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const initialPendingVerifications = [
  {
    id: 1,
    umkmName: "Toko Kriya Indah",
    owner: "Ahmad Wijaya",
    sector: "Kriya",
    address: "Jl. Sudirman No. 789, Yogyakarta",
    nib: "1234567890123458",
    submittedDate: "2024-01-20",
    documentsReady: true,
    completeness: 85,
    issues: ["Alamat tidak lengkap", "Foto usaha belum jelas"],
  },
  {
    id: 2,
    umkmName: "Warung Makan Jaya",
    owner: "Dewi Lestari",
    sector: "Kuliner",
    address: "Jl. Gatot Subroto No. 321, Surabaya",
    nib: "1234567890123459",
    submittedDate: "2024-01-18",
    documentsReady: true,
    completeness: 95,
    issues: [],
  },
  {
    id: 3,
    umkmName: "Butik Fashion Plus",
    owner: "Rini Handoko",
    sector: "Fashion",
    address: "Jl. Diponegoro No. 654, Medan",
    nib: "1234567890123460",
    submittedDate: "2024-01-12",
    documentsReady: false,
    completeness: 60,
    issues: ["KTP tidak jelas", "NIB belum diunggah", "Alamat tidak sesuai"],
  },
];
type PendingVerification = (typeof initialPendingVerifications)[number];

export default function VerifyPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [pendingList, setPendingList] = React.useState(
    initialPendingVerifications
  );
  const [verificationNotes, setVerificationNotes] = React.useState<
    Record<number, string>
  >({});
  const [confirmationAction, setConfirmationAction] = React.useState<{
    id: number;
    status: "approved" | "rejected";
    umkmName: string;
  } | null>(null);
  const [selectedUmkmForDialog, setSelectedUmkmForDialog] =
    React.useState<PendingVerification | null>(null);

  const handleVerification = () => {
    if (!confirmationAction) return;
    const { id } = confirmationAction;
    setPendingList((currentList) =>
      currentList.filter((item) => item.id !== id)
    );
    setConfirmationAction(null);
    setSelectedUmkmForDialog(null);
    setVerificationNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[id];
      return newNotes;
    });
  };

  const columns: ColumnDef<PendingVerification>[] = [
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
      size: 250,
    },
    {
      accessorKey: "sector",
      header: "Sektor",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("sector")}</div>
      ),
      size: 100,
    },
    {
      accessorKey: "submittedDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Diajukan <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("submittedDate")}</div>
      ),
      size: 120,
    },
    {
      accessorKey: "completeness",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kelengkapan <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Progress
            value={row.getValue("completeness")}
            className="h-2 w-[80px]"
          />
          <span className="text-xs font-medium text-muted-foreground">
            {row.getValue("completeness")}%
          </span>
        </div>
      ),
      size: 150,
    },

    {
      accessorKey: "issues",
      header: () => <div className="text-center">Masalah</div>,
      cell: ({ row }) => {
        const issues = row.getValue("issues") as string[];
        if (issues.length === 0) {
          return (
            <div className="flex flex-col items-center justify-center text-center text-xs text-green-600">
              <CheckCircle className="h-5 w-5 mb-0.5" />
              Aman
            </div>
          );
        }
        return (
          <Popover>
            <PopoverTrigger asChild>
              {/* Styling trigger agar terlihat seperti elemen UI */}
              <div className="flex flex-col items-center justify-center text-center text-xs text-yellow-600 cursor-pointer hover:opacity-80 transition-opacity">
                <FileWarning className="h-5 w-5 mb-0.5" />
                {issues.length} Masalah
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto max-w-xs p-3"
              align="center"
              side="top"
            >
              <div className="text-sm space-y-1.5">
                <p className="font-semibold text-foreground mb-1.5 border-b pb-1.5">
                  Detail Masalah Ditemukan:
                </p>
                <ul className="list-disc pl-5 text-muted-foreground text-xs space-y-1">
                  {issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
      filterFn: (row, id, value) => {
        const issues = row.getValue("issues") as string[];
        if (value === "has_issues") return issues.length > 0;
        if (value === "no_issues") return issues.length === 0;
        return true;
      },
      size: 100,
    },

    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedUmkmForDialog(row.original)}
          >
            <Eye className="mr-1.5 h-3 w-3" />
            Verifikasi
          </Button>
        </div>
      ),
      size: 100,
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data: pendingList,
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

  const currentIssueFilter =
    (table.getColumn("issues")?.getFilterValue() as string) || "all";

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Verifikasi UMKM
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Tinjau dan validasi pendaftaran UMKM yang tertunda.
        </p>
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Input
            placeholder="Cari nama UMKM, pemilik..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-9 h-9"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        {/* (Filter & Kolom Dropdowns tidak berubah) */}
        <div className="flex w-full sm:w-auto gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-1/2 sm:w-auto h-9">
                <ListFilter className="mr-2 h-4 w-4" />
                Status Masalah
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Berdasarkan Masalah</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={currentIssueFilter}
                onValueChange={(value) =>
                  table
                    .getColumn("issues")
                    ?.setFilterValue(value === "all" ? undefined : value)
                }
              >
                <DropdownMenuRadioItem value="all">Semua</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="has_issues">
                  Ada Masalah
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="no_issues">
                  Tidak Ada Masalah
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
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
                  let label = column.id;
                  if (label === "umkmName") label = "UMKM";
                  if (label === "sector") label = "Sektor";
                  if (label === "submittedDate") label = "Diajukan";
                  if (label === "completeness") label = "Kelengkapan";
                  if (label === "issues") label = "Masalah";
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

      {/* Tabel Verifikasi */}
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
                          className="py-2 sm:py-3 px-3 sm:px-4 whitespace-nowrap"
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
                          <CheckCircle className="w-12 h-12 text-green-500" />
                          <p className="text-muted-foreground">
                            Tidak ada UMKM menunggu verifikasi.
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
          Menampilkan {table.getRowModel().rows.length} dari{" "}
          {table.getFilteredRowModel().rows.length} total UMKM
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

      <Dialog
        open={!!selectedUmkmForDialog}
        onOpenChange={(open) => !open && setSelectedUmkmForDialog(null)}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedUmkmForDialog && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Verifikasi: {selectedUmkmForDialog.umkmName}
                </DialogTitle>
                <DialogDescription>
                  Oleh: {selectedUmkmForDialog.owner} | Diajukan:{" "}
                  {selectedUmkmForDialog.submittedDate}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground">
                      Sektor
                    </Label>
                    <p>{selectedUmkmForDialog.sector}</p>
                  </div>
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground">
                      NIB
                    </Label>
                    <p>{selectedUmkmForDialog.nib}</p>
                  </div>
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground">
                      Alamat
                    </Label>
                    <p>{selectedUmkmForDialog.address}</p>
                  </div>
                  <div>
                    <Label className="text-xs uppercase text-muted-foreground">
                      Kelengkapan
                    </Label>
                    <p>{selectedUmkmForDialog.completeness}%</p>
                  </div>
                </div>
                {selectedUmkmForDialog.issues.length > 0 && (
                  <Alert variant="destructive">
                    <FileWarning className="h-4 w-4" />
                    <AlertTitle>Masalah Ditemukan</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {selectedUmkmForDialog.issues.map((issue, index) => (
                          <li key={index} className="text-xs">
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label
                    htmlFor={`modal-notes-${selectedUmkmForDialog.id}`}
                    className="font-semibold"
                  >
                    Catatan Verifikasi
                  </Label>
                  <Textarea
                    id={`modal-notes-${selectedUmkmForDialog.id}`}
                    value={verificationNotes[selectedUmkmForDialog.id] || ""}
                    onChange={(e) =>
                      setVerificationNotes({
                        ...verificationNotes,
                        [selectedUmkmForDialog.id]: e.target.value,
                      })
                    }
                    placeholder="Tambahkan catatan (opsional)..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    setConfirmationAction({
                      id: selectedUmkmForDialog.id,
                      status: "rejected",
                      umkmName: selectedUmkmForDialog.umkmName,
                    })
                  }
                >
                  <XCircle className="w-4 h-4 mr-2" /> Tolak
                </Button>
                <Button
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    setConfirmationAction({
                      id: selectedUmkmForDialog.id,
                      status: "approved",
                      umkmName: selectedUmkmForDialog.umkmName,
                    })
                  }
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Setujui
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!confirmationAction}
        onOpenChange={(open) => !open && setConfirmationAction(null)}
      >
        <AlertDialogContent>
          {confirmationAction && (
            <>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <CircleAlertIcon className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Tindakan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda yakin ingin{" "}
                    <strong>
                      {confirmationAction.status === "approved"
                        ? "menyetujui"
                        : "menolak"}
                    </strong>{" "}
                    verifikasi untuk UMKM{" "}
                    <strong>{confirmationAction.umkmName}</strong>?
                    {verificationNotes[confirmationAction.id] && (
                      <div className="mt-2 text-xs italic border-l-2 pl-2">
                        Catatan: {verificationNotes[confirmationAction.id]}
                      </div>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmationAction(null)}>
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleVerification}
                  className={
                    confirmationAction.status === "approved"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }
                >
                  Ya,{" "}
                  {confirmationAction.status === "approved"
                    ? "Setujui"
                    : "Tolak"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
