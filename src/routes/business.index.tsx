import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FilePlus2, Wallet, LifeBuoy, FileClock, Receipt, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/business/")({
  component: BusinessDashboard,
});

const requests = [
  { id: "REQ-2086", type: "تخليص — استيراد", date: "12 أبريل 2026", amount: "12,400 ر.س", status: "in_progress" as const },
  { id: "REQ-2085", type: "إعفاء جمركي", date: "10 أبريل 2026", amount: "—", status: "exemption" as const },
  { id: "REQ-2080", type: "تخليص — تصدير", date: "08 أبريل 2026", amount: "8,150 ر.س", status: "completed" as const },
  { id: "REQ-2074", type: "تخليص — استيراد", date: "02 أبريل 2026", amount: "5,300 ر.س", status: "pending" as const },
  { id: "REQ-2069", type: "تخليص — استيراد", date: "29 مارس 2026", amount: "9,720 ر.س", status: "rejected" as const },
];

function BusinessDashboard() {
  return (
    <div>
      <PageHeader
        title="مرحباً بعودتك، شركة الخليج 👋"
        description="تابع طلباتك النشطة، فواتيرك، ورصيد محفظتك من مكان واحد."
        action={
          <Button asChild className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
            <Link to="/business/new-request">
              <FilePlus2 className="ml-1.5 size-4" /> طلب جديد
            </Link>
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="الطلبات النشطة" value="7" sub="+٢ هذا الأسبوع" icon={FileClock} accent="teal" />
        <KpiCard label="فواتير معلّقة" value="3" sub="بقيمة 24,800 ر.س" icon={Receipt} accent="amber" />
        <KpiCard label="رصيد المحفظة" value="46,200 ر.س" sub="متاح للاستخدام" icon={Wallet} accent="mint" />
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <QuickAction icon={FilePlus2} label="طلب جديد" to="/business/new-request" tone="teal" />
        <QuickAction icon={Wallet} label="عرض المحفظة" to="/business/wallet" tone="mint" />
        <QuickAction icon={LifeBuoy} label="الدعم الفني" to="/business/support" tone="amber" />
      </div>

      {/* Recent requests */}
      <section className="mt-8 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-base font-bold">آخر الطلبات</h2>
            <p className="text-xs text-muted-foreground">آخر ٥ طلبات تمت معالجتها</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-teal hover:bg-teal/10">
            <Link to="/business/requests">
              عرض الكل <ArrowUpRight className="mr-1 size-3.5" />
            </Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-teal/5 text-right text-xs text-teal">
              <tr>
                <th className="p-4 font-semibold">رقم الطلب</th>
                <th className="p-4 font-semibold">النوع</th>
                <th className="p-4 font-semibold">التاريخ</th>
                <th className="p-4 font-semibold">المبلغ</th>
                <th className="p-4 font-semibold">الحالة</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/50">
                  <td className="p-4 font-mono text-xs">{r.id}</td>
                  <td className="p-4">{r.type}</td>
                  <td className="p-4 text-muted-foreground">{r.date}</td>
                  <td className="p-4 font-medium">{r.amount}</td>
                  <td className="p-4"><StatusBadge status={r.status} /></td>
                  <td className="p-4">
                    <Link to="/business/requests/$id" params={{ id: r.id }} className="text-teal hover:underline text-xs font-medium">
                      تفاصيل
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "teal" | "mint" | "amber";
}) {
  const accents = {
    teal: { bg: "bg-teal/10", fg: "text-teal" },
    mint: { bg: "bg-mint/15", fg: "text-mint" },
    amber: { bg: "bg-amber-warn/15", fg: "text-amber-warn" },
  }[accent];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className={`mt-2 text-3xl font-bold ${accents.fg}`}>{value}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <TrendingUp className="size-3" /> {sub}
          </div>
        </div>
        <div className={`grid size-11 place-items-center rounded-xl ${accents.bg} ${accents.fg}`}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  to,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: "/business/new-request" | "/business/wallet" | "/business/support";
  tone: "teal" | "mint" | "amber";
}) {
  const tones = {
    teal: "from-teal to-teal/80 text-teal-foreground",
    mint: "from-mint to-mint/80 text-mint-foreground",
    amber: "from-amber-warn to-amber-warn/80 text-amber-warn-foreground",
  }[tone];
  return (
    <Link
      to={to}
      className={`group flex items-center justify-between rounded-2xl bg-gradient-to-bl ${tones} p-5 shadow-soft transition hover:shadow-elegant`}
    >
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-white/15 backdrop-blur">
          <Icon className="size-5" />
        </div>
        <span className="font-semibold">{label}</span>
      </div>
      <ArrowUpRight className="size-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
