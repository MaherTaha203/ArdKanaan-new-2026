"use client";

import { Download, TriangleAlert, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

const STEPS = [
  "التحقق من صحة الملف وبنيته وإصداره والمعرّفات والعلاقات والتعارضات.",
  "عرض معاينة بالأعداد الفعلية والتعارضات والإجراءات المقترحة — دون تغيير البيانات.",
  "طلب تأكيد صريح للوضع المحدد (دمج أو استبدال، بلا تحويل تلقائي).",
  "تنفيذ ذرّي: كل العملية أو لا شيء، مع تراجع كامل عند أي فشل.",
  "عرض ملخص مؤقت بالنتيجة الفعلية والتعارضات التي حُسمت.",
];

export default function BackupPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-4 py-6">
      <header className="mb-5">
        <h1 className="text-2xl font-bold">النسخ الاحتياطي والاستعادة</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          نسخة يدوية بصيغة ZIP تشمل الطلاب والدورات والتسجيلات فقط
        </p>
      </header>

      <Card className="mb-3.5">
        <CardTitle>إنشاء نسخة احتياطية</CardTitle>
        <p className="mb-3.5 mt-1 text-[13.5px] text-muted-foreground">
          تُنشأ النسخة من لقطة بيانات متسقة، ثم يُتحقق من قابلية قراءتها وبنيتها.
        </p>
        <Notice tone="warning" Icon={TriangleAlert}>
          الملف <b>غير مشفّر</b> ويحتوي بيانات شخصية. احفظه في مكان آمن ولا تشاركه مع غير المخولين. لا
          يتضمن بيانات الدخول أو الأسرار.
        </Notice>
        <Button className="mt-3.5" onClick={() => toast.info("إنشاء النسخة — سيُفعَّل عبر مكوّن خادمي موثوق")}>
          <Download /> إنشاء نسخة احتياطية الآن
        </Button>
      </Card>

      <h2 className="mb-3 mt-5 text-base font-semibold">استعادة من نسخة احتياطية</h2>
      <Notice tone="info" Icon={Info} className="mb-3.5">
        الدمج والاستبدال الكامل وضعان منفصلان تمامًا. تُعرض معاينة بالأعداد والتعارضات قبل أي تنفيذ،
        ولا تتغير أي بيانات قبل تأكيدك الصريح.
      </Notice>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <Card>
          <div className="mb-1.5 flex items-center gap-2.5">
            <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">دمج</span>
            <CardTitle>دمج آمن</CardTitle>
          </div>
          <p className="mb-3.5 text-[13.5px] text-muted-foreground">
            يضيف السجلات الجديدة ويحفظ الحالية. لا يحذف سجلًا لمجرد غيابه عن النسخة، ولا يستبدل البيانات
            المحمية تلقائيًا.
          </p>
          <Button variant="ghost" onClick={() => toast.info("اختيار ملف للدمج — لاحقًا")}>
            اختيار ملف ومعاينة
          </Button>
        </Card>

        <Card>
          <div className="mb-1.5 flex items-center gap-2.5">
            <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-[11px] font-bold text-destructive">استبدال كامل</span>
            <CardTitle>استبدال كامل</CardTitle>
          </div>
          <p className="mb-3.5 text-[13.5px] text-muted-foreground">
            يستبدل بيانات الطلاب والدورات والتسجيلات بالكامل. يتطلب نسخة أمان حديثة محقّقة وتأكيدًا صريحًا.
          </p>
          <Notice tone="danger" Icon={TriangleAlert} className="mb-3">
            عملية حساسة لا يمكن التراجع عنها بعد التأكيد.
          </Notice>
          <Button variant="danger" onClick={() => toast.warning("الاستبدال الكامل يتطلب نسخة أمان وتأكيدًا صريحًا")}>
            اختيار ملف ومعاينة
          </Button>
        </Card>
      </div>

      <Card className="mt-3.5">
        <CardTitle className="mb-3.5">مسار العملية</CardTitle>
        <ol className="flex list-none flex-col gap-2.5 p-0">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] text-muted-foreground">
              <span className="tabular grid size-[22px] shrink-0 place-items-center rounded-full bg-muted text-xs font-bold text-foreground">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Card>

      <p className="mt-7 text-center text-xs text-muted-foreground">
        نموذج أولي للعرض البصري — الأزرار لا تنفّذ أي عملية.
      </p>
    </main>
  );
}

function Notice({
  tone,
  Icon,
  className,
  children,
}: {
  tone: "warning" | "info" | "danger";
  Icon: typeof Info;
  className?: string;
  children: React.ReactNode;
}) {
  const tones = {
    warning: "bg-warning/10 text-warning border-warning/30",
    info: "bg-info/10 text-info border-info/30",
    danger: "bg-destructive/10 text-destructive border-destructive/30",
  } as const;
  return (
    <div className={`flex gap-2.5 rounded-md border px-3.5 py-3 text-[13px] leading-relaxed ${tones[tone]} ${className ?? ""}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
