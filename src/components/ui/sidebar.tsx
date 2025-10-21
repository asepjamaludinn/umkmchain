// src/components/ui/sidebar.tsx (Diperbaiki - Definisi Komponen Ditambahkan Kembali)
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Menu } from "lucide-react";

// --- Komponen Utama Sidebar (Terima Props State) ---
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "sidebar" | string;
  isOpen: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      variant = "sidebar",
      children,
      isOpen,
      isMobile,
      onClose,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "flex h-screen flex-col border-r bg-card text-card-foreground";
    const stateClasses = isMobile
      ? isOpen
        ? "fixed inset-y-0 left-0 z-50 w-64 translate-x-0"
        : "fixed inset-y-0 left-0 z-50 w-64 -translate-x-full"
      : "static w-64 shrink-0 translate-x-0";
    const transitionClass = "transition-transform duration-300 ease-in-out";

    return (
      <>
               {" "}
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
               {" "}
        <aside
          ref={ref}
          className={cn(baseClasses, stateClasses, transitionClass, className)}
          {...props}
        >
                    {children}       {" "}
        </aside>
             {" "}
      </>
    );
  }
);
Sidebar.displayName = "Sidebar";
// ------------------------------

// --- Komponen Lainnya (Header, Content, Footer, Menu, etc.) ---
// **** DEFINISI YANG HILANG DITAMBAHKAN KEMBALI ****
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 border-b", className)} {...props} /> // Sesuaikan padding jika perlu
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-2 py-2", className)} // Tambah padding x/y
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-2 border-t", className)} {...props} /> // Kurangi padding footer
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} /> // Hapus padding dari sini
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

interface SidebarMenuButtonProps extends ButtonProps {
  tooltip?: string;
}
const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { className, variant = "ghost", size = "sm", tooltip, children, ...props },
    ref
  ) => (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("w-full justify-start gap-3 h-auto px-3 py-2", className)}
      {...props}
    >
            {children}   {" "}
    </Button>
  )
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("lg:hidden", className)}
        onClick={onClick}
        {...props}
      >
                <Menu className="h-6 w-6" />       {" "}
        <span className="sr-only">Toggle Sidebar</span>     {" "}
      </Button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-2", className)} {...props} /> // Kurangi margin bottom
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
      className
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarMenuSub = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ml-7 mt-1 space-y-1 border-l border-border pl-3 py-1", // Sesuaikan indentasi
      className
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, ...props }, ref) => (
  <SidebarMenuButton
    ref={ref}
    size="sm"
    className={cn(
      "text-muted-foreground hover:text-foreground h-auto px-3 py-1.5 gap-2", // Kurangi gap
      className
    )}
    {...props}
  />
));
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
// **** AKHIR DARI DEFINISI YANG DITAMBAHKAN ****

// Export semua komponen
export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
};
