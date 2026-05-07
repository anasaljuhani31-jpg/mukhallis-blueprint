import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Inbox, FileText, TrendingUp, ShieldCheck, Truck, Check, X } from "lucide-react";

export const Route = createFileRoute("/agents/")({
  component: AgentsDashboard,
});

const assigned = [
  { id: "REQ-2086", company: "شركة الخليج للتجارة", type: "تخليص — استيراد", date: "12 أبريل", status: "in_progress" as const },
  { id: "REQ-2091", company: "بن غازي للتجهيزات", type: "إعفاء", date: "11 أبريل", status: "pending" as const },
  { id: "REQ-2088", company: "النخيل الذهبي", type: "تخليص + لوجستي", date: "10 أبريل", status: "approved" as const },
];

function AgentsDashboard() {
  const [view, setView] = useState<"clearance" | "logistics">("clearance");
  const [decisions, setDecisions] = useState<Record<string, "accepted" | "rejected">>({});
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  return (
    <div>
      <PageHeader
        title="لوحة المخلّص"
        description="تابع الطلبات المسندة، العروض المعلّقة، وحالة تراخيصك."
        action={
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
            {(["clearance", "logistics"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition",
                  view === v ? "bg-teal text-teal-foreground shadow-elegant" : "text-muted-foreground"
                )}
              >
                {v === "clearance" ? <ShieldCheck className="size-3.5" /> : <Truck className="size-3.5" />}
                {v === "clearance" ? "عرض التخليص" : "عرض اللوجستيات"}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Stat icon={Inbox} label="طلبات مسندة" value="12" tone="teal" />
        <Stat icon={FileText} label="عروض معلّقة" value="4" tone="amber" />
        <Stat icon={TrendingUp} label="مكتملة هذا الشهر" value="38" tone="mint" />
        <Stat icon={AlertTriangle} label="تراخيص تنتهي قريباً" value="1" tone="amber" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-soft">
          <div className="border-b border-border p-5"><h2 className="text-base font-bold">الطلبات المسندة</h2></div>
          <table className="w-full text-sm">
            <thead className="bg-teal/5 text-right text-xs text-teal">
              <tr>
                <th className="p-4 font-semibold">الرقم</th>
                <th className="p-4 font-semibold">المنشأة</th>
                <th className="p-4 font-semibold">النوع</th>
                <th className="p-4 font-semibold">التاريخ</th>
                <th className="p-4 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                  <td className="p-4 font-mono text-xs">{r.id}</td>
                  <td className="p-4">{r.company}</td>
                  <td className="p-4">{r.type}</td>
                  <td className="p-4 text-muted-foreground">{r.date}</td>
                  <td className="p-4"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="rounded-2xl border border-amber-warn/30 bg-amber-warn/5 p-5 shadow-soft">
          <div className="flex items-center gap-2 font-bold text-amber-warn">
            <AlertTriangle className="size-5" /> تنبيهات الامتثال
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-amber-warn/30 bg-card p-3">
              <div className="font-semibold">رخصة لوجستيات</div>
              <div className="text-xs text-muted-foreground mt-1">تنتهي خلال 14 يوماً — يرجى التجديد.</div>
            </li>
            <li className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold">شهادة المخلّص</div>
              <div className="text-xs text-mint mt-1">سارية المفعول</div>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone: "teal" | "mint" | "amber" }) {
  const m = { teal: "text-teal bg-teal/10", mint: "text-mint bg-mint/15", amber: "text-amber-warn bg-amber-warn/15" }[tone];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft flex items-start justify-between">
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-1 text-2xl font-bold">{value}</div>
      </div>
      <div className={cn("grid size-10 place-items-center rounded-xl", m)}><Icon className="size-5" /></div>
    </div>
  );
}
