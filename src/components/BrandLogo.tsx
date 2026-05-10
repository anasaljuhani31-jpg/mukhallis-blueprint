import { cn } from "@/lib/utils";
import logoUrl from "@/assets/mukhallis-logo.png";

export function BrandLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={logoUrl}
        alt="مخلّص — Mukhallis"
        className={cn(
          "h-10 w-auto object-contain",
          variant === "light" && "brightness-0 invert",
        )}
      />
    </div>
  );
}
