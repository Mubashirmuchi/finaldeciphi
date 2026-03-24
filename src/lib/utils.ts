import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// export function mapSeoToMetadata(seo: any): Metadata {
//   if (!seo) return {};

//   return {
//     title: seo.metaTitle || undefined,
//     description: seo.metaDescription,
//     keywords: seo.keywords,

//     alternates: {
//       canonical: seo.canonicalURL,
//     },

//     openGraph: {
//       title: seo.openGraph?.["og:title"] || seo.metaTitle,
//       description: seo.openGraph?.["og:description"],
//       url: seo.openGraph?.["og:url"],
//       images: seo.metaImage?.url
//         ? [
//             {
//               url: process.env.NEXT_PUBLIC_STRAPI_URL + seo.metaImage.url,
//               width: seo.metaImage.width,
//               height: seo.metaImage.height,
//             },
//           ]
//         : [],
//     },
//   };
// }

// src/lib/utils/seo.ts

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function mapSeoToMetadata(seo: any) {
  if (!seo) return {};

  const imageUrl = seo.metaImage?.url
    ? `${STRAPI_URL}${seo.metaImage.url}`
    : undefined;

  return {
    title: seo.metaTitle ?? undefined,
    description: seo.metaDescription ?? undefined,
    keywords: seo.keywords ?? undefined,
    robots: seo.metaRobots ?? undefined,
    alternates: {
      canonical: seo.canonicalURL ?? undefined,
    },

    // Open Graph
    openGraph: seo.openGraph
      ? {
          title: seo.openGraph["og:title"] ?? seo.metaTitle ?? undefined,
          description:
            seo.openGraph["og:description"] ?? seo.metaDescription ?? undefined,
          url: seo.openGraph["og:url"] ?? undefined,
          type: (seo.openGraph["og:type"] as any) ?? "website",
          images: imageUrl
            ? [
                {
                  url: getStrapiMedia(imageUrl) ?? imageUrl,
                  width: seo.metaImage?.width ?? undefined,
                  height: seo.metaImage?.height ?? undefined,
                  alt: seo.metaImage?.alternativeText ?? seo.metaTitle ?? "",
                },
              ]
            : undefined,
        }
      : undefined,

    // Twitter card (uses same image)
    twitter: imageUrl
      ? {
          card: "summary_large_image" as const,
          title: seo.metaTitle ?? undefined,
          description: seo.metaDescription ?? undefined,
          images: [getStrapiMedia(imageUrl) ?? imageUrl],
        }
      : undefined,

    // Structured data via JSON-LD
    other: seo.structuredData
      ? {
          "script:ld+json": JSON.stringify(seo.structuredData),
        }
      : undefined,
  };
}
