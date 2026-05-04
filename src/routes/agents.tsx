import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Inbox, Receipt, ShieldCheck, MessageCircle } from "lucide-react";
import { PortalLayout, type NavItem } from "@/components/PortalLayout";

const nav: NavItem[] = [
  { label: "لوحة التحكم", to: "/agents", icon: LayoutDashboard },
  { label: "الطلبات المخصّصة", to: "/agents/requests", icon: Inbox, badge: 5 },
  { label: "الفواتير", to: "/agents/invoices", icon: Receipt },
  { label: "الامتثال والتراخيص", to: "/agents/compliance", icon: ShieldCheck, badge: "!" },
  { label: "المحادثات", to: "/agents/messages", icon: MessageCircle },
];

export const Route = createFileRoute("/agents")({
  component: AgentsLayout,
});

function AgentsLayout() {
  return (
    <PortalLayout
      nav={nav}
      portalLabel="بوابة المخلّصين"
      userName="مكتب البحر الأحمر"
      userRole="مخلّص + لوجستي"
    >
      <Outlet />
    </PortalLayout>
  );
}
