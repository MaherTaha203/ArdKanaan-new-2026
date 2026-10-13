"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/students", label: "الطلاب" },
  { href: "/courses", label: "الدورات" },
  { href: "/backup", label: "النسخ الاحتياطي" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-[1100] border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1120px] items-center gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-[9px] bg-gradient-to-br from-primary to-info font-bold text-white">
              ك
            </span>
            أرض كنعان
          </Link>
          <nav className="ms-auto flex gap-1" aria-label="التنقل الرئيسي">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3.5 py-2 text-sm font-semibold",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </header>
      {children}
    </>
  );
}
