import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, MessageCircle, Download, FileText, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/business/requests/$id")({
  component: RequestDetailPage,
});

const stages = [
  { label: "تم الإرسال", state: "done" as const },
  { label: "تخصيص مخلّص", state: "done" as const },
  { label: "عرض/فاتورة", state: "current" as const },
  { label: "التنفيذ", state: "todo" as const },
  { label: "التسليم", state: "todo" as const },
];

function RequestDetailPage() {
  const { id } = Route.useParams();
  const [accepted, setAccepted] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  return (
    <div>
      <PageHeader
        title={`تفاصيل الطلب ${id}`}
        description="تابع مراحل التنفيذ، راجع الفاتورة، وتواصل مع المخلّص."
        action={
          <Button asChild variant="outline">
            <Link to="/business/requests"><ArrowRight className="ml-1 size-4" /> الرجوع للقائمة</Link>
          </Button>
        }
      />

      {/* Timeline */}
      <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">مراحل الطلب</h2>
          <StatusBadge status="in_progress" />
        </div>
        <ol className="flex items-center gap-2 overflow-x-auto" dir="rtl">
          {stages.map((s, i) => (
            <li key={s.label} className="flex flex-1 items-center gap-2 min-w-[140px]">
              <div
                className={cn(
                  "grid size-9 place-items-center rounded-full text-xs font-bold",
                  s.state === "done" && "bg-mint text-mint-foreground",
                  s.state === "current" && "bg-teal text-teal-foreground shadow-glow",
                  s.state === "todo" && "bg-muted text-muted-foreground",
                )}
              >
                {s.state === "done" ? <Check className="size-4" /> : i + 1}
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium">{s.label}</div>
              </div>
              {i < stages.length - 1 && (
                <div className={cn("h-1 flex-1 rounded-full", s.state === "done" ? "bg-mint" : "bg-border")} />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoice */}
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-bold">الفاتورة المقترحة</h2>
            <Button variant="ghost" size="sm" className="text-teal">
              <Download className="ml-1 size-4" /> تحميل PDF
            </Button>
          </div>

          <div className="grid gap-3 rounded-xl border border-border bg-muted/30 p-5 text-sm">
            <Row k="رسوم خدمة المخلّص" v="3,200 ر.س" />
            <Row k="فاتورة جمركية تقديرية" v="8,400 ر.س" />
            <Row k="هامش المنصّة" v="800 ر.س" />
            <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
              <span>الإجمالي</span>
              <span className="text-teal">12,400 ر.س</span>
            </div>
          </div>

          {accepted ? (
            <div className="mt-5 rounded-xl border border-mint/30 bg-mint/10 p-4 text-sm">
              <div className="font-semibold text-mint">تم قبول الفاتورة ✓</div>
              <div className="mt-1 text-muted-foreground">يرجى رفع وثيقة التفويض لإكمال الإجراءات.</div>
              <Button size="sm" className="mt-3 bg-teal text-teal-foreground hover:bg-teal/90">
                <FileText className="ml-1 size-4" /> رفع وثيقة التفويض
              </Button>
            </div>
          ) : rejecting ? (
            <div className="mt-5 grid gap-3">
              <Textarea placeholder="يرجى توضيح سبب الرفض…" rows={3} />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setRejecting(false)}>إلغاء</Button>
                <Button variant="destructive">تأكيد الرفض</Button>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex gap-3">
              <Button onClick={() => setAccepted(true)} className="bg-mint text-mint-foreground hover:bg-mint/90 shadow-elegant">
                <Check className="ml-1 size-4" /> قبول الفاتورة
              </Button>
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => setRejecting(true)}>
                رفض
              </Button>
            </div>
          )}
        </section>

        {/* Side info */}
        <aside className="grid gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft text-sm">
            <h3 className="font-bold mb-3">معلومات الشحنة</h3>
            <div className="grid gap-2">
              <Row k="النوع" v="استيراد" />
              <Row k="الميناء" v="جدة الإسلامي" />
              <Row k="بلد المصدر" v="الصين" />
              <Row k="كود HS" v="8517" />
              <Row k="الوزن" v="2,500 كجم" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft text-sm">
            <h3 className="font-bold mb-3">المخلّص المعيّن</h3>
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-teal text-teal-foreground font-bold">م</div>
              <div>
                <div className="font-semibold">مكتب البحر الأحمر للتخليص</div>
                <div className="text-xs text-muted-foreground">رخصة #CL-2031 • تقييم 4.8</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Chat dock */}
      <div className={cn(
        "fixed bottom-6 left-6 z-30 w-80 rounded-2xl border border-border bg-card shadow-elegant transition",
        !accepted && "opacity-60 pointer-events-none",
      )}>
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="size-4 text-teal" />
            <span className="text-sm font-semibold">محادثة المخلّص</span>
          </div>
          <span className={cn("text-[10px] rounded-full px-2 py-0.5", accepted ? "bg-mint/15 text-mint" : "bg-muted text-muted-foreground")}>
            {accepted ? "متاح" : "قبول الفاتورة لتفعيل المحادثة"}
          </span>
        </div>
        <div className="h-32 overflow-y-auto p-3 text-xs text-muted-foreground">
          <div className="text-center mt-8">ابدأ المحادثة بعد قبول الفاتورة.</div>
        </div>
        <div className="flex items-center gap-2 border-t border-border p-2">
          <input className="flex-1 bg-transparent text-sm outline-none px-2" placeholder="اكتب رسالة…" disabled={!accepted} />
          <Button size="icon" variant="ghost" className="text-teal"><Send className="size-4" /></Button>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
