# تطبيق الويب — سقالة الواجهة الأمامية

**الحالة:** سقالة أولية لأساس الواجهة فقط. لا تُنشئ موارد Supabase ولا أسرارًا، ولا تتصل بقاعدة بيانات بعد. إنشاء مشروع Supabase وأي مورد مدفوع يبقى خلف بوابة موافقة مستقلة (انظر `TECHNICAL_DESIGN.md §13`).

## التقنيات

وفق `docs/DESIGN_STACK.md`: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · IBM Plex Sans Arabic · التوكنات من `docs/DESIGN_TOKENS.md`.

## بنية المجلدات

```
src/
  app/
    globals.css        # توكنات التصميم (فاتح/داكن) + ربطها بـ Tailwind v4
    layout.tsx         # RTL + الخط + AppShell + Toaster + سكربت منع وميض السمة
    page.tsx           # اللوحة الرئيسية (مؤشرات + مخطط + تنبيهات)
    students/page.tsx  # الطلاب: بحث حيّ + تصفية + نافذة تسجيلات
    courses/page.tsx   # الدورات: بحث بالاسم + تصفية الحالة
    backup/page.tsx    # النسخ الاحتياطي والاستعادة (دمج/استبدال منفصلان)
  components/
    app-shell.tsx      # الشريط العلوي والتنقل
    theme-toggle.tsx   # تبديل فاتح/داكن + سكربت منع الوميض
    status-badge.tsx   # شارات الحالة (لون + أيقونة + نص)
    enrollments-chart.tsx  # مخطط الأعمدة للوحة الرئيسية
    ui/                # مكوّنات أساس بأسلوب shadcn: button, input, card, badge, table, dialog
  lib/
    utils.ts               # cn() وتنسيق التاريخ YYYY-MM-DD
    sample-data.ts         # بيانات توضيحية للنموذج الأولي (تُستبدل باستعلامات Supabase)
    supabase/env.ts        # قراءة متغيّرات البيئة والتحقق منها
    supabase/client.ts     # عميل المتصفح (مفتاح عام فقط)
    supabase/server.ts     # عميل الخادم (طبقة موثوقة، كوكيز الجلسة)
```

## التشغيل محليًا

```bash
npm install
cp .env.example .env.local   # ثم املأ القيم عند توفّر مشروع Supabase
npm run dev                  # http://localhost:3000
```

أوامر الجودة:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run format      # prettier
npm run build       # بناء إنتاجي
```

> ملاحظة: `npm install` و`npm run build` لم يُنفّذا في هذه السقالة (لا تثبيت للاعتماديات في المستودع). تُثبَّت الإصدارات وتُفحص عند أول تشغيل محلي.

## الخطوات التالية

1. إضافة TanStack Table للفرز والترقيم على الجداول الكبيرة، والعرض الافتراضي.
2. نماذج إضافة/تعديل الطلاب والدورات (React Hook Form + Zod) مع حفظ المدخلات عند الخطأ.
3. اختبارات Vitest/Playwright وفحص الوصولية (axe).
4. بعد بوابة الموافقة: تهيئة مشروع Supabase، المخطط، RLS، والمصادقة بحساب واحد، ثم ربط الشاشات بالبيانات الحقيقية بدل `sample-data.ts`.
