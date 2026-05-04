import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, ChevronDown, type LucideIcon } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: number | string;
};

export function PortalLayout({
  nav,
  portalLabel,
  userName,
  userRole,
  children,
}: {
  nav: NavItem[];
  portalLabel: string;
  userName: string;
  userRole: string;
  children: React.ReactNode;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex">
      {/* RTL: sidebar fixed on the right */}
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <BrandLogo variant="light" />
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-2.5 py-0.5 text-[11px] font-medium text-mint">
            <span className="size-1.5 rounded-full bg-mint" />
            {portalLabel}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {nav.map((item) => {
              const active = path === item.to || (item.to !== "/" && path.startsWith(item.to));
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-sidebar-primary/15 text-sidebar-primary font-semibold"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="size-4" />
                      {item.label}
                    </span>
                    {item.badge != null && (
                      <span className="rounded-full bg-mint px-1.5 py-0.5 text-[10px] font-bold text-mint-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-bold">
              {userName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium">{userName}</div>
              <div className="truncate text-[11px] text-sidebar-foreground/70">{userRole}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:mr-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
          <div className="lg:hidden">
            <BrandLogo />
          </div>
          <div className="hidden md:flex flex-1 max-w-md items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="ابحث عن طلب، فاتورة، أو عميل…" className="pr-9 bg-card" />
            </div>
          </div>
          <div className="flex-1 md:hidden" />
          <button className="relative grid size-10 place-items-center rounded-full bg-card border border-border hover:bg-accent transition">
            <Bell className="size-4" />
            <span className="absolute top-2 left-2 size-2 rounded-full bg-destructive" />
          </button>
          <button className="hidden md:flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5 text-sm hover:bg-accent transition">
            <span className="grid size-7 place-items-center rounded-full bg-teal text-teal-foreground text-xs font-bold">
              {userName.charAt(0)}
            </span>
            <span className="font-medium">{userName}</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
        </header>

        <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
