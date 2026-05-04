import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Wallet,
  MessageSquare,
  LifeBuoy,
  BarChart3,
  Settings,
} from "lucide-react";
import { PortalLayout, type NavItem } from "@/components/PortalLayout";

const nav: NavItem[] = [
  { label: "لوحة التحكم", to: "/admin", icon: LayoutDashboard },
  { label: "المستخدمون", to: "/admin/users", icon: Users, badge: 8 },
  { label: "إدارة الطلبات", to: "/admin/requests", icon: ClipboardList },
  { label: "إدارة المحافظ", to: "/admin/wallets", icon: Wallet },
  { label: "مركز المحادثات", to: "/admin/communication", icon: MessageSquare },
  { label: "الدعم والتذاكر", to: "/admin/tickets", icon: LifeBuoy, badge: 4 },
  { label: "التقارير والتحليلات", to: "/admin/reports", icon: BarChart3 },
  { label: "إعدادات النظام", to: "/admin/config", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <PortalLayout
      nav={nav}
      portalLabel="بوابة العمليات"
      userName="الإدارة العامة"
      userRole="مشرف نظام"
    >
      <Outlet />
    </PortalLayout>
  );
}
