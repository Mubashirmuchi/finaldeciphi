import { getLandingPage } from "@/data/loaders";
import { BlockRenderer } from "@/components/block-renderer";
import { mapSeoToMetadata } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ FIX

  const data = await getLandingPage(locale);

  const seo = data?.data?.seo;
  return mapSeoToMetadata(seo);
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const data = await getLandingPage(locale);
  const blocks = data?.data?.blocks;
  const { structuredData } = data?.data?.seo ?? {};
  if (!blocks) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <p>Content is temporarily unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      <BlockRenderer blocks={blocks} />
    </div>
  );
}
