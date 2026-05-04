import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Truck, Layers, UploadCloud } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agents/signup")({
  component: AgentsSignup,
});

type Role = "clearance" | "logistics" | "both";

function AgentsSignup() {
  const [role, setRole] = useState<Role>("clearance");
  return (
    <div className="min-h-screen">
      <PublicNav />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold tracking-widest text-teal">انضم لشبكة مزوّدي الخدمة</div>
          <h1 className="mt-2 text-3xl font-bold">سجّل كمخلّص جمركي أو مزوّد لوجستي</h1>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="mb-6">
            <Label className="mb-2 block">اختر دورك</Label>
            <div className="grid gap-3 md:grid-cols-3">
              <RoleCard active={role === "clearance"} onClick={() => setRole("clearance")} icon={ShieldCheck} title="مخلّص جمركي" />
              <RoleCard active={role === "logistics"} onClick={() => setRole("logistics")} icon={Truck} title="مزوّد لوجستي" />
              <RoleCard active={role === "both"} onClick={() => setRole("both")} icon={Layers} title="الاثنان معاً" />
            </div>
          </div>

          <form className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5"><Label>اسم المكتب/الشركة</Label><Input placeholder="مثال: مكتب البحر الأحمر" /></div>
              <div className="grid gap-1.5"><Label>السجل التجاري</Label><Input dir="ltr" /></div>
              <div className="grid gap-1.5"><Label>الجوال</Label><Input dir="ltr" /></div>
              <div className="grid gap-1.5"><Label>البريد</Label><Input dir="ltr" /></div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {(role === "clearance" || role === "both") && (
                <UploadZone label="رخصة التخليص الجمركي" required tone="teal" />
              )}
              {(role === "logistics" || role === "both") && (
                <UploadZone label="رخصة الخدمات اللوجستية" required={role === "logistics" || role === "both"} tone="teal" />
              )}
              <UploadZone label="السجل التجاري" required tone="teal" />
            </div>

            <div className="flex justify-end pt-2">
              <Button asChild className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
                <Link to="/signup/pending">إرسال الطلب</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  active, onClick, icon: Icon, title,
}: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition",
        active ? "border-teal bg-teal/5 shadow-elegant" : "border-border bg-card hover:border-teal/40",
      )}
    >
      <Icon className={cn("size-7", active ? "text-teal" : "text-muted-foreground")} />
      <span className={cn("text-sm font-semibold", active ? "text-teal" : "")}>{title}</span>
    </button>
  );
}

function UploadZone({ label, required, tone = "teal" }: { label: string; required?: boolean; tone?: "teal" }) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border p-5 text-center transition hover:border-teal hover:bg-teal/5">
      <UploadCloud className="size-6 text-teal" />
      <div className="text-sm font-medium">{label} {required && <span className="text-destructive">*</span>}</div>
      <div className="text-[10px] text-muted-foreground">PDF · JPG · PNG (حتى 10MB)</div>
    </label>
  );
}
