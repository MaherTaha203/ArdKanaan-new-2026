"use client";

import * as React from "react";
import { Search, Plus, Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StudentFormDialog } from "@/components/forms/student-form";
import { StudentStatusBadge, EnrollmentStatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";
import {
  students,
  enrollmentsByStudent,
  type Student,
  type StudentStatus,
} from "@/lib/sample-data";

type Filter = "all" | StudentStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "active", label: "نشط" },
  { key: "suspended", label: "موقوف" },
];

export default function StudentsPage() {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const [selected, setSelected] = React.useState<Student | null>(null);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Student | null>(null);

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(s: Student) {
    setEditing(s);
    setFormOpen(true);
  }

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (!q) return true;
      return `${s.num} ${s.name} ${s.manual} ${s.phone}`.toLowerCase().includes(q);
    });
  }, [query, filter]);

  return (
    <main className="mx-auto max-w-[1120px] px-4 py-6">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">إدارة الطلاب</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            البحث بالرقم التلقائي أو اليدوي أو الاسم أو الهاتف
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus /> طالب جديد
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
            placeholder="ابحث عن طالب…"
            aria-label="بحث عن طالب"
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

      {/* desktop table */}
      <div className="hidden md:block">
        <Table>
          <THead>
            <TR>
              <TH>الرقم التلقائي</TH>
              <TH>الاسم الكامل</TH>
              <TH>الرقم اليدوي</TH>
              <TH>الهاتف</TH>
              <TH>التسجيلات النشطة</TH>
              <TH>الحالة</TH>
              <TH>تاريخ الإضافة</TH>
              <TH> </TH>
            </TR>
          </THead>
          <TBody>
            {rows.map((s) => (
              <TR key={s.num}>
                <TD className="tabular text-[13px] text-muted-foreground">{s.num}</TD>
                <TD className="font-semibold">{s.name}</TD>
                <TD className="tabular">{s.manual}</TD>
                <TD className="tabular">{s.phone}</TD>
                <TD className="tabular">{s.activeEnrollments}</TD>
                <TD><StudentStatusBadge status={s.status} /></TD>
                <TD className="tabular text-[13px] text-muted-foreground">{s.createdAt}</TD>
                <TD>
                  <div className="flex justify-end gap-1.5">
                    <IconAction label="عرض التسجيلات" onClick={() => setSelected(s)}>
                      <Eye size={16} />
                    </IconAction>
                    <IconAction label="تعديل" onClick={() => openEdit(s)}>
                      <Pencil size={16} />
                    </IconAction>
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>

      {/* mobile cards */}
      <div className="flex flex-col gap-2.5 md:hidden">
        {rows.map((s) => (
          <Card key={s.num} className="p-3.5">
            <div className="flex items-start justify-between gap-2.5">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="tabular text-[13px] text-muted-foreground">{s.num}</div>
              </div>
              <StudentStatusBadge status={s.status} />
            </div>
            <CardRow label="الرقم اليدوي" value={s.manual} />
            <CardRow label="الهاتف" value={s.phone} />
            <CardRow label="التسجيلات النشطة" value={String(s.activeEnrollments)} />
            <CardRow label="تاريخ الإضافة" value={s.createdAt} />
            <Button variant="ghost" className="mt-2.5 w-full" onClick={() => setSelected(s)}>
              عرض التسجيلات
            </Button>
          </Card>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">لا يوجد طالب يطابق بحثك.</div>
      )}

      <p className="mt-7 text-center text-xs text-muted-foreground">
        نموذج أولي للعرض البصري — لا يتصل بقاعدة بيانات ولا يحفظ أي بيانات.
      </p>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && (
          <DialogContent title={`تسجيلات: ${selected.name}`} description={selected.num}>
            <EnrollmentsList studentNum={selected.num} />
          </DialogContent>
        )}
      </Dialog>

      <StudentFormDialog open={formOpen} onOpenChange={setFormOpen} student={editing} />
    </main>
  );
}

function IconAction({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

function CardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex justify-between gap-2.5 text-[13px] text-muted-foreground">
      <span>{label}</span>
      <b className="tabular font-semibold text-foreground">{value}</b>
    </div>
  );
}

function EnrollmentsList({ studentNum }: { studentNum: string }) {
  const list = enrollmentsByStudent[studentNum] ?? [];
  if (list.length === 0) {
    return <div className="py-6 text-center text-muted-foreground">لا توجد تسجيلات لهذا الطالب.</div>;
  }
  return (
    <ul>
      {list.map((e, i) => (
        <li key={i} className="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
          <div>
            <div className="text-sm font-semibold">{e.course}</div>
            <div className="tabular mt-0.5 text-xs text-muted-foreground">تاريخ التسجيل: {e.date}</div>
          </div>
          <span className="ms-auto">
            <EnrollmentStatusBadge status={e.status} />
          </span>
        </li>
      ))}
    </ul>
  );
}
