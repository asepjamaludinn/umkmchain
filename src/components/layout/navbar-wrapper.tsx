"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

interface NavbarWrapperProps {
  showBackButton?: boolean;
  showAuthButtons?: boolean;
}

export default function NavbarWrapper({
  showBackButton = false,
  showAuthButtons = true,
}: NavbarWrapperProps) {
  const pathname = usePathname();

  const noNavbarPaths = ["/splash", "/verify", "/dashboard", "/auth"];

  const shouldHideNavbar = noNavbarPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <Navbar showBackButton={showBackButton} showAuthButtons={showAuthButtons} />
  );
}
