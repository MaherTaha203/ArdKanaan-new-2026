import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import { AppShell } from "@/components/app-shell";
import { themeInitScript } from "@/components/theme-toggle";
import "./globals.css";

// اتجاه "تعبيري مع انضباط مينيمال": خط Cairo الهندسي المريح (يدعم العربية واللاتينية).
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "نظام أرض كنعان",
  description: "إدارة الطلاب والدورات والتسجيلات — واجهة عربية RTL",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
        <Toaster position="top-center" dir="rtl" richColors closeButton />
      </body>
    </html>
  );
}
