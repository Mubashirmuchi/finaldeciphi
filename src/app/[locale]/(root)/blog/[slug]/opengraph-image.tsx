import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/data/loaders";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string; locale: string } }) {
  const data = await getBlogPostBySlug(params.slug, "published", params.locale);
  const post = data?.data?.[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 18, opacity: 0.6, marginBottom: 16 }}>Deciphi</div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2 }}>
          {post?.title ?? "Blog"}
        </div>
      </div>
    ),
    { ...size }
  );
}
