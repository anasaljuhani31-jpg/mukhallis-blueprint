import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Users, UserCheck, Clock, ListChecks, Wallet, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div>
      <PageHeader title="نظرة عامة على النظام" description="مؤشرات الأداء الرئيسية والتنبيهات الحرجة." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Kpi icon={Users} label="إجمالي المستخدمين" value="1,284" tone="default" />
        <Kpi icon={UserCheck} label="المستخدمون النشطون" value="942" tone="mint" />
        <Kpi icon={Clock} label="بانتظار التفعيل" value="38" tone="amber" />
        <Kpi icon={ListChecks} label="الطلبات النشطة" value="217" tone="teal" />
        <Kpi icon={Wallet} label="إجمالي رصيد المحافظ" value="3.4M ر.س" tone="teal" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Requests by type chart (mock bars) */}
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-bold mb-4">الطلبات حسب النوع</h2>
          <div className="grid gap-3">
            {[
              { label: "تخليص استيراد", value: 62, color: "bg-teal" },
              { label: "تخليص تصدير", value: 28, color: "bg-mint" },
              { label: "إعفاءات", value: 18, color: "bg-pink-soft" },
              { label: "خدمات لوجستية", value: 35, color: "bg-amber-warn" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{r.label}</span>
                  <span className="font-bold">{r.value}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <div className={`${r.color} h-full rounded-full transition-all`} style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alerts panel */}
        <aside className="rounded-2xl border border-amber-warn/30 bg-amber-warn/5 p-5 shadow-soft">
          <div className="flex items-center gap-2 font-bold text-amber-warn">
            <AlertTriangle className="size-5" /> تنبيهات حرجة
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-destructive/30 bg-card p-3">
              <div className="font-semibold text-destructive">3 محافظ برصيد سالب</div>
              <div className="text-xs text-muted-foreground mt-1">إجمالي العجز: -18,400 ر.س</div>
            </li>
            <li className="rounded-xl border border-amber-warn/30 bg-card p-3">
              <div className="font-semibold">5 رخص تنتهي خلال 30 يوماً</div>
              <div className="text-xs text-muted-foreground mt-1">يلزم متابعة المخلّصين.</div>
            </li>
            <li className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold">12 وثيقة تنتظر المراجعة</div>
              <div className="text-xs text-muted-foreground mt-1">ضمن KYB المنشآت الجديدة.</div>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone: "default" | "mint" | "amber" | "teal" }) {
  const tones = {
    default: "text-foreground bg-muted",
    mint: "text-mint bg-mint/15",
    amber: "text-amber-warn bg-amber-warn/15",
    teal: "text-teal bg-teal/10",
  }[tone];
  const valueClass = {
    default: "",
    mint: "text-mint",
    amber: "text-amber-warn",
    teal: "text-teal",
  }[tone];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`grid size-9 place-items-center rounded-lg ${tones}`}><Icon className="size-4" /></div>
      </div>
      <div className={`mt-3 text-2xl font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}
