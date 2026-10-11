import { GraduationCap, BookOpen, ClipboardCheck, Clock } from "lucide-react";

type Kpi = {
  label: string;
  value: string;
  foot: string;
  tone: "success" | "primary" | "info" | "warning";
  Icon: typeof GraduationCap;
};

// بيانات توضيحية للسقالة فقط — لا تتصل بقاعدة بيانات بعد.
const KPIS: Kpi[] = [
  { label: "الطلاب النشطون", value: "248", foot: "من إجمالي 271 طالبًا", tone: "success", Icon: GraduationCap },
  { label: "الدورات المفتوحة", value: "12", foot: "من إجمالي 34 دورة", tone: "primary", Icon: BookOpen },
  { label: "التسجيلات النشطة", value: "419", foot: "موزّعة على 12 دورة", tone: "info", Icon: ClipboardCheck },
  { label: "دورات تنتهي قريبًا", value: "3", foot: "خلال 30 يومًا", tone: "warning", Icon: Clock },
];

const TONE_BG: Record<Kpi["tone"], string> = {
  success: "bg-success",
  primary: "bg-primary",
  info: "bg-info",
  warning: "bg-warning",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-4 py-6">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">الملخص الرئيسي</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            نظرة عامة على الطلاب والدورات والتسجيلات النشطة
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
          بيانات توضيحية للسقالة
        </span>
      </header>

      <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map(({ label, value, foot, tone, Icon }) => (
          <article
            key={label}
            className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-[18px] shadow-sm"
          >
            <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
              <span className={`grid size-[30px] place-items-center rounded-lg text-white ${TONE_BG[tone]}`}>
                <Icon size={17} strokeWidth={2.2} />
              </span>
              {label}
            </div>
            <div className="tabular text-3xl font-bold leading-none">{value}</div>
            <div className="tabular text-xs text-muted-foreground">{foot}</div>
          </article>
        ))}
      </section>

      <p className="mt-7 text-center text-xs text-muted-foreground">
        سقالة الواجهة الأولية — ترجمة توكنات <code>docs/DESIGN_TOKENS.md</code> إلى تطبيق Next.js.
        الشاشات الكاملة (الطلاب، الدورات، النسخ الاحتياطي) تُبنى بعد اعتماد النموذج الأولي.
      </p>
    </main>
  );
}
