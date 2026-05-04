import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Download, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agents/invoices")({
  component: AgentsInvoices,
});

const invoices = [
  { id: "INV-5021", req: "REQ-2086", amount: "3,200", date: "12 أبريل", state: "pending" as const },
  { id: "INV-5018", req: "REQ-2080", amount: "2,800", date: "08 أبريل", state: "approved" as const },
  { id: "INV-5012", req: "REQ-2074", amount: "1,950", date: "02 أبريل", state: "completed" as const },
];

const stages = ["معلّقة", "موافق عليها", "مدفوعة"];

function AgentsInvoices() {
  return (
    <div>
      <PageHeader title="الفواتير" description="تابع حالة فواتيرك من الإصدار وحتى الدفع." />

      <div className="grid gap-4">
        {invoices.map((iv) => {
          const stage = iv.state === "pending" ? 0 : iv.state === "approved" ? 1 : 2;
          return (
            <div key={iv.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{iv.id}</span>
                    <StatusBadge status={iv.state} />
                  </div>
                  <div className="mt-1 text-sm">طلب {iv.req} • {iv.date}</div>
                  <div className="mt-1 text-2xl font-bold text-teal">{iv.amount} ر.س</div>
                </div>
                <Button variant="outline"><Download className="ml-1.5 size-4" /> تحميل الفاتورة</Button>
              </div>

              <ol className="mt-5 flex items-center gap-2">
                {stages.map((s, i) => (
                  <li key={s} className="flex flex-1 items-center gap-2">
                    <div className={cn(
                      "grid size-8 place-items-center rounded-full text-xs font-bold",
                      i < stage && "bg-mint text-mint-foreground",
                      i === stage && "bg-teal text-teal-foreground shadow-glow",
                      i > stage && "bg-muted text-muted-foreground",
                    )}>
                      {i < stage ? <Check className="size-4" /> : i === stage ? <Clock className="size-4" /> : i + 1}
                    </div>
                    <span className={cn("text-xs", i <= stage ? "font-semibold" : "text-muted-foreground")}>{s}</span>
                    {i < stages.length - 1 && <div className={cn("h-0.5 flex-1 rounded-full", i < stage ? "bg-mint" : "bg-border")} />}
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
