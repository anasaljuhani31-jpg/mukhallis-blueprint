import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FilePlus2,
  History,
  Wallet,
  LifeBuoy,
  UserCircle2,
} from "lucide-react";
import { PortalLayout, type NavItem } from "@/components/PortalLayout";

const nav: NavItem[] = [
  { label: "لوحة التحكم", to: "/business", icon: LayoutDashboard },
  { label: "طلب جديد", to: "/business/new-request", icon: FilePlus2 },
  { label: "سجل الطلبات", to: "/business/requests", icon: History, badge: 3 },
  { label: "المحفظة", to: "/business/wallet", icon: Wallet },
  { label: "الدعم الفني", to: "/business/support", icon: LifeBuoy },
  { label: "الملف الشخصي", to: "/business/profile", icon: UserCircle2 },
];

export const Route = createFileRoute("/business")({
  component: BusinessLayout,
});

function BusinessLayout() {
  return (
    <PortalLayout
      nav={nav}
      portalLabel="بوابة الأعمال"
      userName="شركة الخليج للتجارة"
      userRole="حساب أعمال • نشط"
    >
      <Outlet />
    </PortalLayout>
  );
}
