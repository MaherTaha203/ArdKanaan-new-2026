// بيانات توضيحية للنموذج الأولي فقط — لا تتصل بقاعدة بيانات.
// تُستبدل لاحقًا باستعلامات Supabase بعد اعتماد المخطط.

export type StudentStatus = "active" | "suspended";
export type CourseStatus = "open" | "closed";
export type EnrollmentStatus = "active" | "completed" | "withdrawn" | "cancelled";

export interface Student {
  num: string;
  name: string;
  manual: string;
  phone: string;
  activeEnrollments: number;
  status: StudentStatus;
  createdAt: string;
}

export interface Course {
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  activeEnrollments: number;
  status: CourseStatus;
}

export interface Enrollment {
  course: string;
  date: string;
  status: EnrollmentStatus;
}

export const students: Student[] = [
  { num: "ST-000101", name: "سارة محمود العلي", manual: "2041", phone: "0599-128-440", activeEnrollments: 3, status: "active", createdAt: "2025-09-14" },
  { num: "ST-000102", name: "يوسف عبد الرحمن قاسم", manual: "—", phone: "0567-903-211", activeEnrollments: 1, status: "active", createdAt: "2025-09-20" },
  { num: "ST-000103", name: "ليان خالد الحاج", manual: "2043", phone: "0598-554-872", activeEnrollments: 2, status: "active", createdAt: "2025-10-01" },
  { num: "ST-000104", name: "عمر إبراهيم نصّار", manual: "1180", phone: "0569-220-145", activeEnrollments: 0, status: "suspended", createdAt: "2024-11-30" },
  { num: "ST-000105", name: "مريم سامي درويش", manual: "—", phone: "0591-776-300", activeEnrollments: 2, status: "active", createdAt: "2025-08-05" },
  { num: "ST-000106", name: "كرم فادي الشامي", manual: "2050", phone: "0597-010-688", activeEnrollments: 1, status: "active", createdAt: "2025-10-03" },
  { num: "ST-000107", name: "رزان وليد عيسى", manual: "—", phone: "0566-434-902", activeEnrollments: 0, status: "suspended", createdAt: "2024-07-18" },
  { num: "ST-000108", name: "أحمد منير زيدان", manual: "1322", phone: "0599-845-017", activeEnrollments: 4, status: "active", createdAt: "2025-06-22" },
];

export const courses: Course[] = [
  { code: "CR-0004", name: "الرياضيات التطبيقية", startDate: "2025-04-01", endDate: "2025-10-05", activeEnrollments: 0, status: "closed" },
  { code: "CR-0007", name: "أساسيات اللغة العربية", startDate: "2025-07-10", endDate: "2025-10-28", activeEnrollments: 41, status: "open" },
  { code: "CR-0009", name: "مقدمة في البرمجة", startDate: "2025-09-01", endDate: "2026-01-15", activeEnrollments: 58, status: "open" },
  { code: "CR-0012", name: "مهارات الحاسوب", startDate: "2025-08-15", endDate: "2025-11-02", activeEnrollments: 33, status: "open" },
  { code: "CR-0015", name: "التصميم الجرافيكي", startDate: "2025-09-20", endDate: "2026-02-20", activeEnrollments: 27, status: "open" },
  { code: "CR-0003", name: "اللغة الإنجليزية — مستوى أول", startDate: "2024-02-01", endDate: "2024-06-30", activeEnrollments: 0, status: "closed" },
];

export const enrollmentsByStudent: Record<string, Enrollment[]> = {
  "ST-000101": [
    { course: "مقدمة في البرمجة — CR-0009", date: "2025-09-02", status: "active" },
    { course: "مهارات الحاسوب — CR-0012", date: "2025-08-20", status: "active" },
    { course: "اللغة الإنجليزية — مستوى أول — CR-0003", date: "2024-02-05", status: "completed" },
  ],
  "ST-000104": [{ course: "الرياضيات التطبيقية — CR-0004", date: "2025-04-03", status: "withdrawn" }],
  "ST-000108": [
    { course: "مقدمة في البرمجة — CR-0009", date: "2025-09-01", status: "active" },
    { course: "التصميم الجرافيكي — CR-0015", date: "2025-09-22", status: "active" },
    { course: "أساسيات اللغة العربية — CR-0007", date: "2025-07-12", status: "active" },
    { course: "الرياضيات التطبيقية — CR-0004", date: "2024-09-10", status: "cancelled" },
  ],
};

export const dashboardKpis = {
  activeStudents: 248,
  totalStudents: 271,
  openCourses: 12,
  totalCourses: 34,
  activeEnrollments: 419,
  endingSoon: 3,
};

export const enrollmentsTrend: { month: string; value: number }[] = [
  { month: "أيار", value: 38 },
  { month: "حزيران", value: 52 },
  { month: "تموز", value: 21 },
  { month: "آب", value: 34 },
  { month: "أيلول", value: 61 },
  { month: "تشرين الأول", value: 47 },
];

export const reviewAlerts: { name: string; meta: string; kind: "warning" | "danger" }[] = [
  { name: "أساسيات اللغة العربية — CR-0007", meta: "تنتهي 2025-10-28", kind: "warning" },
  { name: "مهارات الحاسوب — CR-0012", meta: "تنتهي 2025-11-02", kind: "warning" },
  { name: "الرياضيات التطبيقية — CR-0004", meta: "انتهت 2025-10-05 • بانتظار المراجعة", kind: "danger" },
];
