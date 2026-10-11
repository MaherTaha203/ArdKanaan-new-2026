import {
  CircleCheck,
  CirclePause,
  CircleDot,
  BadgeCheck,
  LogOut,
  CircleX,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StudentStatus, CourseStatus, EnrollmentStatus } from "@/lib/sample-data";

// الحالة تُعرض دائمًا بلون + أيقونة + نص، لا باللون وحده (DESIGN_TOKENS.md §5).

export function StudentStatusBadge({ status }: { status: StudentStatus }) {
  return status === "active" ? (
    <Badge tone="success">
      <CircleCheck /> نشط
    </Badge>
  ) : (
    <Badge tone="neutral">
      <CirclePause /> موقوف
    </Badge>
  );
}

export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  return status === "open" ? (
    <Badge tone="success">
      <CircleCheck /> مفتوحة
    </Badge>
  ) : (
    <Badge tone="neutral">
      <Lock /> مغلقة
    </Badge>
  );
}

const ENROLLMENT_META: Record<
  EnrollmentStatus,
  { tone: "primary" | "success" | "warning" | "danger"; label: string; Icon: typeof CircleDot }
> = {
  active: { tone: "primary", label: "نشط", Icon: CircleDot },
  completed: { tone: "success", label: "مكتمل", Icon: BadgeCheck },
  withdrawn: { tone: "warning", label: "منسحب", Icon: LogOut },
  cancelled: { tone: "danger", label: "ملغى", Icon: CircleX },
};

export function EnrollmentStatusBadge({ status }: { status: EnrollmentStatus }) {
  const { tone, label, Icon } = ENROLLMENT_META[status];
  return (
    <Badge tone={tone}>
      <Icon /> {label}
    </Badge>
  );
}
