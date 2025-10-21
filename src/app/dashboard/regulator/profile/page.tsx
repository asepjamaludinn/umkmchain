"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Shield, Edit, Save, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

type RegulatorProfile = {
  name: string;
  email: string;
  phone: string;
  position: string;
  about: string;
  avatarUrl?: string;
};

export default function RegulatorProfilePage() {
  const [editing, setEditing] = React.useState(false);
  const [profile, setProfile] = React.useState<RegulatorProfile>({
    name: "Admin Regulator",
    email: "admin@regulator.com",
    phone: "+62 812-9876-5432",
    position: "Petugas Verifikasi & Sertifikasi",
    about:
      "Bertanggung jawab atas proses verifikasi dan penerbitan sertifikat UMKM secara digital.",
    avatarUrl: undefined,
  });

  const handleSave = (data: RegulatorProfile) => {
    setProfile(data);
    setEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Profil Regulator
        </h1>
        <p className="text-sm text-muted-foreground">
          Kelola informasi akun dan aktivitas verifikasi Anda.
        </p>
      </motion.div>

      {/* Card Profil */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-muted/30">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-primary">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold text-xl">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl sm:text-2xl">
                {profile.name}
              </CardTitle>
              <CardDescription>{profile.position}</CardDescription>
            </div>
          </div>
          <Button size="sm" onClick={() => setEditing(!editing)}>
            {editing ? (
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
        <CardContent className="p-6">
          {editing ? (
            <RegulatorEditForm
              profile={profile}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <RegulatorProfileDisplay profile={profile} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RegulatorProfileDisplay({ profile }: { profile: RegulatorProfile }) {
  const info = [
    { label: "Email", value: profile.email, icon: Mail },
    { label: "Telepon", value: profile.phone, icon: Phone },
    { label: "Jabatan", value: profile.position, icon: Shield },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {info.map((item, i) => (
        <React.Fragment key={item.label}>
          <div className="flex items-start gap-3 pt-2">
            <item.icon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <Label className="text-xs uppercase font-semibold text-muted-foreground">
                {item.label}
              </Label>
              <p className="text-sm text-foreground">{item.value}</p>
            </div>
          </div>
          {i < info.length - 1 && <Separator />}
        </React.Fragment>
      ))}
      <div className="pt-4">
        <Label className="text-xs uppercase font-semibold text-muted-foreground">
          Tentang
        </Label>
        <p className="text-sm text-foreground">{profile.about}</p>
      </div>
    </motion.div>
  );
}

function RegulatorEditForm({
  profile,
  onSave,
  onCancel,
}: {
  profile: RegulatorProfile;
  onSave: (data: RegulatorProfile) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = React.useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Jabatan</Label>
          <Input
            id="position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="about">Tentang</Label>
        <Textarea
          id="about"
          rows={3}
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" /> Simpan
        </Button>
      </div>
    </form>
  );
}
