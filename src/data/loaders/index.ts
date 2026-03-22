import sdk from "@/lib/sdk";

const PAGE_SIZE = 4;

export async function getGlobalPageData(locale: string) {
  const landingPage = await sdk.single("global").find({
    locale,
    populate: {
      topNav: {
        populate: {
          navItems: {
            populate: {
              subnav: {
                populate: "*",
              },
            },
          },
          logo: true,
        },
      },
      footer: {
        populate: {
          logo: {
            fields: ["url", "alternativeText", "name"],
          },
          Explore: true,
          Services: true,
          heading: true,
          cta: true,
        },
      },
      seo: {
        populate: "*",
      },
    },
  });
  return landingPage;
}

export async function getLandingPage(locale: string) {
  let landingPage;
  try {
    landingPage = await sdk.single("landing-page").find({
      locale,
      populate: {
        blocks: {
          on: {
            "layout.hero": {
              populate: {
                image: {
                  fields: ["url", "alternativeText", "name"],
                },
                video: {
                  fields: ["url", "alternativeText", "name"],
                },
                buttonLink: {
                  populate: "*",
                },
              },
            },

            "layout.content-with-image": {
              populate: {
                cardImage: {
                  fields: ["url", "alternativeText", "name"],
                },
                heading: true,
                cta: true,
                cardtext: true,
                feature: true,
              },
            },

            "layout.price-grid": {
              populate: {
                heading: true,
                servicecard: {
                  populate: {
                    images: {
                      fields: ["url", "alternativeText", "name"],
                    },
                  },
                },
              },
            },
            "layout.card-grid": {
              populate: {
                heading: true,
                accordian: {
                  populate: {
                    points: true,
                    image: {
                      fields: ["url", "alternativeText", "name"],
                    },
                  },
                },
              },
            },
            "layout.choose-us-section": {
              populate: {
                image: { fields: ["url", "alternativeText", "name"] },
                points: true,
                heading: true,
                cta: true,
              },
            },
            "shared.seo": {
              populate: "*",
            },
          },
        },
        seo: {
          populate: "*",
        },
      },
    });
  } catch (error) {
    console.error("[getLandingPage] Failed to fetch landing page:", error);
    return null;
  }
  return landingPage;
}
export async function getAllPagesSlugs() {
  const pages = await sdk.collection("pages").find({
    fields: ["slug"],
  });
  return pages;
}

export async function getPageBySlug(
  slug: string,
  status: string,
  locale: string,
) {
  const page = await sdk.collection("pages").find({
    locale,
    populate: {
      blocks: {
        on: {
          "layout.service-detail-section": {
            populate: {
              heading: true,
              boldtext: true,
              largeImage: {
                fields: ["url", "alternativeText", "name"],
              },
              points: true,
              paragraphs: true,
              heading2: true,
              cardImage: {
                fields: ["url", "alternativeText", "name"],
              },
              serviceCard: true,
            },
          },
        },
      },
    },
    filters: {
      slug: slug,
    },
    status: status as "draft" | "published" | undefined,
  });
  return page;
}

export async function getCategories(locale: string) {
  const categories = await sdk.collection("categories").find({
    locale,
    fields: ["text", "description"],
  });
  return categories;
}

export async function getBlogPostBySlug(
  slug: string,
  status: string,
  locale: string,
) {
  const post = await sdk.collection("posts").find({
    locale,
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["text"],
      },
      blocks: {
        on: {
          "blocks.video": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "blocks.text": {
            populate: "*",
          },
        },
      },
    },
    filters: {
      slug: { $eq: slug },
    },
    status: status as "draft" | "published" | undefined,
  });
  return post;
}

// export async function getBlogPosts(
//   page: number = 1,
//   queryString?: string,
//   category?: string,
//   slug?: string,
//   locale: string,
// ) {
//   const filters: Record<string, unknown> = {};

//   if (queryString) {
//     filters.$or = [
//       { title: { $containsi: queryString } },
//       { description: { $containsi: queryString } },
//       { category: { text: { $containsi: queryString } } },
//     ];
//   }

//   if (category) {
//     filters.category = {
//       text: { $eqi: category },
//     };
//   }

//   if (slug) {
//     filters.slug = { $ne: slug };
//   }

//   const posts = await sdk.collection("posts").find({
//     filters,
//     pagination: slug ? { page: 1, pageSize: 2 } : { page, pageSize: PAGE_SIZE },
//     fields: ["title", "description", "slug", "publishedAt", "updatedAt"],
//     populate: {
//       image: {
//         fields: ["url", "alternativeText", "name"],
//       },
//       category: {
//         fields: ["text"],
//       },
//     },
//     sort: ["createdAt:desc"],
//   });

//   // Fallback: if filtering by slug yields no related posts, return latest posts instead
//   if (slug && (!posts?.data || posts.data.length === 0)) {
//     return await sdk
//       .collection("posts")
//       .find({
//         pagination: { page: 1, pageSize: 2 },
//         fields: ["title", "description", "slug", "publishedAt"],
//         populate: {
//           image: { fields: ["url", "alternativeText", "name"] },
//           category: { fields: ["text"] },
//         },
//         sort: ["createdAt:desc"],
//       })
//       .then((res) => res?.data ?? []);
//   }

//   return slug ? (posts?.data ?? []) : posts;
// }
type BlogParams = {
  page?: number;
  queryString?: string;
  category?: string;
  slug?: string;
  locale: string;
};

export async function getBlogPosts({
  page = 1,
  queryString,
  category,
  slug,
  locale,
}: BlogParams) {
  const filters: Record<string, unknown> = {};

  if (queryString) {
    filters.$or = [
      { title: { $containsi: queryString } },
      { description: { $containsi: queryString } },
      { category: { text: { $containsi: queryString } } },
    ];
  }

  if (category) {
    filters.category = {
      text: { $eqi: category },
    };
  }

  if (slug) {
    filters.slug = { $ne: slug };
  }

  const query = {
    locale, // ✅ key fix
    filters,
    pagination: slug ? { page: 1, pageSize: 2 } : { page, pageSize: PAGE_SIZE },
    fields: ["title", "description", "slug", "publishedAt", "updatedAt"],
    populate: {
      image: { fields: ["url", "alternativeText", "name"] },
      category: { fields: ["text"] },
    },
    sort: ["createdAt:desc"],
  };

  const posts = await sdk.collection("posts").find(query);

  // ✅ pagination fallback
  if (!slug && posts?.data?.length === 0 && page > 1) {
    return await sdk.collection("posts").find({
      ...query,
      pagination: { page: 1, pageSize: PAGE_SIZE },
    });
  }

  return slug ? (posts?.data ?? []) : posts;
}
