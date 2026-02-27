import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "مكتبة الروايات الفضائية",
  description: "عرض رواياتي الفاخرة للقراء",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e0b36_0%,_transparent_70%)] opacity-30"></div>
        </div>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
