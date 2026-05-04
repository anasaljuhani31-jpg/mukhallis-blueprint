import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, TicketPlus, Clock } from "lucide-react";

export const Route = createFileRoute("/business/support")({
  component: SupportPage,
});

const tickets = [
  { id: "TK-1042", subject: "استفسار حول فاتورة REQ-2086", date: "12 أبريل", status: "in_progress" as const },
  { id: "TK-1039", subject: "رفع وثيقة إعفاء", date: "09 أبريل", status: "pending" as const },
  { id: "TK-1031", subject: "تأخير في تسليم شحنة", date: "01 أبريل", status: "completed" as const },
];

function SupportPage() {
  return (
    <div>
      <PageHeader title="الدعم الفني" description="نحن هنا لمساعدتك. اختر القناة المناسبة لطلبك." />

      <div className="grid gap-4 md:grid-cols-2">
        <button className="group flex items-center gap-4 rounded-2xl border-2 border-teal/30 bg-card p-6 text-right shadow-soft transition hover:border-teal hover:shadow-elegant">
          <div className="grid size-14 place-items-center rounded-2xl bg-teal/10 text-teal">
            <MessageCircle className="size-7" />
          </div>
          <div>
            <div className="text-lg font-bold">دردشة مباشرة</div>
            <div className="mt-1 text-sm text-muted-foreground">تحدّث مع فريق الدعم الآن</div>
          </div>
        </button>
        <button className="group flex items-center gap-4 rounded-2xl border-2 border-amber-warn/30 bg-card p-6 text-right shadow-soft transition hover:border-amber-warn hover:shadow-elegant">
          <div className="grid size-14 place-items-center rounded-2xl bg-amber-warn/15 text-amber-warn">
            <TicketPlus className="size-7" />
          </div>
          <div>
            <div className="text-lg font-bold">إنشاء تذكرة</div>
            <div className="mt-1 text-sm text-muted-foreground">للقضايا التي تتطلّب متابعة</div>
          </div>
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-base font-bold">إنشاء تذكرة جديدة</h2>
        <form className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="grid gap-1.5"><Label>الموضوع</Label><Input placeholder="اكتب عنواناً مختصراً" /></div>
          <div className="grid gap-1.5">
            <Label>الفئة</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="اختر الفئة" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">فواتير ومدفوعات</SelectItem>
                <SelectItem value="request">طلب تخليص</SelectItem>
                <SelectItem value="account">الحساب</SelectItem>
                <SelectItem value="other">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5 md:col-span-2">
            <Label>الوصف التفصيلي</Label>
            <Textarea rows={4} placeholder="صف المشكلة بالتفصيل…" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">إرسال التذكرة</Button>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-base font-bold">تذاكر الدعم</h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> الرد مضمون خلال 2–24 ساعة
          </span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-teal/5 text-right text-xs text-teal">
            <tr>
              <th className="p-4 font-semibold">الرقم</th>
              <th className="p-4 font-semibold">الموضوع</th>
              <th className="p-4 font-semibold">التاريخ</th>
              <th className="p-4 font-semibold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-t border-border hover:bg-muted/40">
                <td className="p-4 font-mono text-xs">{t.id}</td>
                <td className="p-4">{t.subject}</td>
                <td className="p-4 text-muted-foreground">{t.date}</td>
                <td className="p-4"><StatusBadge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
