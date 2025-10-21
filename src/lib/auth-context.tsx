"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { mockUsers, mockUMKMData } from "./mock-data";

type UmkmData = (typeof mockUMKMData)[number];

interface BaseUser {
  id: string;
  email: string;
  name: string;
  type: "umkm" | "regulator";
  phone?: string;
}

interface UmkmUser extends BaseUser {
  type: "umkm";
  nik: string;
  address: string;
}

interface RegulatorUser extends BaseUser {
  type: "regulator";
  agency: string;
}

export type User = UmkmUser | RegulatorUser;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    userType: "umkm" | "regulator"
  ) => Promise<void>;
  logout: () => void;
  getUserData: () => UmkmData | undefined | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("[v0] Error parsing stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    userType: "umkm" | "regulator"
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const users = userType === "umkm" ? mockUsers.umkm : mockUsers.regulator;

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Email atau password salah");
      }

      let userData: User;
      if (userType === "umkm") {
        const umkmUser = foundUser as {
          id: string;
          email: string;
          password: string;
          name: string;
          type: "umkm";
          nik: string;
          phone: string;
          address: string;
        };
        userData = {
          id: umkmUser.id,
          email: umkmUser.email,
          name: umkmUser.name,
          type: "umkm",
          nik: umkmUser.nik,
          phone: umkmUser.phone,
          address: umkmUser.address,
        };
      } else {
        const regulatorUser = foundUser as {
          id: string;
          email: string;
          password: string;
          name: string;
          type: "regulator";
          agency: string;
          phone: string;
        };
        userData = {
          id: regulatorUser.id,
          email: regulatorUser.email,
          name: regulatorUser.name,
          type: "regulator",
          agency: regulatorUser.agency,
          phone: regulatorUser.phone,
        };
      }

      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("userType", userType);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userType");
  };

  const getUserData = () => {
    if (!user) return null;
    if (user.type === "umkm") {
      return mockUMKMData.find((umkm) => umkm.ownerName === user.name);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
