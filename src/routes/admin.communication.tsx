import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Send } from "lucide-react";

export const Route = createFileRoute("/admin/communication")({
  component: CommCenter,
});

const threads = [
  { id: "T-901", req: "REQ-2086", parties: "الخليج ↔ البحر الأحمر", last: "تم تحويل الرسوم.", time: "10:42", flag: "urgent" },
  { id: "T-878", req: "REQ-2091", parties: "بن غازي ↔ سواحل التخليص", last: "بانتظار وثائق إضافية.", time: "أمس", flag: null },
  { id: "T-872", req: "REQ-2080", parties: "النخيل ↔ الخليج للتخليص", last: "اكتمل الاستلام.", time: "12 أبريل", flag: null },
];

function CommCenter() {
  return (
    <div>
      <PageHeader
        title="مركز المحادثات"
        description="مراقبة جميع المحادثات النشطة بين الأطراف."
        action={
          <Button className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
            <Plus className="ml-1 size-4" /> بدء محادثة جديدة
          </Button>
        }
      />

      <div className="mb-5 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:grid-cols-3">
        <div className="relative md:col-span-2">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="ابحث في المحادثات…" className="pr-9" />
        </div>
        <Select>
          <SelectTrigger><SelectValue placeholder="تصفية حسب الطرف" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="biz">منشآت</SelectItem>
            <SelectItem value="agt">مزوّدون</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-teal/5 text-right text-xs text-teal">
            <tr>
              <th className="p-4 font-semibold">رقم المحادثة</th>
              <th className="p-4 font-semibold">الطلب</th>
              <th className="p-4 font-semibold">الأطراف</th>
              <th className="p-4 font-semibold">آخر رسالة</th>
              <th className="p-4 font-semibold">الوقت</th>
              <th className="p-4 font-semibold">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((t) => (
              <tr key={t.id} className="border-t border-border hover:bg-muted/40">
                <td className="p-4 font-mono text-xs">
                  {t.id}
                  {t.flag === "urgent" && <span className="mr-2 inline-block rounded-full bg-amber-warn/15 px-2 py-0.5 text-[10px] text-amber-warn">عاجل</span>}
                </td>
                <td className="p-4">{t.req}</td>
                <td className="p-4">{t.parties}</td>
                <td className="p-4 text-muted-foreground">{t.last}</td>
                <td className="p-4 text-xs text-muted-foreground">{t.time}</td>
                <td className="p-4"><Button size="sm" variant="outline"><Send className="ml-1 size-3.5" /> فتح</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
