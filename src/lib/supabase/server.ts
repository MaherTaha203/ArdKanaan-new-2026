import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./env";

/**
 * عميل Supabase لجهة الخادم (طبقة موثوقة).
 * يتحقق من جلسة الحساب الوحيد عبر الكوكيز. العمليات الحساسة تمر من هنا،
 * لا من المتصفح. المفتاح العام يُستخدم مع RLS؛ لا يُضمَّن service_role في العميل.
 */
export async function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // يُستدعى من Server Component؛ التجاهل آمن عندما تتولى الـ middleware التحديث.
        }
      },
    },
  });
}
