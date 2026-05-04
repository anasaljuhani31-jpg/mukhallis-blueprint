import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, FileText, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "إنشاء حساب الأعمال — مخلّص" },
      { name: "description", content: "أنشئ حساب أعمالك على منصة مخلّص لإدارة طلبات التخليص الجمركي والإعفاءات." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold tracking-widest text-teal">حساب الأعمال</div>
          <h1 className="mt-2 text-3xl font-bold">سجّل منشأتك على مخلّص</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            بعد التسجيل سيتم مراجعة وثائقك من قِبل فريق الإدارة قبل تفعيل الحساب.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          <form className="grid gap-5">
            <div className="grid gap-1.5">
              <Label>اسم المنشأة</Label>
              <Input placeholder="مثال: شركة الخليج للتجارة" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>السجل التجاري (CR)</Label>
                <Input placeholder="1010xxxxxx" dir="ltr" />
              </div>
              <div className="grid gap-1.5">
                <Label>الرقم الضريبي (VAT)</Label>
                <Input placeholder="3000xxxxxxxxxxx" dir="ltr" />
              </div>
              <div className="grid gap-1.5">
                <Label>رقم الجوال</Label>
                <Input placeholder="+966 5x xxx xxxx" dir="ltr" />
              </div>
              <div className="grid gap-1.5">
                <Label>البريد الإلكتروني</Label>
                <Input type="email" placeholder="name@company.com" dir="ltr" />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>العنوان الوطني</Label>
              <Input placeholder="الرمز البريدي والمدينة والحي" />
            </div>

            <div className="grid gap-3">
              <div className="text-sm font-semibold">رفع الوثائق</div>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { label: "السجل التجاري", icon: FileText },
                  { label: "الشهادة الضريبية", icon: ShieldCheck },
                  { label: "العنوان الوطني", icon: FileText },
                ].map((d) => (
                  <label key={d.label} className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-5 text-center transition hover:border-teal hover:bg-teal/5">
                    <d.icon className="size-6 text-teal" />
                    <div className="text-sm font-medium">{d.label}</div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <UploadCloud className="size-3" /> اسحب الملف هنا أو اضغط
                    </div>
                    <div className="text-[10px] text-muted-foreground">PDF · JPG · PNG (حتى 10MB)</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-muted-foreground">
                بإنشاء الحساب فإنك توافق على
                <a className="mx-1 text-teal hover:underline" href="#">شروط الاستخدام</a>
                و<a className="mx-1 text-teal hover:underline" href="#">سياسة الخصوصية</a>.
              </div>
              <Button asChild size="lg" className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
                <Link to="/signup/pending">إرسال طلب التسجيل</Link>
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          لديك حساب؟ <Link to="/signin" className="font-medium text-teal hover:underline">سجّل الدخول</Link>
        </p>
      </div>
    </div>
  );
}
