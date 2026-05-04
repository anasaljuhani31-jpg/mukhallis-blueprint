import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/admin/wallets")({
  component: WalletsPage,
});

const wallets = [
  { id: "BIZ-1029", name: "شركة الخليج للتجارة", balance: 46200, reserved: 8200 },
  { id: "BIZ-1027", name: "بن غازي للتجهيزات", balance: -3400, reserved: 0 },
  { id: "BIZ-1019", name: "النخيل الذهبي", balance: 12500, reserved: 1500 },
  { id: "BIZ-1011", name: "تجارة الشرق", balance: -800, reserved: 200 },
  { id: "BIZ-1004", name: "شحن العالمية", balance: 88300, reserved: 4500 },
];

function WalletsPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <PageHeader title="إدارة المحافظ" description="عرض وتعديل أرصدة محافظ المنشآت." />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-teal/5 text-right text-xs text-teal">
            <tr>
              <th className="p-4 font-semibold">المعرّف</th>
              <th className="p-4 font-semibold">المنشأة</th>
              <th className="p-4 font-semibold">الرصيد</th>
              <th className="p-4 font-semibold">المحجوز</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {wallets.map((w) => (
              <tr key={w.id} className="border-t border-border hover:bg-muted/40">
                <td className="p-4 font-mono text-xs">{w.id}</td>
                <td className="p-4 font-medium">{w.name}</td>
                <td className={cn("p-4 font-bold", w.balance < 0 ? "text-destructive" : "text-foreground")}>
                  {w.balance.toLocaleString("ar-SA")} ر.س
                </td>
                <td className="p-4 text-amber-warn">{w.reserved.toLocaleString("ar-SA")} ر.س</td>
                <td className="p-4 text-left">
                  <Button size="sm" variant="outline" onClick={() => setOpen(w.id)}>تعديل الرصيد</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={() => setOpen(null)}>
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-elegant" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">تعديل رصيد {open}</h3>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-1.5">
                <label className="text-xs text-muted-foreground">المبلغ (ر.س)</label>
                <Input dir="ltr" placeholder="0.00" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs text-muted-foreground">سبب التعديل (إلزامي)</label>
                <Input placeholder="مثال: استرداد مدفوع مزدوج…" />
              </div>
              <div className="mt-2 flex gap-2">
                <Button className="flex-1 bg-mint text-mint-foreground hover:bg-mint/90">
                  <Plus className="ml-1 size-4" /> إضافة رصيد
                </Button>
                <Button variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  <Minus className="ml-1 size-4" /> خصم رصيد
                </Button>
              </div>
              <Button variant="ghost" onClick={() => setOpen(null)}>إلغاء</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
