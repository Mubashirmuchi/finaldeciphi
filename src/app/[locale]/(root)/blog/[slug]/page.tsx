import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { ChevronRight, ArrowLeft, Tag, Clock } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/data/loaders";
import { getStrapiMedia } from "@/components/custom/StrapiImage";
import BlockRendererClient from "@/components/custom/markdown-text";
import ShareButtons from "@/components/custom/shareButton";
import { formatDate } from "@/lib/utils";

const BASE_URL = "https://yourdomain.com";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

type RelatedPost = {
  slug: string;
  title: string;
  image: { url: string; alt: string };
  publishedAt: string;
};

async function getPost(slug: string, locale: string) {
  const { isEnabled } = await draftMode();
  const status = isEnabled ? "draft" : "published";
  const data = await getBlogPostBySlug(slug, status, locale);
  return data?.data[0] ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);
  if (!post) return {};

  const imageUrl = post.image?.url
    ? (getStrapiMedia(post.image.url) ?? undefined)
    : undefined;

  return {
    title: `${post.title}`,
    description: post.description ?? "",
    alternates: { canonical: `${BASE_URL}/${locale}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description ?? "",
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? "",
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);

  if (!post) notFound();

  const relatedPosts = (await getBlogPosts({
    page: 1,
    queryString: "",
    category: post.category?.text ?? "",
    slug,
    locale,
  })) as unknown as RelatedPost[];

  const isAr = locale === "ar";

  return (
    <section>
      <article className="relative h-[50vh] min-h-80 md:h-[60vh] w-full overflow-hidden">
        {post.image && (
          <Image
            alt={post.title}
            src={getStrapiMedia(post.image.url) || post.image.url}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-8 md:pb-12 text-white">
            {post.category && (
              <span className="inline-block mb-3 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold uppercase tracking-widest rounded-full">
                {post.category.text}
              </span>
            )}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 max-w-3xl leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Clock className="size-3.5" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, locale)}
              </time>
            </div>
          </div>
        </div>
      </article>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-gray-500 py-3 overflow-x-auto whitespace-nowrap"
          >
            <Link
              href={`/${locale}`}
              className="hover:text-gray-800 transition-colors shrink-0"
            >
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight className="size-3.5 shrink-0 rtl:rotate-180" />
            <Link
              href={`/${locale}/blog`}
              className="hover:text-gray-800 transition-colors shrink-0"
            >
              {isAr ? "المدونة" : "Blog"}
            </Link>
            <ChevronRight className="size-3.5 shrink-0 rtl:rotate-180" />
            <span className="text-gray-800 font-medium truncate">
              {post.title}
            </span>
          </nav>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-8">
          <main className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 lg:p-10 min-w-0">
            {post.content && (
              <div className="prose prose-gray prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-code:text-sm prose-pre:rounded-lg">
                <BlockRendererClient content={post.content} />
              </div>
            )}

            {post.category && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="size-4 text-gray-400" />
                  <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm rounded-full cursor-default">
                    #{post.category.text}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                {isAr ? "شارك هذا المقال" : "Share this article"}
              </p>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </main>

          <aside className="flex flex-col gap-5">
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  {isAr ? "مقالات ذات صلة" : "Related Articles"}
                </h3>
                <div className="flex flex-col gap-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/${locale}/blog/${relatedPost.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <div className="relative w-18 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image
                          src={
                            getStrapiMedia(relatedPost.image?.url) ||
                            "/placeholder.png"
                          }
                          alt={relatedPost.image?.alt || relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(relatedPost.publishedAt, locale)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={`/${locale}/blog`}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[linear-gradient(113deg,#ac1b1b_0%,#721212_50%,#460a0a_100%)] hover:bg-[linear-gradient(113deg,#c62828_0%,#8b1c1c_50%,#5a0d0d_100%)] active:scale-[0.98] transition-all text-white text-sm font-medium rounded-xl shadow-sm"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" />
              {isAr ? "العودة إلى المدونة" : "Back to Blog"}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
