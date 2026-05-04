import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText } from "lucide-react";

export const Route = createFileRoute("/agents/compliance")({
  component: Compliance,
});

const licenses = [
  { type: "رخصة المخلّص الجمركي", number: "CL-2031-A", expiry: "2027-08-12", status: "active" as const, days: 480 },
  { type: "رخصة الخدمات اللوجستية", number: "LG-1188-B", expiry: "2026-05-20", status: "expiring" as const, days: 14 },
  { type: "ضمان بنكي", number: "BG-7790-C", expiry: "2025-12-10", status: "expired" as const, days: -130 },
];

function Compliance() {
  return (
    <div>
      <PageHeader title="الامتثال والتراخيص" description="تابع تراخيصك ووثائقك الرسمية وقم بالتجديد قبل الانتهاء." />

      <div className="grid gap-4 md:grid-cols-2">
        {licenses.map((l) => (
          <div key={l.number} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-teal/10 text-teal">
                  <FileText className="size-5" />
                </div>
                <div>
                  <div className="font-bold">{l.type}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-0.5">#{l.number}</div>
                  <div className="text-xs text-muted-foreground mt-1">تاريخ الانتهاء: {l.expiry}</div>
                </div>
              </div>
              <StatusBadge status={l.status} />
            </div>

            {l.status === "expiring" && (
              <div className="mt-4 rounded-lg bg-amber-warn/10 p-3 text-xs text-amber-warn">
                ينتهي خلال {l.days} يوماً — يرجى المبادرة بالتجديد.
              </div>
            )}
            {l.status === "expired" && (
              <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
                منتهي منذ {Math.abs(l.days)} يوماً — قد يتم إيقاف خدماتك.
              </div>
            )}

            {(l.status === "expiring" || l.status === "expired") && (
              <Button className="mt-4 w-full bg-teal text-teal-foreground hover:bg-teal/90">
                <UploadCloud className="ml-1.5 size-4" /> رفع رخصة محدّثة
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
