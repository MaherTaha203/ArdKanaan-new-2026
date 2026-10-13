"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Select, Textarea } from "@/components/ui/field";
import { courseSchema, type CourseFormValues } from "@/lib/schemas";
import type { Course } from "@/lib/sample-data";

export function CourseFormDialog({
  open,
  onOpenChange,
  course,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course?: Course | null;
}) {
  const isEdit = Boolean(course);

  const defaults = React.useCallback(
    (): CourseFormValues => ({
      name: course?.name ?? "",
      startDate: course?.startDate ?? "",
      endDate: course?.endDate ?? "",
      status: course?.status ?? "open",
      notes: "",
    }),
    [course],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: defaults(),
  });

  React.useEffect(() => {
    if (open) reset(defaults());
  }, [open, defaults, reset]);

  async function onSubmit(values: CourseFormValues) {
    await new Promise((r) => setTimeout(r, 400));
    toast.success(isEdit ? "سيُحفظ تعديل الدورة بعد ربط قاعدة البيانات" : `ستُضاف الدورة: ${values.name}`);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={isEdit ? "تعديل بيانات الدورة" : "دورة جديدة"}
        description={isEdit ? course?.code : "رمز الدورة التلقائي يولّده النظام"}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field label="اسم الدورة" htmlFor="cr-name" required error={errors.name?.message}>
            <Input
              id="cr-name"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <Field label="تاريخ البداية" htmlFor="cr-start" required error={errors.startDate?.message}>
              <Input
                id="cr-start"
                type="date"
                {...register("startDate")}
                className={`tabular ${errors.startDate ? "border-destructive" : ""}`}
                aria-invalid={Boolean(errors.startDate)}
              />
            </Field>
            <Field label="تاريخ النهاية" htmlFor="cr-end" required error={errors.endDate?.message}>
              <Input
                id="cr-end"
                type="date"
                {...register("endDate")}
                className={`tabular ${errors.endDate ? "border-destructive" : ""}`}
                aria-invalid={Boolean(errors.endDate)}
              />
            </Field>
          </div>

          <Field label="الحالة" htmlFor="cr-status" required error={errors.status?.message}>
            <Select id="cr-status" {...register("status")} invalid={Boolean(errors.status)}>
              <option value="open">مفتوحة</option>
              <option value="closed">مغلقة</option>
            </Select>
          </Field>

          <Field label="ملاحظات" htmlFor="cr-notes" error={errors.notes?.message}>
            <Textarea id="cr-notes" placeholder="اختياري" {...register("notes")} />
          </Field>

          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جارٍ الحفظ…" : isEdit ? "حفظ التعديلات" : "إضافة الدورة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
