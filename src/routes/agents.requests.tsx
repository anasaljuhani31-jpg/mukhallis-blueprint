import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lock, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/agents/requests")({
  component: AgentsRequests,
});

const items = [
  { id: "REQ-2086", company: "شركة الخليج للتجارة", type: "تخليص — استيراد", role: "clearance" as const, status: "pending" as const, locked: false, due: "خلال 24س" },
  { id: "REQ-2088", company: "النخيل الذهبي", type: "لوجستي (مرتبط بتخليص)", role: "logistics" as const, status: "pending" as const, locked: true, due: "بانتظار قبول المخلّص" },
  { id: "REQ-2091", company: "بن غازي للتجهيزات", type: "إعفاء جمركي", role: "clearance" as const, status: "approved" as const, locked: false, due: "—" },
];

function AgentsRequests() {
  const navigate = useNavigate();
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [rejected, setRejected] = useState<Record<string, boolean>>({});

  return (
    <div>
      <PageHeader title="الطلبات المسندة" description="راجع الطلبات وقدّم عرضك أو ارفض مع توضيح السبب." />
      <div className="grid gap-4">
        {items.map((it) => {
          const reason = reasons[it.id] ?? "";
          const isRejecting = rejectingId === it.id;
          const isRejected = rejected[it.id];
          return (
            <article
              key={it.id}
              className={cn(
                "rounded-2xl border border-border bg-card p-5 shadow-soft transition",
                it.locked && "opacity-60",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{it.id}</span>
                    <StatusBadge status={it.status} />
                    {it.locked && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        <Lock className="size-3" /> مقفل
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-bold">{it.company}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">{it.type} • مهلة الرد: {it.due}</div>
                </div>
                <div className="flex gap-2">
                  {!it.locked && !isRejected && (
                    <>
                      <Button
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => setRejectingId(isRejecting ? null : it.id)}
                      >
                        رفض
                      </Button>
                      <Button
                        className="bg-mint text-mint-foreground hover:bg-mint/90 shadow-elegant"
                        onClick={() => navigate({ to: "/agents/requests/$id", params: { id: it.id } })}
                      >
                        قبول وتقديم عرض <ChevronLeft className="mr-1 size-4" />
                      </Button>
                    </>
                  )}
                  {isRejected && (
                    <span className="text-xs font-semibold text-destructive">تم الرفض</span>
                  )}
                  {it.locked && (
                    <Button variant="outline" disabled>
                      <Lock className="ml-1 size-3.5" /> بانتظار قبول التخليص
                    </Button>
                  )}
                </div>
              </div>

              {isRejecting && !isRejected && (
                <div className="mt-4 grid gap-2 rounded-xl border border-border bg-muted/30 p-4">
                  <label className="text-xs font-semibold">سبب الرفض (10 أحرف على الأقل)</label>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReasons((r) => ({ ...r, [it.id]: e.target.value }))}
                    placeholder="يرجى توضيح سبب الرفض…"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", reason.trim().length >= 10 ? "text-mint" : "text-muted-foreground")}>
                      {reason.trim().length}/10
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setRejectingId(null)}>
                        إلغاء
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={reason.trim().length < 10}
                        onClick={() => {
                          setRejected((r) => ({ ...r, [it.id]: true }));
                          setRejectingId(null);
                        }}
                      >
                        تأكيد الرفض
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
