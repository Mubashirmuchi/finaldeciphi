import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getAllPagesSlugs, getPageBySlug } from "@/data/loaders";
import { BlockRenderer } from "@/components/block-renderer";
import NotFoundPage from "@/app/[locale]/not-found";

const BASE_URL = "https://yourdomain.com";

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export async function generateStaticParams() {
  const pages = await getAllPagesSlugs();
  return (pages.data as unknown as { slug: string }[]).map((page) => ({
    slug: page.slug.split("/").filter(Boolean),
  }));
}

async function getPage(slug: string[], locale: string) {
  const { isEnabled } = await draftMode();
  const status = isEnabled ? "draft" : "published";
  const last = slug.at(-1) ?? "";
  const data = await getPageBySlug(last, status, locale);
  return data?.data?.[0] ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const page = await getPage(slug, locale);

  const block = page?.blocks?.find(
    (b: { __component: string }) =>
      b.__component === "layout.service-detail-section",
  );

  const last = slug.at(-1) ?? "";

  const fallbackTitle = last.charAt(0).toUpperCase() + last.slice(1);

  const headingText =
    typeof block?.heading === "string"
      ? block.heading
      : (block?.heading?.[0]?.children?.[0]?.text ?? fallbackTitle);

  const formattedSlug = slug
    .map((s) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    )
    .join("/");

  const url = `${BASE_URL}/${locale}/${formattedSlug}`;

  return {
    title: `${headingText}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${headingText} | Deciphi`,
      url,
      type: "website",
    },
  };
}

export default async function PageBySlugRoute({ params }: PageProps) {
  const { slug, locale } = await params;
  const page = await getPage(slug, locale);
  const blocks = page?.blocks;

  if (!blocks) return <NotFoundPage />;
  return <BlockRenderer blocks={blocks} />;
}
