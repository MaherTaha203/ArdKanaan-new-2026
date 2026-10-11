"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

/**
 * عميل Supabase لجهة المتصفح.
 * يستخدم المفتاح العام فقط؛ القيود الحرجة تُفرض بـ RLS والتحقق الخادمي،
 * لا بإخفاء عناصر الواجهة. المفتاح السري (service_role) لا يُستخدم هنا إطلاقًا.
 */
export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
