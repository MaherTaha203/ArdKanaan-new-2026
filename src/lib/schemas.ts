import { z } from "zod";

// مخططات تحقق مشتركة بين الواجهة والخادم (مصدر واحد للقواعد).
// ملاحظة: التفرد (الرقم اليدوي/اسم الدورة) لا يُفحص هنا بل في قاعدة البيانات؛
// هذه الطبقة تقدّم رسائل مفهومة فقط ولا تكون مصدر الحقيقة للقيود الحرجة.
// تُبقى الحقول من نوع string لتوافق react-hook-form؛ التطبيع النهائي
// (تحويل الفراغ إلى NULL) يتم في طبقة الخادم قبل الكتابة.

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD بأرقام إنجليزية
const DIGITS_RE = /^[0-9]+$/;

export const studentSchema = z.object({
  fullName: z.string().trim().min(1, "الاسم الكامل مطلوب"),
  manualNumber: z
    .string()
    .refine((v) => v.trim() === "" || DIGITS_RE.test(v.trim()), "الرقم اليدوي يجب أن يحتوي أرقامًا إنجليزية فقط"),
  phone: z.string(),
  status: z.enum(["active", "suspended"]),
  notes: z.string(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;

export const courseSchema = z
  .object({
    name: z.string().trim().min(1, "اسم الدورة مطلوب"),
    startDate: z.string().regex(DATE_RE, "التاريخ بصيغة YYYY-MM-DD"),
    endDate: z.string().regex(DATE_RE, "التاريخ بصيغة YYYY-MM-DD"),
    status: z.enum(["open", "closed"]),
    notes: z.string(),
  })
  .refine((v) => v.endDate >= v.startDate, {
    message: "تاريخ النهاية لا يسبق تاريخ البداية",
    path: ["endDate"],
  });

export type CourseFormValues = z.infer<typeof courseSchema>;
