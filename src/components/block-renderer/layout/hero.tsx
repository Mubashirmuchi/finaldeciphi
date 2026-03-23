import type { HeroProps } from "@/types";

import { StrapiImage } from "@/components/custom/StrapiImage";
import BackgroundVideo from "../blocks/heroVideo";
import { getStrapiMedia } from "@/lib/utils";

export function Hero(data: Readonly<HeroProps>) {
  if (!data) return null;
  const { heading, text, image, video } = data;
  return (
    <section
      id="home"
      className="hero relative min-h-screen flex items-center justify-center w-full animate-fadeIn"
    >
      {/* Background Video with Fallback */}

      <div className="absolute inset-0 -z-10 lg:hidden">
        {image && (
          <StrapiImage
            src={getStrapiMedia(image?.url) || "/fallback-hero.jpg"}
            alt={image?.alternativeText || "Fallback hero image"}
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Video for desktop */}
      <div className="hidden lg:block">
        {/* <BackgroundVideo src={videoUrl || ""} /> */}
        {video && (
          <BackgroundVideo
            src={getStrapiMedia(video?.url || "") || ""}
            overlay={true}
            crossfadeDuration={1.8} // seconds — tune to your video
          />
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-black/70 lg:bg-black/5" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <div
          className="flex-1 flex flex-col items-center justify-center text-center
                   px-6 md:px-12 pb-20 pt-10"
        >
          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight
                     tracking-tight text-white max-w-3xl mx-auto "
          >
            {heading}
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mt-7 leading-relaxed">
            {text}
          </p>

          {/* CTA */}
          <div className="mt-10">{/* <CTAButton cta={cta} /> */}</div>
        </div>
      </div>
    </section>
  );
}
