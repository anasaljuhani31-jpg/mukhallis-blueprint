import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Send } from "lucide-react";

export const Route = createFileRoute("/admin/requests")({
  component: AdminRequests,
});

function AdminRequests() {
  return (
    <div>
      <PageHeader title="إدارة الطلبات" description="تخصيص مزوّدي الخدمة وضبط هامش المنصّة." />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft mb-6">
        <table className="w-full text-sm">
          <thead className="bg-teal/5 text-right text-xs text-teal">
            <tr>
              <th className="p-4 font-semibold">الرقم</th>
              <th className="p-4 font-semibold">المنشأة</th>
              <th className="p-4 font-semibold">النوع</th>
              <th className="p-4 font-semibold">الحالة</th>
              <th className="p-4 font-semibold">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "REQ-2086", c: "شركة الخليج", t: "تخليص + لوجستي", s: "in_progress" as const },
              { id: "REQ-2091", c: "بن غازي", t: "إعفاء", s: "pending" as const },
              { id: "REQ-2080", c: "النخيل الذهبي", t: "تخليص", s: "completed" as const },
            ].map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                <td className="p-4 font-mono text-xs">{r.id}</td>
                <td className="p-4">{r.c}</td>
                <td className="p-4">{r.t}</td>
                <td className="p-4"><StatusBadge status={r.s} /></td>
                <td className="p-4"><Button size="sm" variant="outline">إدارة</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assignment & margin panel */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-base font-bold mb-1">REQ-2086 — تخصيص وإرسال العرض</h2>
        <p className="text-sm text-muted-foreground mb-5">اتّبع التسلسل: المخلّص أولاً، ثم اللوجستي.</p>

        <ol className="grid gap-4 md:grid-cols-2">
          <li className="rounded-xl border-2 border-teal/40 bg-teal/5 p-5">
            <div className="text-xs font-bold text-teal mb-2">الخطوة 1</div>
            <Label>تخصيص مخلّص جمركي</Label>
            <Select>
              <SelectTrigger className="mt-1.5 bg-card"><SelectValue placeholder="اختر مخلّصاً…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="a">مكتب البحر الأحمر — ⭐ 4.8</SelectItem>
                <SelectItem value="b">مكتب الخليج للتخليص — ⭐ 4.6</SelectItem>
                <SelectItem value="c">شركة سواحل التخليص — ⭐ 4.5</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-3 text-[11px] text-mint">✓ تم القبول من المخلّص</div>
          </li>

          <li className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-5 relative">
            <span className="absolute top-3 left-3 grid size-7 place-items-center rounded-full bg-foreground/80 text-background"><Lock className="size-3.5" /></span>
            <div className="text-xs font-bold text-muted-foreground mb-2">الخطوة 2</div>
            <Label>تخصيص مزوّد لوجستي</Label>
            <Select disabled>
              <SelectTrigger className="mt-1.5 bg-card opacity-60"><SelectValue placeholder="مغلق حتى قبول المخلّص" /></SelectTrigger>
              <SelectContent />
            </Select>
            <div className="mt-3 text-[11px] text-muted-foreground">سيُفتح تلقائياً بعد الخطوة 1.</div>
          </li>
        </ol>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
          <div className="grid gap-4 md:grid-cols-3 items-end">
            <div className="grid gap-1.5">
              <Label>عرض المزوّد</Label>
              <Input dir="ltr" defaultValue="11600" disabled />
            </div>
            <div className="grid gap-1.5">
              <Label>هامش المنصّة (%)</Label>
              <Input dir="ltr" defaultValue="6.5" />
            </div>
            <div className="grid gap-1.5">
              <Label>العرض النهائي للعميل (ر.س)</Label>
              <Input dir="ltr" defaultValue="12,354" disabled className="font-bold text-teal" />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
              <Send className="ml-1.5 size-4" /> إرسال العرض النهائي
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
