import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/tickets")({
  component: AdminTickets,
});

const cols = [
  {
    key: "open",
    label: "مفتوحة",
    dot: "bg-amber-warn",
    items: [
      { id: "TK-1042", subject: "استفسار حول فاتورة", who: "شركة الخليج", urgent: true },
      { id: "TK-1041", subject: "خطأ في عرض الرصيد", who: "النخيل الذهبي", urgent: false },
    ],
  },
  {
    key: "progress",
    label: "قيد المعالجة",
    dot: "bg-teal",
    items: [
      { id: "TK-1039", subject: "رفع وثيقة إعفاء", who: "بن غازي", urgent: false },
      { id: "TK-1037", subject: "طلب تجديد رخصة", who: "البحر الأحمر", urgent: true },
    ],
  },
  {
    key: "done",
    label: "محلولة",
    dot: "bg-mint",
    items: [
      { id: "TK-1031", subject: "تأخير في الشحنة", who: "النخيل", urgent: false },
      { id: "TK-1028", subject: "تعديل بيانات منشأة", who: "تجارة الشرق", urgent: false },
    ],
  },
];

function AdminTickets() {
  return (
    <div>
      <PageHeader title="مركز التذاكر" description="إدارة جميع طلبات الدعم بأسلوب Kanban." />

      <div className="grid gap-4 lg:grid-cols-3">
        {cols.map((col) => (
          <div key={col.key} className="rounded-2xl border border-border bg-card/60 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn("size-2.5 rounded-full", col.dot)} />
                <span className="font-bold">{col.label}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {col.items.length}
                </span>
              </div>
            </div>
            <div className="grid gap-3">
              {col.items.map((it) => (
                <article
                  key={it.id}
                  className={cn(
                    "rounded-xl border bg-card p-4 shadow-soft",
                    it.urgent ? "border-amber-warn" : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground">{it.id}</span>
                    {it.urgent && (
                      <span className="rounded-full bg-amber-warn/15 px-2 py-0.5 font-semibold text-amber-warn">عاجل</span>
                    )}
                  </div>
                  <div className="mt-2 text-sm font-semibold">{it.subject}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{it.who}</div>
                  <div className="mt-3 flex gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">رد سريع</Button>
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs border-amber-warn text-amber-warn">تصعيد</Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
