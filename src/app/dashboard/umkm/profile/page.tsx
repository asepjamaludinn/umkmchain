"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Mail,
  Phone,
  FileText as IdCardIcon,
  MapPin,
  Plus,
  User,
  Briefcase,
  Edit,
  Save,
  X,
  MoreHorizontal,
  Search,
  ArrowUpDown,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
} from "lucide-react";
import Link from "next/link";
import { mockUMKMData } from "@/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

type OwnerProfile = {
  name: string;
  email: string;
  phone: string;
  nik: string;
  address: string;
  joinDate: string;
  avatarUrl?: string;
};
type BusinessData = {
  id: string;
  name: string;
  sector: string;
  address: string;
  nib: string;
  status: keyof typeof statusConfig;
  employees: number;
  revenue: string;
  certificateId: string | null;
};

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

export default function ProfilePage() {
  const [editingOwner, setEditingOwner] = React.useState(false);
  const [ownerProfileData, setOwnerProfileData] = React.useState<OwnerProfile>({
    name: mockUMKMData[0]?.ownerName || "Budi Santoso",
    email: "budi@email.com",
    phone: "+62 812-3456-7890",
    nik: mockUMKMData[0]?.ownerNIK || "3201234567890123",
    address: mockUMKMData[0]?.businessAddress || "Jl. Merdeka No. 123, Jakarta",
    joinDate: mockUMKMData[0]?.registrationDate || "2024-01-01",
    avatarUrl: undefined,
  });

  const businesses: BusinessData[] = mockUMKMData.map((umkm) => ({
    id: umkm.id,
    name: umkm.businessName,
    sector: umkm.sector.charAt(0).toUpperCase() + umkm.sector.slice(1),
    address: umkm.businessAddress,
    nib: umkm.nib,
    status: umkm.status as keyof typeof statusConfig,
    employees: Math.floor(Math.random() * 10) + 1,
    revenue: `Rp ${Math.floor(Math.random() * 500) + 100} Jt`,
    certificateId: umkm.certificateHash,
  }));

  const handleSaveOwnerProfile = (updatedData: OwnerProfile) => {
    setOwnerProfileData(updatedData);
    setEditingOwner(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1 sm:space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Profil Pengguna
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Kelola profil pribadi dan data usaha Anda.
        </p>
      </motion.div>

      <Tabs defaultValue="owner" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="owner">
            <User className="mr-2 h-4 w-4" />
            Profil Pemilik
          </TabsTrigger>
          <TabsTrigger value="businesses">
            <Briefcase className="mr-2 h-4 w-4" />
            Data Usaha
          </TabsTrigger>
        </TabsList>

        <TabsContent value="owner" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-muted/30">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-primary">
                  <AvatarImage
                    src={ownerProfileData.avatarUrl}
                    alt={ownerProfileData.name}
                  />
                  <AvatarFallback className="text-xl sm:text-2xl bg-primary/20 text-primary font-semibold">
                    {ownerProfileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl sm:text-2xl">
                    {ownerProfileData.name}
                  </CardTitle>
                  <CardDescription>
                    Pemilik UMKM | Bergabung sejak {ownerProfileData.joinDate}
                  </CardDescription>
                </div>
              </div>
              <Button size="sm" onClick={() => setEditingOwner(!editingOwner)}>
                {editingOwner ? (
                  <>
                    <X className="mr-2 h-4 w-4" /> Batal
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profil
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {editingOwner ? (
                <OwnerEditForm
                  owner={ownerProfileData}
                  onSave={handleSaveOwnerProfile}
                  onCancel={() => setEditingOwner(false)}
                />
              ) : (
                <OwnerProfileDisplay owner={ownerProfileData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="businesses" className="mt-6 space-y-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard/umkm/register">
              <Plus className="mr-2 h-4 w-4" /> Tambah Usaha Baru
            </Link>
          </Button>
          <BusinessTable businesses={businesses} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OwnerProfileDisplay({ owner }: { owner: OwnerProfile }) {
  const profileItems = [
    { label: "Email", value: owner.email, icon: Mail },
    { label: "Nomor Telepon", value: owner.phone, icon: Phone },
    { label: "NIK", value: owner.nik, icon: IdCardIcon },
    { label: "Alamat", value: owner.address, icon: MapPin },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      {profileItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex items-start gap-3 pt-4">
            <item.icon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                {item.label}
              </Label>
              <p className="text-sm text-foreground break-words">
                {item.value || "-"}
              </p>
            </div>
          </div>
          {index < profileItems.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </motion.div>
  );
}

function OwnerEditForm({
  owner,
  onSave,
  onCancel,
}: {
  owner: OwnerProfile;
  onSave: (data: OwnerProfile) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = React.useState(owner);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="edit-name">Nama Lengkap</Label>
          <Input
            id="edit-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-email">Email</Label>
          <Input
            id="edit-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-phone">Nomor Telepon</Label>
          <Input
            id="edit-phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-nik">NIK</Label>
          <Input
            id="edit-nik"
            value={formData.nik}
            onChange={(e) =>
              setFormData({
                ...formData,
                nik: e.target.value.replace(/\D/g, ""),
              })
            }
            maxLength={16}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="edit-address">Alamat</Label>
        <Textarea
          id="edit-address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
        </Button>
      </div>
    </form>
  );
}

function BusinessTable({ businesses }: { businesses: BusinessData[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const columns: ColumnDef<BusinessData>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Usaha <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="pl-4 font-medium">{row.original.name}</div>
      ),
      size: 200,
    },
    {
      accessorKey: "sector",
      header: "Sektor",
      cell: ({ row }) => row.original.sector,
      size: 100,
      filterFn: (row, id, value) =>
        value === undefined || value.includes(row.getValue(id)),
    },
    {
      accessorKey: "status",
      header: "Status Verifikasi",
      cell: ({ row }) => {
        const config = statusConfig[row.original.status];
        return (
          <Badge variant="outline" className={`${config.badgeClass} gap-1`}>
            <config.icon className="h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
      size: 150,
      filterFn: (row, id, value) =>
        value === undefined || value.includes(row.getValue(id)),
    },
    {
      accessorKey: "certificateId",
      header: "Sertifikat",
      cell: ({ row }) => {
        const certId = row.getValue("certificateId") as string | null;
        const status = row.original.status;
        if (certId) {
          return (
            <Badge
              variant="outline"
              className="bg-green-100 text-green-700 border-green-200 gap-1"
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
            <Badge variant="destructive" className="gap-1">
              <XCircle className="h-3 w-3" />
              Belum Ada
            </Badge>
          );
        }
      },
      size: 120,
    },
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/umkm/detail/${row.original.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> Detail Usaha
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/umkm/edit/${row.original.id}`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Usaha
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      size: 80,
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data: businesses,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, columnFilters, globalFilter, columnVisibility },
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="relative w-full sm:flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari usaha..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 pl-8 w-full md:w-[200px] lg:w-[250px]"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {table.getHeaderGroups().map((hg) =>
                  hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      style={{
                        width:
                          h.getSize() !== 150 ? `${h.getSize()}px` : undefined,
                      }}
                      className="px-3 sm:px-4 py-2"
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
                  <TableRow key={row.id}>
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
                    Belum ada data usaha.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {table.getPageCount() > 1 && (
        <CardFooter className="flex items-center justify-between gap-2 p-4 border-t">
          <div className="text-xs text-muted-foreground">
            Hal {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </div>
          <div className="flex gap-1">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="h-8 w-8"
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
                    className="h-8 w-8"
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
                    className="h-8 w-8"
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
                    className="h-8 w-8"
                  >
                    <ChevronLastIcon className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
