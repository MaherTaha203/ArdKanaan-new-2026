"use client";

import * as React from "react";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { CourseStatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";
import { courses, type CourseStatus } from "@/lib/sample-data";

type Filter = "all" | CourseStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "open", label: "مفتوحة" },
  { key: "closed", label: "مغلقة" },
];

export default function CoursesPage() {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (filter !== "all" && c.status !== filter) return false;
      if (!q) return true;
      return c.name.toLowerCase().includes(q);
    });
  }, [query, filter]);

  return (
    <main className="mx-auto max-w-[1120px] px-4 py-6">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">إدارة الدورات</h1>
          <p className="mt-1 text-sm text-muted-foreground">البحث باسم الدورة مع التصفية حسب الحالة</p>
        </div>
        <Button onClick={() => toast.info("إضافة دورة — سيُفعَّل بعد ربط قاعدة البيانات")}>
          <Plus /> دورة جديدة
        </Button>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={17}
            className="absolute top-1/2 -translate-y-1/2 text-muted-foreground"
            style={{ insetInlineStart: "0.75rem" }}
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث باسم الدورة…"
            aria-label="بحث عن دورة"
            className="ps-10"
          />
        </div>
        <div className="flex gap-1.5" role="group" aria-label="تصفية حسب الحالة">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[13px] font-semibold",
                filter === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <Table>
          <THead>
            <TR>
              <TH>رمز الدورة</TH>
              <TH>اسم الدورة</TH>
              <TH>تاريخ البداية</TH>
              <TH>تاريخ النهاية</TH>
              <TH>التسجيلات النشطة</TH>
              <TH>الحالة</TH>
            </TR>
          </THead>
          <TBody>
            {rows.map((c) => (
              <TR key={c.code}>
                <TD className="tabular text-[13px] text-muted-foreground">{c.code}</TD>
                <TD className="font-semibold">{c.name}</TD>
                <TD className="tabular">{c.startDate}</TD>
                <TD className="tabular">{c.endDate}</TD>
                <TD className="tabular">{c.activeEnrollments}</TD>
                <TD><CourseStatusBadge status={c.status} /></TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2.5 md:hidden">
        {rows.map((c) => (
          <Card key={c.code} className="p-3.5">
            <div className="flex items-start justify-between gap-2.5">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="tabular text-[13px] text-muted-foreground">{c.code}</div>
              </div>
              <CourseStatusBadge status={c.status} />
            </div>
            <Row label="البداية" value={c.startDate} />
            <Row label="النهاية" value={c.endDate} />
            <Row label="التسجيلات النشطة" value={String(c.activeEnrollments)} />
          </Card>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">لا توجد دورة تطابق بحثك.</div>
      )}

      <p className="mt-7 text-center text-xs text-muted-foreground">
        عدد التسجيلات النشطة قيمة محسوبة من التسجيلات، وليست رقمًا يدويًا.
      </p>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex justify-between gap-2.5 text-[13px] text-muted-foreground">
      <span>{label}</span>
      <b className="tabular font-semibold text-foreground">{value}</b>
    </div>
  );
}
