"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { mockUsers, mockUMKMData } from "./mock-data";

interface User {
  id: string;
  email: string;
  name: string;
  type: "umkm" | "regulator";
  nik?: string;
  phone?: string;
  address?: string;
  agency?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    userType: "umkm" | "regulator"
  ) => Promise<void>;
  logout: () => void;
  getUserData: () => any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const users = userType === "umkm" ? mockUsers.umkm : mockUsers.regulator;
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Email atau password salah");
      }

      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        type: foundUser.type,
        ...(userType === "umkm" && {
          nik: foundUser.nik,
          phone: foundUser.phone,
          address: foundUser.address,
        }),
        ...(userType === "regulator" && {
          agency: foundUser.agency,
          phone: foundUser.phone,
        }),
      };

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
