import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "relative grid size-9 place-items-center rounded-xl shadow-soft",
          variant === "dark"
            ? "bg-gradient-to-br from-teal to-teal/80 text-white"
            : "bg-white/15 text-white backdrop-blur",
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-5">
          <path
            d="M4 7c4-3 12-3 16 0v8c-4-3-12-3-16 0V7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.2" fill="var(--mint)" />
        </svg>
        <span className="absolute -bottom-1 -left-1 size-2.5 rounded-full bg-mint" />
      </div>
      <div className="leading-tight">
        <div
          className={cn(
            "text-base font-bold",
            variant === "dark" ? "text-foreground" : "text-white",
          )}
        >
          مخلّص
        </div>
        <div
          className={cn(
            "text-[10px] tracking-widest",
            variant === "dark" ? "text-muted-foreground" : "text-white/70",
          )}
        >
          MUKHALLIS
        </div>
      </div>
    </div>
  );
}
