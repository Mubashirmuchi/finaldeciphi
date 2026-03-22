import { notFound } from "next/navigation";
import { Footer, Navigation } from "@/components/layout";
import { getGlobalPageData } from "@/data/loaders";
import { mapSeoToMetadata } from "@/lib/utils";

// app/[locale]/layout.tsx

export async function generateMetadata(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  const data = await getGlobalPageData(locale);

  return mapSeoToMetadata(data?.data?.seo);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const data = await getGlobalPageData(locale);
  if (!data) notFound();

  const { topNav, footer } = data.data;

  return (
    <div>
      <Navigation data={topNav} locale={locale} />
      <div dir={locale === "ar" ? "rtl" : "ltr"}> {children}</div>
      <Footer data={footer} dir={locale === "ar" ? "rtl" : "ltr"} />
    </div>
  );
}
