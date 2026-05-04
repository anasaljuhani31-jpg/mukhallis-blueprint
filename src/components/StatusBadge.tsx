import { cn } from "@/lib/utils";

type Status =
  | "pending"
  | "approved"
  | "completed"
  | "active"
  | "rejected"
  | "suspended"
  | "expired"
  | "expiring"
  | "in_progress"
  | "verified"
  | "exemption"
  | "draft";

const map: Record<Status, { label: string; cls: string }> = {
  pending: { label: "قيد المراجعة", cls: "bg-amber-warn/15 text-amber-warn border-amber-warn/30" },
  in_progress: { label: "قيد التنفيذ", cls: "bg-teal/10 text-teal border-teal/30" },
  approved: { label: "موافق عليه", cls: "bg-mint/15 text-mint border-mint/40" },
  completed: { label: "مكتمل", cls: "bg-mint/15 text-mint border-mint/40" },
  active: { label: "نشط", cls: "bg-mint/15 text-mint border-mint/40" },
  verified: { label: "موثّق", cls: "bg-mint/15 text-mint border-mint/40" },
  rejected: { label: "مرفوض", cls: "bg-destructive/10 text-destructive border-destructive/30" },
  suspended: { label: "موقوف", cls: "bg-amber-warn/15 text-amber-warn border-amber-warn/30" },
  expired: { label: "منتهي", cls: "bg-destructive/10 text-destructive border-destructive/30" },
  expiring: { label: "ينتهي قريباً", cls: "bg-amber-warn/15 text-amber-warn border-amber-warn/30" },
  exemption: { label: "إعفاء", cls: "bg-pink-soft/20 text-pink-soft border-pink-soft/40" },
  draft: { label: "مسودة", cls: "bg-muted text-muted-foreground border-border" },
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  const m = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        m.cls,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? m.label}
    </span>
  );
}
