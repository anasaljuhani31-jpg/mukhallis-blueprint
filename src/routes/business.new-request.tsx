import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Check, Lock, Truck, ShieldCheck, FileCheck2, UploadCloud, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/business/new-request")({
  component: NewRequestPage,
});

const steps = ["نوع الخدمة", "نوع العملية", "تفاصيل الشحنة", "الوثائق", "المراجعة"];

// Mock: existing customs clearance requests for the current business
const existingClearanceRequests: { id: string; status: "pending" | "approved" | "in_progress" | "completed" | "rejected" }[] = [
  { id: "REQ-2086", status: "in_progress" },
];

const LOGISTICS_TOOLTIP = "متاح فقط بعد قبول طلب تخليص جمركي";

function NewRequestPage() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState({ clearance: true, exemption: false, logistics: false });
  const [isImport, setIsImport] = useState(true);
  const logisticsAvailable = existingClearanceRequests.some(
    (r) => r.status === "approved" || r.status === "in_progress",
  );

  return (
    <div>
      <PageHeader title="طلب خدمة جديد" description="اتبع الخطوات لإكمال طلبك بدقّة." />

      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2 overflow-x-auto rounded-2xl border border-border bg-card p-3 shadow-soft">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s} className="flex items-center gap-2 whitespace-nowrap">
              <div
                className={cn(
                  "grid size-8 place-items-center rounded-full text-xs font-bold transition",
                  done && "bg-mint text-mint-foreground",
                  active && "bg-teal text-teal-foreground shadow-glow",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </div>
              <span className={cn("text-sm", active ? "font-bold text-foreground" : "text-muted-foreground")}>{s}</span>
              {i < steps.length - 1 && <span className="mx-2 h-px w-6 bg-border" />}
            </li>
          );
        })}
      </ol>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
        {step === 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            <ServiceCard
              checked={services.clearance}
              onChange={(v) => setServices((s) => ({ ...s, clearance: v }))}
              icon={ShieldCheck}
              title="التخليص الجمركي"
              desc="معالجة استيراد/تصدير الشحنات."
              tone="teal"
            />
            <ServiceCard
              checked={services.exemption}
              onChange={(v) => setServices((s) => ({ ...s, exemption: v }))}
              icon={FileCheck2}
              title="الإعفاء الجمركي"
              desc="طلب إعفاء بناءً على وثائق معتمدة."
              tone="pink"
            />
            <ServiceCard
              checked={services.logistics}
              onChange={(v) => logisticsAvailable && setServices((s) => ({ ...s, logistics: v }))}
              icon={Truck}
              title="الخدمات اللوجستية"
              desc={logisticsAvailable ? "نقل وتخزين وتسليم." : LOGISTICS_TOOLTIP}
              tone="muted"
              disabled={!logisticsAvailable}
              tooltip={!logisticsAvailable ? LOGISTICS_TOOLTIP : undefined}
            />
          </div>
        )}

        {step === 1 && (
          <div className="mx-auto max-w-md text-center">
            <h3 className="text-lg font-bold">نوع العملية</h3>
            <p className="mt-1 text-sm text-muted-foreground">حدّد ما إذا كانت الشحنة استيراداً أم تصديراً.</p>
            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-border bg-muted/30 p-3">
              <span className={cn("font-semibold", isImport ? "text-teal" : "text-muted-foreground")}>استيراد</span>
              <Switch checked={!isImport} onCheckedChange={(v) => setIsImport(!v)} />
              <span className={cn("font-semibold", !isImport ? "text-teal" : "text-muted-foreground")}>تصدير</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5"><Label>ميناء الدخول</Label><Input placeholder="مثال: ميناء جدة الإسلامي" /></div>
            <div className="grid gap-1.5"><Label>بلد المصدر</Label><Input placeholder="الصين" /></div>
            <div className="grid gap-1.5"><Label>وصف البضاعة</Label><Input placeholder="إلكترونيات استهلاكية" /></div>
            <div className="grid gap-1.5">
              <Label>كود HS (تلقائي)</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="اختر/ابحث عن البند" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="8517">8517 — أجهزة اتصالات</SelectItem>
                  <SelectItem value="8471">8471 — حواسيب</SelectItem>
                  <SelectItem value="8528">8528 — شاشات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5"><Label>عدد الطرود</Label><Input dir="ltr" type="number" placeholder="120" /></div>
            <div className="grid gap-1.5"><Label>الوزن الإجمالي (كجم)</Label><Input dir="ltr" type="number" placeholder="2500" /></div>
            <div className="grid gap-1.5 md:col-span-2"><Label>ملاحظات إضافية</Label><Textarea rows={3} /></div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <UploadZone label="فاتورة تجارية" required />
            <UploadZone label="بوليصة الشحن" required />
            <UploadZone label="قائمة التعبئة" />
            {services.exemption && (
              <UploadZone label="ورقة الإعفاء" required highlight />
            )}
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4">
            <h3 className="text-lg font-bold">مراجعة الطلب</h3>
            <div className="grid gap-3 rounded-xl border border-border bg-muted/30 p-5 text-sm">
              <Row k="نوع الخدمة" v={[
                services.clearance && "تخليص جمركي",
                services.exemption && "إعفاء",
                services.logistics && "لوجستي",
              ].filter(Boolean).join("، ")} />
              <Row k="نوع العملية" v={isImport ? "استيراد" : "تصدير"} />
              <Row k="ميناء الدخول" v="ميناء جدة الإسلامي" />
              <Row k="كود HS" v="8517" />
              <Row k="الوثائق" v="٣ ملفات مرفوعة" />
            </div>
            <div className="rounded-xl border border-mint/30 bg-mint/10 p-4 text-sm text-mint flex items-center gap-2">
              <CheckCircle2 className="size-4" /> الطلب جاهز للإرسال. سيُولّد رقم مرجعي فور التأكيد.
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            <ChevronRight className="ml-1 size-4" /> السابق
          </Button>
          {step < steps.length - 1 ? (
            <Button className="bg-teal text-teal-foreground hover:bg-teal/90" onClick={() => setStep((s) => s + 1)}>
              التالي <ChevronLeft className="mr-1 size-4" />
            </Button>
          ) : (
            <Button asChild className="bg-mint text-mint-foreground hover:bg-mint/90 shadow-elegant">
              <Link to="/business/requests">إرسال الطلب</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  checked,
  onChange,
  icon: Icon,
  title,
  desc,
  tone,
  disabled,
  tooltip,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tone: "teal" | "pink" | "muted";
  disabled?: boolean;
  tooltip?: string;
}) {
  const tones = {
    teal: { border: "border-teal", bg: "bg-teal/10", icon: "text-teal" },
    pink: { border: "border-pink-soft", bg: "bg-pink-soft/15", icon: "text-pink-soft" },
    muted: { border: "border-border", bg: "bg-muted", icon: "text-muted-foreground" },
  }[tone];
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      title={tooltip}
      className={cn(
        "group relative flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-right transition",
        checked && !disabled ? `${tones.border} ${tones.bg} shadow-elegant` : "border-border bg-card hover:border-teal/40",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {disabled && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-foreground/80 px-2 py-0.5 text-[10px] text-background">
          <Lock className="size-2.5" /> مقفل
        </span>
      )}
      <div className={cn("grid size-12 place-items-center rounded-xl", tones.bg, tones.icon)}>
        <Icon className="size-6" />
      </div>
      <div>
        <div className="font-bold">{title}</div>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      </div>
      {checked && !disabled && (
        <span className="absolute top-3 left-3 grid size-6 place-items-center rounded-full bg-mint text-mint-foreground">
          <Check className="size-3.5" />
        </span>
      )}
    </button>
  );
}

function UploadZone({ label, required, highlight }: { label: string; required?: boolean; highlight?: boolean }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition",
        highlight ? "border-pink-soft bg-pink-soft/5 hover:bg-pink-soft/10" : "border-border hover:border-teal hover:bg-teal/5",
      )}
    >
      <UploadCloud className={cn("size-7", highlight ? "text-pink-soft" : "text-teal")} />
      <div className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </div>
      <div className="text-[11px] text-muted-foreground">اسحب الملف هنا أو اضغط للرفع</div>
      <div className="text-[10px] text-muted-foreground">PDF · JPG · PNG (حتى 10MB)</div>
    </label>
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
