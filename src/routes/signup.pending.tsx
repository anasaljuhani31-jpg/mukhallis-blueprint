import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup/pending")({
  component: PendingPage,
});

function PendingPage() {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-12 text-center">
        <div>
          <div className="mx-auto grid size-24 place-items-center rounded-full bg-amber-warn/15 text-amber-warn">
            <Clock className="size-12" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">طلبك قيد المراجعة</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            استلمنا طلب تسجيل منشأتك. سيقوم فريق الإدارة بمراجعة وثائقك خلال ٢٤–٤٨ ساعة عمل،
            وسنرسل لك إشعاراً عند تفعيل حسابك.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild className="bg-teal text-teal-foreground hover:bg-teal/90">
              <Link to="/">العودة للرئيسية</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/signin">تسجيل الدخول</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
