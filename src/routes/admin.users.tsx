import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, FileText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

const tabs = [
  { id: "biz", label: "المنشآت" },
  { id: "clr", label: "المخلّصون" },
  { id: "log", label: "اللوجستيات" },
  { id: "dual", label: "دور مزدوج" },
];

const data = [
  { name: "شركة الخليج للتجارة", id: "BIZ-1029", date: "10 أبريل 2026", docs: 4, status: "active" as const },
  { name: "بن غازي للتجهيزات", id: "BIZ-1027", date: "08 أبريل 2026", docs: 3, status: "pending" as const },
  { name: "مكتب البحر الأحمر", id: "AGT-2018", date: "05 أبريل 2026", docs: 5, status: "verified" as const },
  { name: "النخيل الذهبي", id: "BIZ-1019", date: "01 أبريل 2026", docs: 2, status: "suspended" as const },
  { name: "خدمات الشحن السريع", id: "AGT-2011", date: "30 مارس 2026", docs: 4, status: "active" as const },
];

function UsersPage() {
  const [tab, setTab] = useState("biz");
  return (
    <div>
      <PageHeader title="إدارة الحسابات" description="مراجعة وتفعيل وإدارة حسابات المنشآت ومزوّدي الخدمة." />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition",
                tab === t.id ? "bg-teal text-teal-foreground shadow-elegant" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="ابحث بالاسم أو المعرّف…" className="pr-9 bg-card" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-teal/5 text-right text-xs text-teal">
            <tr>
              <th className="p-4 font-semibold">المعرّف</th>
              <th className="p-4 font-semibold">الاسم</th>
              <th className="p-4 font-semibold">تاريخ التسجيل</th>
              <th className="p-4 font-semibold">الوثائق</th>
              <th className="p-4 font-semibold">الحالة</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id} className="border-t border-border hover:bg-muted/40">
                <td className="p-4 font-mono text-xs">{u.id}</td>
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 text-muted-foreground">{u.date}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-xs">
                    <FileText className="size-3.5 text-teal" /> {u.docs} ملفات
                  </span>
                </td>
                <td className="p-4"><StatusBadge status={u.status} /></td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {u.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-mint text-mint-foreground hover:bg-mint/90 h-7 px-2 text-xs">موافقة</Button>
                        <Button size="sm" variant="outline" className="border-destructive text-destructive h-7 px-2 text-xs">رفض</Button>
                      </>
                    )}
                    {u.status === "active" && (
                      <Button size="sm" variant="outline" className="border-amber-warn text-amber-warn h-7 px-2 text-xs">إيقاف</Button>
                    )}
                    {u.status === "suspended" && (
                      <Button size="sm" className="bg-teal text-teal-foreground h-7 px-2 text-xs">تفعيل</Button>
                    )}
                    <Button variant="ghost" size="icon" className="size-7"><MoreVertical className="size-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
