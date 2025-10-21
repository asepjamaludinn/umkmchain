"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ChainIcon from "@/components/icons/chain-icon";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { dataSidebar } from "@/lib/data-sidebar";

interface AppSidebarProps {
  userType: "umkm" | "regulator" | null;

  isOpen: boolean;

  onToggle: () => void;
}

export function AppSidebar({ userType, isOpen, onToggle }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed lg:static w-64 h-screen bg-card border-r border-border flex flex-col z-50 lg:z-0 overflow-hidden"
      >
        {/* Header with Logo */}

        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0"
            >
              <ChainIcon className="w-6 h-6 text-white" />
            </motion.div>

            <div className="min-w-0">
              <h1 className="font-bold text-foreground truncate">UMKMChain</h1>

              <p className="text-xs text-muted-foreground truncate">
                {userType === "umkm" ? "UMKM Dashboard" : "Regulator Dashboard"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Content */}

        <div className="flex-1 overflow-y-auto">
          <NavMain
            userType={userType}
            pathname={pathname}
            groups={dataSidebar[userType || "umkm"].navMain}
          />
        </div>

        {/* User Footer */}

        <div className="border-t border-border p-4">
          <NavUser user={dataSidebar[userType || "umkm"].user} />
        </div>
      </motion.aside>
    </>
  );
}
