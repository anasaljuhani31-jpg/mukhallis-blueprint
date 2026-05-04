import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/PublicNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Route = createFileRoute("/signin")({
  component: SignInPage,
});

function SignInPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  return (
    <div className="min-h-screen">
      <PublicNav />
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {step === "phone" ? "أدخل رقم جوالك المسجّل" : "أدخل رمز التحقق المرسل إليك"}
            </p>
          </div>

          {step === "phone" ? (
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("otp");
              }}
            >
              <div className="grid gap-1.5">
                <Label>رقم الجوال</Label>
                <Input dir="ltr" placeholder="+966 5x xxx xxxx" />
              </div>
              <Button type="submit" className="w-full bg-teal text-teal-foreground hover:bg-teal/90">
                إرسال رمز التحقق
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                ملاحظة: لا يُسمح بأكثر من جلسة نشطة واحدة لكل حساب.
              </p>
            </form>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label>رمز التحقق</Label>
                <div className="flex justify-center gap-2" dir="ltr">
                  {[0, 1, 2, 3].map((i) => (
                    <Input key={i} className="size-14 text-center text-xl font-bold" maxLength={1} />
                  ))}
                </div>
              </div>
              <Button asChild className="w-full bg-mint text-mint-foreground hover:bg-mint/90">
                <Link to="/business">دخول</Link>
              </Button>
              <button
                type="button"
                className="text-center text-xs text-muted-foreground hover:text-teal"
                onClick={() => setStep("phone")}
              >
                تغيير رقم الجوال
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
