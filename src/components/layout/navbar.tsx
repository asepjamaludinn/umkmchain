"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChainIcon from "@/components/icons/chain-icon";
import BackButton from "@/components/back-button";

interface NavbarProps {
  showBackButton?: boolean;
  showAuthButtons?: boolean;
}

export default function Navbar({
  showBackButton = false,
  showAuthButtons = true,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 mx-auto max-w-6xl bg-white/60 dark:bg-black/50 shadow-lg backdrop-blur-lg rounded-2xl px-6 lg:px-8 py-4 flex items-center justify-between border border-border z-50 transition-all duration-300"
    >
      {/* Left Section - Logo and Back Button */}
      <div className="flex items-center gap-4 lg:gap-8">
        {showBackButton && <BackButton />}

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground shadow-md"
          >
            <ChainIcon className="w-6 h-6" />
          </motion.div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:inline">
            UMKMChain
          </span>
        </Link>
      </div>

      {/* Right Section - Auth Buttons and Menu */}
      <div className="flex items-center gap-4">
        {/* Desktop Auth Buttons */}
        {showAuthButtons && (
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signup"
                className="px-6 py-2 text-primary hover:text-accent font-medium transition-colors"
              >
                Buat Akun
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all duration-200 shadow-md"
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </Link>
            </motion.div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="lg:hidden p-2 rounded-lg bg-muted hover:bg-accent/20 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 w-56 bg-white/95 dark:bg-black/95 shadow-xl rounded-2xl flex flex-col border border-border backdrop-blur-lg"
          >
            {/* Mobile Auth Buttons */}
            {showAuthButtons && (
              <div className="flex flex-col gap-2 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-center text-primary font-medium hover:bg-primary/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Buat Akun
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    Masuk
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
