import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, ArrowUpCircle, Plus, Download, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/business/wallet")({
  component: WalletPage,
});

const tx = [
  { date: "12 أبريل 2026", desc: "دفع طلب REQ-2086", type: "debit", amount: "-12,400", balance: "46,200" },
  { date: "10 أبريل 2026", desc: "شحن المحفظة", type: "credit", amount: "+50,000", balance: "58,600" },
  { date: "05 أبريل 2026", desc: "دفع طلب REQ-2074", type: "debit", amount: "-5,300", balance: "8,600" },
  { date: "02 أبريل 2026", desc: "استرداد جزئي REQ-2069", type: "credit", amount: "+1,200", balance: "13,900" },
] as const;

function WalletPage() {
  const balance = 46200; // demo
  const negative = balance < 0;

  return (
    <div>
      <PageHeader
        title="المحفظة الرقمية"
        description="إدارة رصيدك وعرض جميع المعاملات."
        action={
          <div className="flex gap-2">
            <Button variant="outline"><Download className="ml-1.5 size-4" /> كشف حساب</Button>
            <Button className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
              <Plus className="ml-1.5 size-4" /> شحن الرصيد
            </Button>
          </div>
        }
      />

      {/* Balance card */}
      <section className={cn(
        "relative overflow-hidden rounded-3xl p-8 shadow-elegant",
        negative
          ? "bg-destructive/10 border border-destructive/30"
          : "bg-gradient-to-bl from-teal to-teal/85 text-teal-foreground"
      )}>
        {!negative && <div className="absolute -top-20 -left-20 size-72 rounded-full bg-mint/30 blur-3xl" />}
        <div className="relative grid gap-2 md:grid-cols-3 md:items-end">
          <div className="md:col-span-2">
            <div className={cn("text-xs", negative ? "text-destructive" : "text-teal-foreground/80")}>الرصيد المتاح</div>
            <div className={cn("mt-1 text-5xl font-extrabold", negative ? "text-destructive" : "")}>
              {balance.toLocaleString("ar-SA")} ر.س
            </div>
            <div className={cn("mt-2 text-xs", negative ? "text-destructive" : "text-teal-foreground/80")}>
              المحجوز: 8,200 ر.س • السقف الائتماني: 100,000 ر.س
            </div>
          </div>
          {negative && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/15 p-4 text-destructive text-sm">
              <div className="flex items-center gap-2 font-bold"><AlertTriangle className="size-4" /> تحذير</div>
              <div className="mt-1">يرجى شحن الرصيد خلال 3 أيام عمل لتجنب توقف الخدمة.</div>
            </div>
          )}
        </div>
      </section>

      {/* Breakdown */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="text-xs text-muted-foreground">المتاح</div>
          <div className="mt-1 text-2xl font-bold text-mint">38,000 ر.س</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="text-xs text-muted-foreground">المحجوز</div>
          <div className="mt-1 text-2xl font-bold text-amber-warn">8,200 ر.س</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="text-xs text-muted-foreground">إجمالي الإنفاق هذا الشهر</div>
          <div className="mt-1 text-2xl font-bold text-teal">17,700 ر.س</div>
        </div>
      </div>

      {/* Transactions */}
      <section className="mt-8 rounded-2xl border border-border bg-card shadow-soft">
        <div className="border-b border-border p-5">
          <h2 className="text-base font-bold">المعاملات الأخيرة</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-teal/5 text-right text-xs text-teal">
              <tr>
                <th className="p-4 font-semibold">التاريخ</th>
                <th className="p-4 font-semibold">الوصف</th>
                <th className="p-4 font-semibold">النوع</th>
                <th className="p-4 font-semibold">المبلغ</th>
                <th className="p-4 font-semibold">الرصيد</th>
              </tr>
            </thead>
            <tbody>
              {tx.map((t, i) => (
                <tr key={i} className="border-t border-border hover:bg-muted/40">
                  <td className="p-4 text-muted-foreground">{t.date}</td>
                  <td className="p-4">{t.desc}</td>
                  <td className="p-4">
                    {t.type === "credit" ? (
                      <span className="inline-flex items-center gap-1 text-mint text-xs font-semibold"><ArrowDownCircle className="size-3.5" /> إيداع</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-destructive text-xs font-semibold"><ArrowUpCircle className="size-3.5" /> خصم</span>
                    )}
                  </td>
                  <td className={cn("p-4 font-bold", t.type === "credit" ? "text-mint" : "text-destructive")}>{t.amount} ر.س</td>
                  <td className="p-4 font-medium">{t.balance} ر.س</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
