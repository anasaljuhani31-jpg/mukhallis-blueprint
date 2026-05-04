import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/agents/requests/$id")({
  component: AgentRequestDetail,
});

function AgentRequestDetail() {
  const { id } = Route.useParams();
  return (
    <div>
      <PageHeader
        title={`تقديم عرض — ${id}`}
        description="راجع تفاصيل الشحنة ثم قدّم عرضك المالي."
        action={
          <Button asChild variant="outline"><Link to="/agents/requests"><ArrowRight className="ml-1 size-4" /> الرجوع</Link></Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Shipment accordion */}
        <section className="lg:col-span-2 grid gap-4">
          <details open className="group rounded-2xl border border-border bg-card p-5 shadow-soft">
            <summary className="flex cursor-pointer items-center justify-between font-bold">
              تفاصيل المنشأة والشحنة
              <ChevronDown className="size-4 transition group-open:rotate-180" />
            </summary>
            <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              <Row k="المنشأة" v="شركة الخليج للتجارة" />
              <Row k="السجل التجاري" v="1010234567" />
              <Row k="نوع العملية" v="استيراد" />
              <Row k="الميناء" v="جدة الإسلامي" />
              <Row k="بلد المصدر" v="الصين" />
              <Row k="كود HS" v="8517" />
              <Row k="الوزن" v="2,500 كجم" />
              <Row k="عدد الطرود" v="120" />
            </div>
          </details>

          {/* Clearance proposal */}
          <div className="rounded-2xl border border-teal/30 bg-card p-5 shadow-soft">
            <h3 className="font-bold mb-4 text-teal">عرض التخليص الجمركي</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5"><Label>رسوم خدمة المخلّص (ر.س)</Label><Input dir="ltr" placeholder="3000" /></div>
              <div className="grid gap-1.5"><Label>قيمة الفاتورة الجمركية التقديرية (ر.س)</Label><Input dir="ltr" placeholder="8400" /></div>
              <div className="grid gap-1.5 md:col-span-2"><Label>ملاحظات</Label><Textarea rows={2} /></div>
            </div>
          </div>

          {/* Logistics (dual role) */}
          <div className="rounded-2xl border-2 border-dashed border-mint/40 bg-mint/5 p-5">
            <h3 className="font-bold mb-4 text-mint">خطة التوصيل اللوجستي (دور مزدوج)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5"><Label>وسيلة النقل</Label><Input placeholder="شاحنة 12م مبردة" /></div>
              <div className="grid gap-1.5"><Label>الوجهة النهائية</Label><Input placeholder="مستودع العميل، الرياض" /></div>
              <div className="grid gap-1.5"><Label>تكلفة النقل (ر.س)</Label><Input dir="ltr" placeholder="2200" /></div>
              <div className="grid gap-1.5"><Label>مدة التسليم</Label><Input placeholder="48 ساعة" /></div>
            </div>
          </div>
        </section>

        <aside className="grid gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft text-sm">
            <h3 className="font-bold mb-3">ملخّص العرض</h3>
            <Row k="رسوم تخليص" v="3,000 ر.س" />
            <Row k="فاتورة جمركية" v="8,400 ر.س" />
            <Row k="نقل لوجستي" v="2,200 ر.س" />
            <div className="mt-3 border-t border-border pt-3 flex justify-between font-bold">
              <span>إجمالي عرضك</span>
              <span className="text-teal">13,600 ر.س</span>
            </div>
          </div>
          <Button className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">إرسال العرض</Button>
          <Button variant="outline" className="border-destructive text-destructive">رفض الطلب</Button>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/50 py-1.5">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
