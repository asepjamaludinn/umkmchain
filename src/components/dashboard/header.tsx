import { Separator } from "@/components/ui/separator";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur">
      <nav className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mr-2 h-4" />

        <h1 className="font-semibold text-foreground text-lg">Dashboard</h1>
      </nav>
    </header>
  );
}
