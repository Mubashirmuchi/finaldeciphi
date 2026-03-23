import OverLine from "@/components/custom/OverLine";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { WhyChooseUsProps } from "@/types";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import HighlightHeading from "./section-heading";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { cn } from "@/lib/utils";

function WhyChooseUsSection({ ...data }: Readonly<WhyChooseUsProps>) {
  const { label, description, heading, cta, image, points } = data;
  const positions = [
    { top: "top-6", x: "left-6 rtl:left-auto rtl:right-6" },
    { top: "top-24", x: "left-12 rtl:left-auto rtl:right-12" },
    { top: "top-40", x: "left-20 rtl:left-auto rtl:right-20" },
  ];
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="bg-[#FAFAFA]  py-18 lg:py-24 px-5 md:px-8 lg:px-12 "
    >
      <div className="max-w-7xl mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* IMAGE */}
        <figure className="order-1 lg:order-2 relative rounded-xl overflow-hidden h-130 shadow-2xl shadow-black/15">
          <StrapiImage
            src={image?.url ?? "/placeholder.jpg"}
            alt={image?.alternativeText ?? "Cybersecurity dashboard"}
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Points */}
          <ul aria-label="Key benefits" className="absolute inset-0">
            {points.map((point, index) => (
              <li
                key={point.id}
                className={cn(
                  "absolute bg-white/95 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg border border-gray-200/60 flex items-center gap-2.5 text-sm font-medium text-gray-800",
                  positions[index]?.top,
                  positions[index]?.x,
                )}
              >
                <Check
                  className="w-5 h-5 text-emerald-500"
                  aria-hidden="true"
                />
                <span>{point.point}</span>
              </li>
            ))}
          </ul>
        </figure>

        {/* TEXT */}
        <div className="order-2 lg:order-1 flex flex-col gap-6">
          <OverLine label={label} />

          <header>
            <HighlightHeading
              id="about-heading"
              segments={heading}
              className="rtl:leading-relaxed"
            />
          </header>

          <Typography variant="body-lg" className="text-gray-600 max-w-lg">
            {description}
          </Typography>

          <div>
            <Button variant="cta" size="lg" asChild>
              <Link
                href={cta.href}
                target={cta.isExternal ? "_blank" : "_self"}
                rel={cta.isExternal ? "noopener noreferrer" : undefined}
              >
                {cta.text}
                <ChevronRight className="transition-transform rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
