import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Briefcase,
  Brain,
  GraduationCap,
  BarChart3,
  Settings,
  User,
  Menu,
  Bell,
  Search,
  ChevronLeft,
  LogOut,
  Home,
  Sparkles,
  GitBranch,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Job Search", href: "/ai-search", icon: Sparkles },
  { label: "Lowongan Kerja", href: "/jobs", icon: Briefcase },
  { label: "Career Path", href: "/career-path", icon: GitBranch },
  { label: "Skill Advisor", href: "/skill-advisor", icon: Brain },
  { label: "Pelatihan", href: "/training", icon: GraduationCap },
];

export const AppLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5 text-accent-foreground" />
        </div>
        {(!collapsed || isMobile) && (
          <div className="flex flex-col">
            <span className="font-heading text-base font-bold text-foreground leading-tight">
              KerjaAI
            </span>
            <span className="text-[10px] text-muted-foreground">Platform</span>
          </div>
        )}
      </div>

      <Separator />

      {/* Nav Links */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => isMobile && setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {(!collapsed || isMobile) && <span>{link.label}</span>}
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      <Separator />

      {/* Bottom */}
      <div className="p-3">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || isMobile) && <span>Kembali ke Beranda</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-[68px]" : "w-[260px]"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center px-4 sm:px-6 gap-4">
          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] p-0">
              <SidebarContent isMobile />
            </SheetContent>
          </Sheet>

          {/* Collapse toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                collapsed && "rotate-180"
              )}
            />
          </Button>

          {/* Title */}
          <div className="flex-1">
            <h1 className="font-heading text-lg font-semibold text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
