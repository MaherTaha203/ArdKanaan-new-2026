import { GraduationCap, BookOpen, ClipboardCheck, Clock, TriangleAlert } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { EnrollmentsChart } from "@/components/enrollments-chart";
import { dashboardKpis, reviewAlerts } from "@/lib/sample-data";

type Tone = "success" | "primary" | "info" | "warning";

const TONE_BG: Record<Tone, string> = {
  success: "bg-success",
  primary: "bg-primary",
  info: "bg-info",
  warning: "bg-warning",
};

const kpis: { label: string; value: string; foot: string; tone: Tone; Icon: typeof GraduationCap }[] = [
  { label: "الطلاب النشطون", value: String(dashboardKpis.activeStudents), foot: `من إجمالي ${dashboardKpis.totalStudents} طالبًا`, tone: "success", Icon: GraduationCap },
  { label: "الدورات المفتوحة", value: String(dashboardKpis.openCourses), foot: `من إجمالي ${dashboardKpis.totalCourses} دورة`, tone: "primary", Icon: BookOpen },
  { label: "التسجيلات النشطة", value: String(dashboardKpis.activeEnrollments), foot: "موزّعة على الدورات المفتوحة", tone: "info", Icon: ClipboardCheck },
  { label: "دورات تنتهي قريبًا", value: String(dashboardKpis.endingSoon), foot: "خلال 30 يومًا القادمة", tone: "warning", Icon: Clock },
];

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
          <TriangleAlert size={13} /> بيانات توضيحية للنموذج الأولي
        </span>
      </header>

      <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, foot, tone, Icon }) => (
          <Card key={label} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
              <span className={`grid size-[30px] place-items-center rounded-lg text-white ${TONE_BG[tone]}`}>
                <Icon size={17} strokeWidth={2.2} />
              </span>
              {label}
            </div>
            <div className="tabular text-3xl font-bold leading-none">{value}</div>
            <div className="tabular text-xs text-muted-foreground">{foot}</div>
          </Card>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-1 gap-3.5 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardTitle className="mb-3.5">
            التسجيلات النشطة الجديدة
            <span className="ms-2 text-[13px] font-normal text-muted-foreground">آخر 6 أشهر</span>
          </CardTitle>
          <EnrollmentsChart />
        </Card>

        <Card>
          <CardTitle className="mb-3.5">دورات تحتاج مراجعة</CardTitle>
          <ul>
            {reviewAlerts.map((a) => (
              <li
                key={a.name}
                className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0"
              >
                <span
                  className={`size-2.5 shrink-0 rounded-full ${a.kind === "danger" ? "bg-destructive" : "bg-warning"}`}
                />
                <span className="text-sm font-semibold">{a.name}</span>
                <span className="tabular ms-auto text-start text-xs text-muted-foreground">{a.meta}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
