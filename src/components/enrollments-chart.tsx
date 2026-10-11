import { enrollmentsTrend } from "@/lib/sample-data";

// مخطط أعمدة بسيط مرسوم بمقياس ثابت وقِيم حقيقية، بألوان متوافقة مع السمة عبر التوكنات.
const W = 560;
const H = 200;
const PAD_T = 18;
const PAD_B = 34;
const PAD_R = 14;
const PAD_L = 34;
const MAX = 70; // مقياس ثابت تبقى كل القيم تحته
const plotW = W - PAD_L - PAD_R;
const plotH = H - PAD_T - PAD_B;

export function EnrollmentsChart() {
  const barW = (plotW / enrollmentsTrend.length) * 0.56;
  const ticks = [0, 35, 70];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-[200px] w-full"
      role="img"
      aria-label="التسجيلات النشطة الجديدة في آخر ستة أشهر"
    >
      {ticks.map((g) => {
        const y = PAD_T + plotH - (g / MAX) * plotH;
        return (
          <g key={g}>
            <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke="var(--border)" strokeWidth={1} />
            <text x={W - PAD_R + 2} y={y + 4} fontSize={11} textAnchor="start" fill="var(--muted-foreground)">
              {g}
            </text>
          </g>
        );
      })}
      {enrollmentsTrend.map((d, i) => {
        const cx = PAD_L + plotW * ((i + 0.5) / enrollmentsTrend.length);
        const h = (d.value / MAX) * plotH;
        const y = PAD_T + plotH - h;
        return (
          <g key={d.month}>
            <rect x={cx - barW / 2} y={y} width={barW} height={h} rx={4} fill="var(--primary)" />
            <text x={cx} y={y - 6} fontSize={12} fontWeight={600} textAnchor="middle" fill="var(--foreground)">
              {d.value}
            </text>
            <text x={cx} y={H - 12} fontSize={11} textAnchor="middle" fill="var(--muted-foreground)">
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
