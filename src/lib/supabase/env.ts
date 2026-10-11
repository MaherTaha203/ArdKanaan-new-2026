/**
 * قراءة متغيّرات بيئة Supabase والتحقق منها.
 * ملاحظة: لم يُنشأ مشروع Supabase بعد؛ هذه الدالة تقرأ القيم من البيئة فقط
 * ولا تُنشئ أي مورد. يلزم إذن مستقل قبل إنشاء المشروع والأسرار.
 */
export function getSupabaseEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "متغيّرات Supabase غير مهيأة. انسخ .env.example إلى .env.local واملأ " +
        "NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return { url, anonKey };
}
