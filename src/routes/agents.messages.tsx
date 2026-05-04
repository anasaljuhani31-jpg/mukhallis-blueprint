import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Flag, Send, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agents/messages")({
  component: Messages,
});

const threads = [
  { id: "t1", who: "شركة الخليج للتجارة", req: "REQ-2086", last: "تم استلام الفاتورة، شكراً.", time: "10:42", unread: 2 },
  { id: "t2", who: "بن غازي للتجهيزات", req: "REQ-2091", last: "هل يمكن تسريع المعالجة؟", time: "أمس", unread: 0 },
  { id: "t3", who: "النخيل الذهبي", req: "REQ-2088", last: "تم الاتفاق على المواعيد.", time: "12 أبريل", unread: 0 },
];

function Messages() {
  const [active, setActive] = useState("t1");
  const cur = threads.find((t) => t.id === active)!;

  return (
    <div>
      <PageHeader title="مركز المحادثات" description="تواصل مباشر مع المنشآت بشأن طلباتها." />

      <div className="grid gap-0 lg:grid-cols-[1fr_320px] rounded-2xl border border-border bg-card overflow-hidden shadow-soft min-h-[520px]">
        {/* Chat (left in RTL) */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <div className="font-bold">{cur.who}</div>
              <div className="text-xs text-muted-foreground">طلب {cur.req}</div>
            </div>
            <Button variant="ghost" size="icon" className="text-amber-warn" title="تصعيد للإدارة">
              <Flag className="size-4" />
            </Button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4 text-sm">
            <Bubble side="them" text="السلام عليكم، وصلتنا الفاتورة بقيمة 12,400 ر.س." />
            <Bubble side="me" text="وعليكم السلام، تم اعتمادها وستُحوَّل اليوم." />
            <Bubble side="them" text="ممتاز، ننتظر تأكيد بدء التنفيذ." />
          </div>
          <div className="flex items-center gap-2 border-t border-border p-3">
            <Input placeholder="اكتب رسالة…" className="flex-1" />
            <Button size="icon" className="bg-teal text-teal-foreground"><Send className="size-4" /></Button>
          </div>
        </section>

        {/* Thread list (right in RTL) */}
        <aside className="border-r border-border bg-muted/30">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="بحث في المحادثات…" className="pr-9 bg-card" />
            </div>
          </div>
          <ul>
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "block w-full p-4 text-right border-b border-border transition",
                    active === t.id ? "bg-teal/10" : "hover:bg-card",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{t.who}</span>
                    <span className="text-[10px] text-muted-foreground">{t.time}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-muted-foreground">{t.last}</span>
                    {t.unread > 0 && (
                      <span className="grid size-5 place-items-center rounded-full bg-mint text-[10px] font-bold text-mint-foreground">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Bubble({ side, text }: { side: "me" | "them"; text: string }) {
  return (
    <div className={cn("flex", side === "me" ? "justify-start" : "justify-end")}>
      <div className={cn(
        "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-soft",
        side === "me" ? "bg-teal text-teal-foreground rounded-br-sm" : "bg-card rounded-bl-sm border border-border",
      )}>
        {text}
      </div>
    </div>
  );
}
