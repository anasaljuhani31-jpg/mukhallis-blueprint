import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <a href="#services" className="text-muted-foreground hover:text-foreground transition">
            خدماتنا
          </a>
          <a href="#how" className="text-muted-foreground hover:text-foreground transition">
            كيف نعمل
          </a>
          <Link to="/business" className="text-muted-foreground hover:text-foreground transition">
            بوابة الأعمال
          </Link>
          <Link to="/agents" className="text-muted-foreground hover:text-foreground transition">
            بوابة المخلّصين
          </Link>
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition">
            بوابة الإدارة
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-teal-foreground">
            <Link to="/signin">تسجيل الدخول</Link>
          </Button>
          <Button asChild className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-elegant">
            <Link to="/signup">إنشاء حساب</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
