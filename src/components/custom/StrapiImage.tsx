import Image from "next/image";

function resolveSrc(src?: string) {
  if (!src) return null;
  if (src.startsWith("data:") || src.startsWith("http") || src.startsWith("//"))
    return src;
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  return `${base}${src}`;
}

export function StrapiImage({
  src,
  alt,
  className,
  priority = false,
  width = 800,
  height = 450,
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const resolved = resolveSrc(src);
  if (!resolved) return null;
  return (
    // <Image
    //   width={800}
    //   height={450}
    //   src={resolved}
    //   alt={alt}
    //   className={`w-full rounded ${className ?? ""}`}
    //   priority={priority}
    //   sizes="(max-width:768px) 100vw, 800px"
    // />
    <Image
      src={resolved}
      alt={alt}
      priority={priority}
      height={height}
      width={width}
      sizes="(max-width:768px) 100vw, 800px"
      className={`object-cover ${className ?? ""}`}
    />
  );
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
