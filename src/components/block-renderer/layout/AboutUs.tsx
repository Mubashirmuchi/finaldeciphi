import HighlightHeading from "./section-heading";
import { AboutUsProps } from "@/types";

import { Typography } from "@/components/ui/typography";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { getIcon, IconName } from "@/components/custom/iconMap";
import OverLine from "@/components/custom/OverLine";

export default function AboutSection({ ...data }: Readonly<AboutUsProps>) {
  if (!data) return null;

  const {
    label,
    cardtext,
    description,
    feature,
    heading,
    indicatorlabel,
    cardImage,
  } = data;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white py-20 lg:py-28 px-5 md:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* IMAGE / MEDIA */}
        <figure className="relative rounded-xl overflow-hidden h-130 shadow-2xl shadow-black/15">
          <StrapiImage
            src={cardImage?.url ?? "/placeholder.jpg"}
            alt={
              cardImage?.alternativeText ?? "Cybersecurity monitoring dashboard"
            }
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* stats */}
          <figcaption className="absolute bottom-0 left-0 right-0 px-8 pb-8 text-white">
            <div className="border-t border-white/10 mb-5" />

            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
              {cardtext.map((stat, i) => (
                <div key={i}>
                  <dt className="sr-only">{stat.label}</dt>

                  <dd className="text-2xl font-bold leading-none text-white/20">
                    {stat.value}
                  </dd>

                  <Typography variant="caption" className="text-white/40">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </dl>
          </figcaption>

          {/* status badge */}
          <div
            className="absolute bottom-8 right-6 flex items-center gap-2
            bg-white rounded-full px-4 py-2 shadow-xl"
            aria-label={indicatorlabel}
          >
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
              {indicatorlabel}
            </span>
          </div>
        </figure>

        {/* TEXT CONTENT */}
        <div className="flex flex-col gap-6">
          {/* overline */}

          <OverLine label={label} aria-label="about-label" />
          {/* heading */}
          <header>
            <HighlightHeading
              id="about-heading"
              segments={heading}
              className="rtl:leading-relaxed"
            />
          </header>

          {/* description */}

          <Typography variant="body-lg" className="text-gray-600 max-w-lg">
            {description}
          </Typography>

          {/* features */}
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 pt-1">
            {feature?.map((f) => {
              const Icon = getIcon(f.icon as IconName);

              return (
                <li
                  key={f.id}
                  className="flex items-center gap-3 border border-gray-200 rounded-md px-4 py-2"
                >
                  {Icon && (
                    <Icon
                      size={20}
                      className="text-gray-400"
                      aria-hidden="true"
                    />
                  )}

                  <Typography
                    variant="body-sm"
                    className="text-gray-700 font-medium"
                  >
                    {f.text}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
