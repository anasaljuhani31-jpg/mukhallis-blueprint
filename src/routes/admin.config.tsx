import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/config")({
  component: ConfigPage,
});

const features = [
  "إدارة المستخدمين",
  "تخصيص الطلبات",
  "تعديل المحافظ",
  "إصدار التقارير",
  "إعدادات النظام",
];
const roles = ["مشرف عام", "مشرف عمليات", "محاسب", "دعم فني"];

function ConfigPage() {
  return (
    <div>
      <PageHeader title="إعدادات النظام" description="ضبط القواعد العامة، الصلاحيات، وفئات المزوّدين." />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Margins */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-bold">قواعد الهامش الافتراضية</h2>
          <p className="text-sm text-muted-foreground mt-1">يطبَّق على الطلبات تلقائياً ما لم يُعدّل يدوياً.</p>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-1.5"><Label>هامش التخليص (%)</Label><Input dir="ltr" defaultValue="6.5" /></div>
            <div className="grid gap-1.5"><Label>هامش اللوجستيات (%)</Label><Input dir="ltr" defaultValue="8.0" /></div>
            <div className="grid gap-1.5"><Label>هامش الإعفاءات (%)</Label><Input dir="ltr" defaultValue="4.0" /></div>
            <div className="flex justify-end"><Button className="bg-teal text-teal-foreground hover:bg-teal/90">حفظ</Button></div>
          </div>
        </section>

        {/* Provider categories */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-bold">فئات المزوّدين</h2>
          <p className="text-sm text-muted-foreground mt-1">أضف وأدر فئات المخلّصين والمزوّدين اللوجستيين.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["تخليص جاف", "تخليص بحري", "تخليص جوي", "نقل بري", "تخزين مبرّد", "خدمات الإعفاء"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs">
                {t}
                <button className="text-muted-foreground hover:text-destructive">×</button>
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input placeholder="اسم الفئة الجديدة" />
            <Button variant="outline"><Plus className="ml-1 size-4" /> إضافة</Button>
          </div>
        </section>

        {/* Permissions matrix */}
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-bold">مصفوفة الصلاحيات</h2>
          <p className="text-sm text-muted-foreground mt-1">حدّد ما يُسمح لكل دور بالوصول إليه.</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-3 text-right text-xs text-muted-foreground">الميزة</th>
                  {roles.map((r) => (
                    <th key={r} className="p-3 text-center text-xs text-muted-foreground">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f} className="border-t border-border">
                    <td className="p-3 font-medium">{f}</td>
                    {roles.map((r) => (
                      <td key={r} className="p-3 text-center">
                        <Switch defaultChecked={Math.random() > 0.4} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex justify-end"><Button className="bg-teal text-teal-foreground hover:bg-teal/90">حفظ التغييرات</Button></div>
        </section>
      </div>
    </div>
  );
}
