"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { LogOut, User, Settings, ChevronsUpDown } from "lucide-react";

import { useRouter } from "next/navigation";

interface NavUserProps {
  user: {
    name: string;

    email: string;

    avatar?: string;
  };
}

export function NavUser({ user }: NavUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userType");

    localStorage.removeItem("userEmail");

    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name

      .split(" ")

      .map((word) => word[0])

      .join("")

      .toUpperCase();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {getInitials(user.name)}
        </div>

        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-foreground truncate">
            {user.name}
          </p>

          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-3 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
              </p>
            </div>

            <div className="p-2 space-y-1">
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-all text-sm text-foreground"
                whileHover={{ x: 4 }}
              >
                <User className="w-4 h-4" />

                <span>Edit Profile</span>
              </motion.button>

              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-all text-sm text-foreground"
                whileHover={{ x: 4 }}
              >
                <Settings className="w-4 h-4" />

                <span>Settings</span>
              </motion.button>
            </div>

            <div className="p-2 border-t border-border">
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all text-sm text-red-600"
                whileHover={{ x: 4 }}
              >
                <LogOut className="w-4 h-4" />

                <span>Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
