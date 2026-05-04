import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="التقارير والتحليلات"
        description="تقارير شاملة عن الأداء والإيرادات والمستخدمين."
        action={
          <Button className="bg-teal text-teal-foreground hover:bg-teal/90"><Download className="ml-1.5 size-4" /> تصدير</Button>
        }
      />

      <div className="mb-5 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:grid-cols-3">
        <Button variant="outline" className="justify-start text-muted-foreground">
          <Calendar className="ml-2 size-4" /> اختر النطاق الزمني
        </Button>
        <Select>
          <SelectTrigger><SelectValue placeholder="نوع التقرير" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="rev">الإيرادات</SelectItem>
            <SelectItem value="users">نمو المستخدمين</SelectItem>
            <SelectItem value="ops">العمليات</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger><SelectValue placeholder="حسب الدور" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="biz">منشآت</SelectItem>
            <SelectItem value="agt">مزوّدون</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard title="الإيرادات الشهرية" colors={["bg-teal", "bg-mint"]} />
        <ChartCard title="الطلبات حسب النوع" colors={["bg-teal", "bg-mint", "bg-amber-warn", "bg-pink-soft"]} />
        <ChartCard title="نمو المنشآت" colors={["bg-teal"]} />
        <ChartCard title="معدّل الموافقات" colors={["bg-mint", "bg-amber-warn"]} />
      </div>
    </div>
  );
}

function ChartCard({ title, colors }: { title: string; colors: string[] }) {
  const bars = Array.from({ length: 12 }).map((_, i) => Math.round(20 + Math.random() * 80));
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-sm font-bold mb-4">{title}</h3>
      <div className="flex h-40 items-end gap-2">
        {bars.map((v, i) => (
          <div key={i} className={`flex-1 rounded-t-md ${colors[i % colors.length]}`} style={{ height: `${v}%` }} />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
        <span>يناير</span><span>يونيو</span><span>ديسمبر</span>
      </div>
    </div>
  );
}
