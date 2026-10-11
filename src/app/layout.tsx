import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Toaster } from "sonner";
import { AppShell } from "@/components/app-shell";
import { themeInitScript } from "@/components/theme-toggle";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
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
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
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
