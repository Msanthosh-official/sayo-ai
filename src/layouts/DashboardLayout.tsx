import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Crown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function DashboardLayout() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
            <SidebarTrigger className="ml-1" />
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <Crown className="h-4 w-4 mr-1 text-secondary" /> Upgrade
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="h-8 w-8 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-sm font-semibold">
                S
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
