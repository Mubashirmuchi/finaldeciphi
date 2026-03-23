// // import { MetadataRoute } from "next";
// // import { getBlogPosts } from "@/data/loaders";

// // const BASE_URL = "https://yourdomain.com";
// // const locales = ["en", "ar"];

// // export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
// //   const posts = (await getBlogPosts({
// //     page: 1,
// //     queryString: "",
// //     category: "",
// //     slug: "",
// //     locale: "en",
// //   })) as unknown as { slug: string; updatedAt: string }[];
// //   const services = [
// //     { slug: "consulting", updatedAt: "2024-06-01" },
// //     { slug: "ot", updatedAt: "2024-06-01" },
// //     { slug: "cloud", updatedAt: "2024-06-01" },
// //   ];

// //   const blogEntries = posts.flatMap((post) =>
// //     locales.map((locale) => ({
// //       url: `${BASE_URL}/${locale}/blog/${post.slug}`,
// //       lastModified: new Date(post.updatedAt),
// //       changeFrequency: "weekly" as const,
// //       priority: 0.7,
// //     })),
// //   );

// //   return [
// //     {
// //       url: BASE_URL,
// //       lastModified: new Date(),
// //       changeFrequency: "yearly",
// //       priority: 1,
// //     },

// //     ...locales.map((locale) => ({
// //       url: `${BASE_URL}/${locale}`,
// //       lastModified: new Date(),
// //       changeFrequency: "monthly" as const,
// //       priority: 0.9,
// //     })),
// //     ...locales.map((locale) => ({
// //       url: `${BASE_URL}/${locale}/blog`,
// //       lastModified: new Date(),
// //       changeFrequency: "weekly" as const,
// //       priority: 0.8,
// //     })),
// //     ...blogEntries,
// //   ];
// // }

// import { MetadataRoute } from "next";
// import { getBlogPosts } from "@/data/loaders";

// const BASE_URL = "https://yourdomain.com";
// const locales = ["en", "ar"];

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const posts = (await getBlogPosts({
//     page: 1,
//     queryString: "",
//     category: "",
//     slug: "",
//     locale: "en",
//   })) as unknown as { slug: string; updatedAt: string }[];

//   const services = [
//     { slug: "consulting", updatedAt: "2024-06-01" },
//     { slug: "ot", updatedAt: "2024-06-01" },
//     { slug: "cloud", updatedAt: "2024-06-01" },
//   ];

//   // ✅ Blog URLs
//   const blogEntries = posts.flatMap((post) =>
//     locales.map((locale) => ({
//       url: `${BASE_URL}/${locale}/blog/${post.slug}`,
//       lastModified: new Date(post.updatedAt),
//       changeFrequency: "weekly" as const,
//       priority: 0.7,
//     })),
//   );

//   // ✅ Service URLs
//   const serviceEntries = services.flatMap((service) =>
//     locales.map((locale) => ({
//       url: `${BASE_URL}/${locale}/service/${service.slug}`,
//       lastModified: new Date(service.updatedAt),
//       changeFrequency: "monthly" as const,
//       priority: 0.8,
//     })),
//   );

//   return [
//     {
//       url: BASE_URL,
//       lastModified: new Date(),
//       changeFrequency: "yearly",
//       priority: 1,
//     },

//     // locales homepage
//     ...locales.map((locale) => ({
//       url: `${BASE_URL}/${locale}`,
//       lastModified: new Date(),
//       changeFrequency: "monthly" as const,
//       priority: 0.9,
//     })),

//     // blog listing
//     ...locales.map((locale) => ({
//       url: `${BASE_URL}/${locale}/blog`,
//       lastModified: new Date(),
//       changeFrequency: "weekly" as const,
//       priority: 0.8,
//     })),

//     // ✅ service listing page
//     ...locales.map((locale) => ({
//       url: `${BASE_URL}/${locale}/service`,
//       lastModified: new Date(),
//       changeFrequency: "monthly" as const,
//       priority: 0.85,
//     })),

//     // dynamic entries
//     ...blogEntries,
//     ...serviceEntries, // 👈 THIS WAS MISSING
//   ];
// }

import { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/loaders";

const BASE_URL = "https://yourdomain.com";
const locales = ["en", "ar"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: string }[] = [];

  try {
    const res = await getBlogPosts({
      page: 1,
      queryString: "",
      category: "",
      slug: "",
      locale: "en",
    });

    // ✅ SAFETY CHECK
    posts = Array.isArray(res) ? res : (res as any)?.data || [];
  } catch (e) {
    console.error("Sitemap fetch error:", e);
    posts = [];
  }

  const services = [
    { slug: "consulting", updatedAt: "2024-06-01" },
    { slug: "ot", updatedAt: "2024-06-01" },
    { slug: "cloud", updatedAt: "2024-06-01" },
  ];

  // ✅ Blog URLs (safe)
  const blogEntries = (Array.isArray(posts) ? posts : []).flatMap((post) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  // ✅ Service URLs
  const serviceEntries = services.flatMap((service) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/service/${service.slug}`,
      lastModified: new Date(service.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },

    ...locales.map((locale) => ({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    ...locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/service`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),

    ...blogEntries,
    ...serviceEntries,
  ];
}
