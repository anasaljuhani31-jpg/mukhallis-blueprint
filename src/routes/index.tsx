import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, ShieldCheck, Truck, FileCheck2, CheckCircle2, Building2, FileText, CreditCard, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مخلّص — منصة التخليص الجمركي والإعفاءات والشحن" },
      { name: "description", content: "بوابة رقمية متكاملة لإدارة طلبات التخليص الجمركي، الإعفاءات، والخدمات اللوجستية بكل سهولة وشفافية." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-mint animate-pulse" />
            منصّة معتمدة • تخليص ذكي • شفافية كاملة
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            تخليصك الجمركي،
            <br />
            <span className="text-gradient-brand">أسرع. أوضح. أذكى.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            مخلّص يربط الأعمال بالمخلّصين الجمركيين ومزوّدي الخدمات اللوجستية في منصة واحدة —
            من الطلب وحتى التسليم، مع متابعة لحظية وفواتير شفافة ومحفظة رقمية.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
              <Link to="/signup">
                ابدأ الآن مجاناً <ArrowLeft className="mr-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-teal text-teal hover:bg-teal hover:text-teal-foreground">
              <Link to="/signin">تسجيل الدخول</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-mint" /> دعم 24/7</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-mint" /> فواتير شفافة</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-mint" /> امتثال كامل</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <div className="text-xs font-semibold tracking-widest text-teal">خدماتنا</div>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">حلول متكاملة في مكان واحد</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Customs */}
          <article className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elegant">
            <div className="grid size-12 place-items-center rounded-xl bg-teal/10 text-teal">
              <ShieldCheck className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold">التخليص الجمركي</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              معالجة كاملة للاستيراد والتصدير، تخصيص بنود HS، وتنسيق مع الجمارك.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-teal">
              ابدأ طلب تخليص <ArrowLeft className="size-3.5" />
            </div>
          </article>

          {/* Exemption */}
          <article className="group relative rounded-2xl border border-pink-soft/40 bg-card p-6 shadow-soft transition hover:shadow-elegant">
            <div className="grid size-12 place-items-center rounded-xl bg-pink-soft/15 text-pink-soft">
              <FileCheck2 className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold">الإعفاءات</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              تجهيز ومعالجة طلبات الإعفاء الجمركي مع رفع الوثائق المعتمدة.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-pink-soft">
              قدّم طلب إعفاء <ArrowLeft className="size-3.5" />
            </div>
          </article>

          {/* Logistics (locked) */}
          <article className="group relative rounded-2xl border border-dashed border-border bg-muted/40 p-6 opacity-70" title="متاح كإضافة بعد التخليص">
            <div className="absolute top-4 left-4 grid size-7 place-items-center rounded-full bg-foreground/80 text-background">
              <Lock className="size-3.5" />
            </div>
            <div className="grid size-12 place-items-center rounded-xl bg-foreground/5 text-muted-foreground">
              <Truck className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-muted-foreground">الخدمات اللوجستية</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              متاحة كإضافة بعد طلب التخليص — نقل، تخزين، وتسليم لباب المنشأة.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Lock className="size-3.5" /> تتطلّب طلب تخليص نشط
            </div>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <div className="text-xs font-semibold tracking-widest text-teal">كيف نعمل</div>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">٤ خطوات فقط</h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Building2, title: "سجّل منشأتك", desc: "أنشئ حساب الأعمال وارفع وثائقك." },
            { icon: FileText, title: "قدّم طلبك", desc: "اختر الخدمة وأدخل بيانات الشحنة." },
            { icon: CreditCard, title: "اعتمد الفاتورة", desc: "راجع العرض واعتمد الدفع." },
            { icon: PackageCheck, title: "تابع وتسلّم", desc: "تابع كل مرحلة لحظياً حتى التسليم." },
          ].map((s, i) => (
            <li key={i} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="absolute -top-3 right-6 grid size-7 place-items-center rounded-full bg-mint text-mint-foreground text-xs font-bold">
                {i + 1}
              </div>
              <s.icon className="size-7 text-teal" />
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-bl from-teal to-teal/80 p-10 text-center text-teal-foreground shadow-elegant">
          <div className="absolute -top-20 -left-20 size-72 rounded-full bg-mint/30 blur-3xl" />
          <h3 className="text-2xl font-bold md:text-3xl">جاهز تبدأ تخليصك القادم؟</h3>
          <p className="mt-2 text-teal-foreground/85">سجّل الآن واستلم أوّل عرض خلال ساعات.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-mint text-mint-foreground hover:bg-mint/90">
              <Link to="/signup">إنشاء حساب الأعمال</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
              <Link to="/agents/signup">انضم كمخلّص أو مزوّد لوجستي</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/40 py-8 text-center text-xs text-muted-foreground">
        © 2026 مخلّص — Mukhallis. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
