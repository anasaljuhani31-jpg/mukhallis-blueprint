import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/business/profile")({
  component: ProfilePage,
});

const docs = [
  { name: "السجل التجاري", expiry: "2027-05-12", status: "verified" as const },
  { name: "الشهادة الضريبية", expiry: "2026-09-30", status: "expiring" as const },
  { name: "العنوان الوطني", expiry: "—", status: "verified" as const },
  { name: "تفويض المخلّص", expiry: "2026-01-12", status: "expired" as const },
];

function ProfilePage() {
  return (
    <div>
      <PageHeader title="الملف الشخصي للمنشأة" description="إدارة بيانات منشأتك ووثائق الامتثال." />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-bold">بيانات المنشأة</h2>
          <form className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5"><Label>اسم المنشأة</Label><Input defaultValue="شركة الخليج للتجارة" /></div>
            <div className="grid gap-1.5"><Label>السجل التجاري</Label><Input dir="ltr" defaultValue="1010234567" /></div>
            <div className="grid gap-1.5"><Label>الرقم الضريبي</Label><Input dir="ltr" defaultValue="300012345600003" /></div>
            <div className="grid gap-1.5"><Label>الجوال</Label><Input dir="ltr" defaultValue="+966 50 123 4567" /></div>
            <div className="grid gap-1.5"><Label>البريد الإلكتروني</Label><Input dir="ltr" defaultValue="ops@gulf-trade.sa" /></div>
            <div className="grid gap-1.5"><Label>المدينة</Label><Input defaultValue="جدة" /></div>
            <div className="grid gap-1.5 md:col-span-2"><Label>العنوان الوطني</Label><Input defaultValue="حي الروضة، جدة 23434" /></div>
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <Button variant="outline">إلغاء</Button>
              <Button className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">حفظ التغييرات</Button>
            </div>
          </form>
        </section>

        <aside className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-bold">حالة الـ KYB</h2>
          <ul className="mt-4 space-y-3">
            {docs.map((d) => (
              <li key={d.name} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-teal" />
                  <div>
                    <div className="text-sm font-semibold">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground">انتهاء: {d.expiry}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={d.status} />
                  {(d.status === "expiring" || d.status === "expired") && (
                    <button className="inline-flex items-center gap-1 text-[11px] font-medium text-teal hover:underline">
                      <UploadCloud className="size-3" /> تجديد
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
