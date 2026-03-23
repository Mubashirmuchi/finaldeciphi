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

export function mapSeoToMetadata(seo: any): Metadata {
  if (!seo) return {};

  return {
    title: seo.metaTitle || undefined,
    description: seo.metaDescription,
    keywords: seo.keywords,

    alternates: {
      canonical: seo.canonicalURL,
    },

    openGraph: {
      title: seo.openGraph?.["og:title"] || seo.metaTitle,
      description: seo.openGraph?.["og:description"],
      url: seo.openGraph?.["og:url"],
      images: seo.metaImage?.url
        ? [
            {
              url: process.env.NEXT_PUBLIC_STRAPI_URL + seo.metaImage.url,
              width: seo.metaImage.width,
              height: seo.metaImage.height,
            },
          ]
        : [],
    },
  };
}
