import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Search } from "lucide-react";

export const Route = createFileRoute("/business/requests/")({
  component: RequestsListPage,
});

const rows = [
  { id: "REQ-2086", type: "تخليص — استيراد", date: "12 أبريل 2026", port: "جدة الإسلامي", amount: "12,400 ر.س", status: "in_progress" as const },
  { id: "REQ-2085", type: "إعفاء جمركي", date: "10 أبريل 2026", port: "الرياض الجاف", amount: "—", status: "exemption" as const },
  { id: "REQ-2080", type: "تخليص — تصدير", date: "08 أبريل 2026", port: "الدمام", amount: "8,150 ر.س", status: "completed" as const },
  { id: "REQ-2074", type: "تخليص — استيراد", date: "02 أبريل 2026", port: "جدة الإسلامي", amount: "5,300 ر.س", status: "pending" as const },
  { id: "REQ-2069", type: "تخليص — استيراد", date: "29 مارس 2026", port: "الدمام", amount: "9,720 ر.س", status: "rejected" as const },
  { id: "REQ-2061", type: "تخليص + لوجستي", date: "20 مارس 2026", port: "جدة الإسلامي", amount: "18,500 ر.س", status: "completed" as const },
];

function RequestsListPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="سجل الطلبات"
        description="جميع طلباتك السابقة والحالية مع إمكانية التصفية والتصدير."
        action={
          <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-teal-foreground">
            <Download className="ml-1.5 size-4" /> تصدير
          </Button>
        }
      />

      {/* Filters */}
      <div className="mb-5 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="ابحث برقم الطلب أو الوصف…" className="pr-9" />
        </div>
        <Select>
          <SelectTrigger><SelectValue placeholder="نوع الخدمة" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="customs">تخليص</SelectItem>
            <SelectItem value="exemption">إعفاء</SelectItem>
            <SelectItem value="logistics">لوجستي</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger><SelectValue placeholder="الحالة" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="pending">قيد المراجعة</SelectItem>
            <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="rejected">مرفوض</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="md:col-span-4 justify-start text-muted-foreground">
          <Calendar className="ml-2 size-4" /> اختر نطاق التاريخ
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-teal/5 text-right text-xs text-teal">
              <tr>
                <th className="p-4 font-semibold">رقم الطلب</th>
                <th className="p-4 font-semibold">النوع</th>
                <th className="p-4 font-semibold">التاريخ</th>
                <th className="p-4 font-semibold">الميناء</th>
                <th className="p-4 font-semibold">المبلغ</th>
                <th className="p-4 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => navigate({ to: "/business/requests/$id", params: { id: r.id } })}
                  className="border-t border-border hover:bg-muted/40 cursor-pointer"
                >
                  <td className="p-4">
                    <Link to="/business/requests/$id" params={{ id: r.id }} onClick={(e) => e.stopPropagation()} className="font-mono text-xs text-teal hover:underline">
                      {r.id}
                    </Link>
                  </td>
                  <td className="p-4">{r.type}</td>
                  <td className="p-4 text-muted-foreground">{r.date}</td>
                  <td className="p-4">{r.port}</td>
                  <td className="p-4 font-medium">{r.amount}</td>
                  <td className="p-4"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
