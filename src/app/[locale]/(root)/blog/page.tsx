import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/data/loaders";
import { formatDate, getStrapiMedia } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaginationComponent } from "@/components/custom/pagination";
import { CategorySelect } from "@/components/custom/category-select";
import { Search } from "@/components/custom/search";
import HighlightHeading from "@/components/block-renderer/layout/section-heading";
import LoadingPage from "../../loading";

const BASE_URL = "https://yourdomain.com";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; query?: string; category?: string }>;
}

export interface PostProps {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  image: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    name: string;
  };
  category: {
    id: number;
    documentId: string;
    text: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr ? "المدونة | ديسيفي" : "Blog";
  const description = isAr
    ? "أحدث المقالات والاتجاهات في مجال الأمن السيبراني"
    : "The latest trends, events and articles in Cyber Security";

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${locale}/blog` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { page, query = "", category = "" } = await searchParams;
  const currentPage = Number(page) || 1;

  const res = await getBlogPosts({
    page: currentPage,
    queryString: query,
    category,
    slug: "",
    locale,
  });
  const { data: posts, meta } = res as unknown as {
    data: PostProps[];
    meta: { pagination: { pageCount: number; total: number } };
  };

  const pageCount = meta?.pagination?.pageCount ?? 0;
  const total = meta?.pagination?.total ?? 0;
  const isAr = locale === "ar";

  const segments = isAr
    ? [
        {
          text: "أحدث الاتجاهات والأحداث والمقالات",
          highlight: false,
          break: true,
        },
        { text: "في مجال الأمن السيبراني.", highlight: true },
      ]
    : [
        {
          text: "The latest Trends, Events and Articles",
          highlight: false,
          break: true,
        },
        { text: "in Cyber Security.", highlight: true },
      ];

  return (
    <section>
      <div className="flex flex-col gap-8 w-full items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pb-5 md:pt-40 pt-40">
        <Button variant="outline" className="border border-black/10 bg-white">
          <div className="bg-green-600 w-2 h-2 rounded-full mr-2" />
          {isAr ? "المدونات" : "BLOGS"}
        </Button>

        <HighlightHeading
          id="blog-heading"
          segments={segments}
          className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-rethink font-medium text-gray-900 rtl:leading-relaxed rtl:max-w-5xl"
        />

        <p className="text-center text-base sm:text-lg font-arial leading-relaxed text-gray-600 max-w-2xl">
          {isAr
            ? "احصل على إرشاد استراتيجي ومحترف لبناء وتطوير برنامج أمني مرن يناسب أهدافك."
            : "Get strategic, expert-driven guidance to build and scale a resilient security program that fits your goals."}
        </p>

        <CategorySelect locale={locale} />
        <Search locale={locale} />

        <Suspense fallback={<LoadingPage />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {posts?.map((item) => (
              <Link href={`/${locale}/blog/${item.slug}`} key={item.documentId}>
                <Card className="h-full shadow-lg border-none group cursor-pointer transition-all duration-300 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col items-start gap-5 px-0">
                    {item.image && (
                      <div className="relative h-52 w-full">
                        <Image
                          src={
                            getStrapiMedia(item.image.url) || "/placeholder.jpg"
                          }
                          alt={item.image.alternativeText || item.title}
                          fill
                          className="object-cover rounded-t-lg"
                          loading="lazy"
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-4 px-5">
                      <h4 className="text-lg font-semibold transition-colors duration-300 group-hover:text-blue-600 group-hover:underline">
                        {item.title}
                      </h4>
                      <p className="mb-auto text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 justify-between">
                        <span className="rounded-full outline-1 outline-primary text-primary px-3 py-0.5 text-sm">
                          {item.category?.text}
                        </span>
                        <span className="text-sm text-muted-foreground rtl:text-left">
                          {formatDate(item.publishedAt, locale)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Suspense>

        {total > 4 && <PaginationComponent pageCount={pageCount} />}
      </div>
    </section>
  );
}
