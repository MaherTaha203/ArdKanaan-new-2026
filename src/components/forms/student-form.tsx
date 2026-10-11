"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Select, Textarea } from "@/components/ui/field";
import { studentSchema, type StudentFormValues } from "@/lib/schemas";
import type { Student } from "@/lib/sample-data";

export function StudentFormDialog({
  open,
  onOpenChange,
  student,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
}) {
  const isEdit = Boolean(student);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: student?.name ?? "",
      manualNumber: student && student.manual !== "—" ? student.manual : "",
      phone: student && student.phone !== "—" ? student.phone : "",
      status: student?.status ?? "active",
      notes: "",
    },
  });

  // إعادة ضبط القيم عند فتح النافذة لطالب مختلف.
  React.useEffect(() => {
    if (open) {
      reset({
        fullName: student?.name ?? "",
        manualNumber: student && student.manual !== "—" ? student.manual : "",
        phone: student && student.phone !== "—" ? student.phone : "",
        status: student?.status ?? "active",
        notes: "",
      });
    }
  }, [open, student, reset]);

  async function onSubmit(values: StudentFormValues) {
    // لا يُعلن النجاح قبل تأكيد الحفظ فعليًا؛ هنا نموذج أولي بلا قاعدة بيانات.
    await new Promise((r) => setTimeout(r, 400));
    toast.success(isEdit ? "سيُحفظ تعديل الطالب بعد ربط قاعدة البيانات" : `سيُضاف الطالب: ${values.fullName}`);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={isEdit ? "تعديل بيانات الطالب" : "طالب جديد"}
        description={isEdit ? student?.num : "رقم الطالب التلقائي يولّده النظام"}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field label="الاسم الكامل" htmlFor="st-name" required error={errors.fullName?.message}>
            <Input
              id="st-name"
              {...register("fullName")}
              className={errors.fullName ? "border-destructive" : ""}
              aria-invalid={Boolean(errors.fullName)}
            />
          </Field>

          <Field label="الرقم اليدوي" htmlFor="st-manual" error={errors.manualNumber?.message}>
            <Input
              id="st-manual"
              inputMode="numeric"
              placeholder="اختياري"
              {...register("manualNumber")}
              className={errors.manualNumber ? "border-destructive" : ""}
              aria-invalid={Boolean(errors.manualNumber)}
            />
          </Field>

          <Field label="الهاتف" htmlFor="st-phone" error={errors.phone?.message}>
            <Input id="st-phone" placeholder="اختياري" {...register("phone")} />
          </Field>

          <Field label="الحالة" htmlFor="st-status" required error={errors.status?.message}>
            <Select id="st-status" {...register("status")} invalid={Boolean(errors.status)}>
              <option value="active">نشط</option>
              <option value="suspended">موقوف</option>
            </Select>
          </Field>

          <Field label="ملاحظات" htmlFor="st-notes" error={errors.notes?.message}>
            <Textarea id="st-notes" placeholder="اختياري" {...register("notes")} />
          </Field>

          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جارٍ الحفظ…" : isEdit ? "حفظ التعديلات" : "إضافة الطالب"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
