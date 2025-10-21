"use client";

import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

interface MobileHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  title?: string;
}

export default function MobileHeader({
  sidebarOpen,
  onToggleSidebar,
  title = "Dashboard",
}: MobileHeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-sm border-b border-border z-40 flex items-center justify-between px-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </motion.button>

      <h1 className="font-semibold text-foreground text-base flex-1 text-center">
        {title}
      </h1>

      <div className="w-10" />
    </header>
  );
}
