import "../globals.css";

import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Locale, locales } from "@/i18n";
import { generateOrganizationSchema } from "@/lib/schema";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontHeading = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Deciphi",
    template: "%s | Deciphi",
  },
  description: "Qatar Leading Digital Cybersecurity Provider",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = (await params) as { locale: Locale };
  const schema = generateOrganizationSchema(locale);

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen antialiased",
          locale === "ar" ? "font-arabic" : "font-sans",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
