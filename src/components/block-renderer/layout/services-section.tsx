import { getIcon } from "@/components/custom/iconMap";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

function CardHeader({
  title,
  icon: Icon,
  size = "lg",
}: {
  title: string;
  icon?: IconComponent | null;
  size?: "lg" | "md";
}) {
  const words = title.split(" ");
  const midpoint = Math.ceil(words.length / 2);

  const line1 = words.slice(0, midpoint).join(" ");
  const line2 = words.slice(midpoint).join(" ");

  return (
    <div className="flex justify-between items-start pb-6 border-b-2 border-gray-100">
      <Typography
        as="h3"
        variant={size === "lg" ? "heading-lg" : "heading-md"}
        className="text-gray-900 flex-1 pr-4"
      >
        {line1}
        {line2 && (
          <>
            <br />
            {line2}
          </>
        )}
      </Typography>
      {Icon && <Icon />}
    </div>
  );
}
function ServicesCardsClient({ servicecard }: { servicecard: ServiceCard[] }) {
  return (
    <div className="relative space-y-4 sm:space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Card 0 */}

        <Link
          className="space-y-6 sm:space-y-8 h-full flex flex-col lg:col-span-2 bg-white border-2 border-gray-100 rounded-lg p-6 sm:p-8"
          href={servicecard[0]?.href || "#"}
        >
          <li>
            <div className="space-y-4">
              <CardHeader
                title={servicecard[0]?.heading ?? ""}
                icon={getIcon(servicecard[0]?.icon)}
                //IconTraining
                size="lg"
              />

              <Typography as={"p"} variant="body" className="text-gray-700">
                {servicecard[0]?.description}
              </Typography>
            </div>

            <div className="mt-auto">
              <StrapiImage
                src={servicecard[0]?.images?.[0]?.url || ""}
                alt={
                  servicecard[0]?.images?.[0]?.alternativeText ??
                  "Consulting Service"
                }
                className="h-36 object-cover"
              />
            </div>
          </li>{" "}
        </Link>

        {/* Card 1 */}

        {servicecard[1] && (
          <Link
            className="space-y-6 sm:space-y-8 h-full flex flex-col lg:col-span-3 bg-white border-2 border-gray-100 rounded-lg p-6 sm:p-8"
            href={servicecard[1]?.href || "#"}
          >
            <li>
              <div className="space-y-4">
                <CardHeader
                  title={servicecard[1]?.heading ?? ""}
                  icon={getIcon(servicecard[1]?.icon)}
                  size="lg"
                />

                <Typography as={"p"} variant="body" className="text-gray-700">
                  {servicecard[1]?.description}
                </Typography>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <div className="flex-1 overflow-hidden rounded">
                  <StrapiImage
                    src={servicecard[1]?.images?.[0]?.url || ""}
                    alt={
                      servicecard[1]?.images?.[0]?.alternativeText || "Assessment"
                    }
                    className="h-48 object-cover"
                  />
                </div>

                {servicecard[1]?.images?.[1]?.url && (
                  <div className="w-full sm:w-40 overflow-hidden rounded">
                    <StrapiImage
                      src={servicecard[1]?.images?.[1]?.url || ""}
                      alt={
                        servicecard[1]?.images?.[1]?.alternativeText ||
                        "Assessment 2"
                      }
                      className="h-48 object-cover object-bottom-right"
                    />
                  </div>
                )}
              </div>
            </li>
          </Link>
        )}
      </div>

      {servicecard[2] && (
        <Link href={servicecard[2]?.href || "#"}>
          <li className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-end bg-white border-2 border-gray-100 rounded-lg p-6 sm:p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                {(() => {
                  const Icon = getIcon(servicecard[2]?.icon);
                  return Icon ? (
                    <div className="w-fit">
                      <Icon size={28} aria-hidden="true" />
                    </div>
                  ) : null;
                })()}

                <Typography
                  as="h3"
                  variant={"heading-lg"}
                  className="text-gray-900 flex-1 pr-4"
                >
                  {servicecard[2]?.heading.split(" ")[0]}
                  <br />
                  {servicecard[2]?.heading.split(" ").slice(1).join(" ")}
                </Typography>
              </div>

              <Typography as={"p"} variant="body" className="text-gray-700">
                {servicecard[2]?.description}
              </Typography>
            </div>

            <div className="w-full">
              <StrapiImage
                src={
                  servicecard[2]?.images?.[0]?.url ||
                  servicecard[2]?.images?.[0]?.url
                }
                alt={
                  servicecard[2]?.images?.[0]?.alternativeText ||
                  "Training Service"
                }
                className="object-contain"
              />
            </div>
          </li>
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {servicecard[3] && (
          <Link href={servicecard[3]?.href || "#"}>
            <li className="space-y-6 h-full flex flex-col bg-white border-2 border-gray-100 rounded-lg p-6 ">
              <div className="space-y-4">
                <CardHeader
                  title={servicecard[3]?.heading ?? ""}
                  icon={getIcon(servicecard[3]?.icon)}
                  size="md"
                />

                <Typography as={"p"} variant="body" className="text-gray-700">
                  {servicecard[3]?.description}
                </Typography>
              </div>

              <div className="mt-auto">
                <div className="bg-linear-to-b from-red-600 to-red-800 rounded p-4">
                  <StrapiImage
                    src={
                      servicecard[3]?.images?.[0]?.url ||
                      servicecard[3]?.images?.[0]?.url
                    }
                    alt={
                      servicecard[3]?.images?.[0]?.alternativeText ||
                      "Integration Service"
                    }
                  />
                </div>
              </div>
            </li>
          </Link>
        )}

        {servicecard[4] && (
          <Link href={servicecard[4]?.href || "#"}>
            <li className="space-y-6 h-full flex flex-col bg-white border-2 border-gray-100 rounded-lg p-6">
              <div className="space-y-4">
                <CardHeader
                  title={servicecard[4]?.heading ?? ""}
                  icon={getIcon(servicecard[4]?.icon)}
                  size="md"
                />

                <Typography as={"p"} variant="body" className="text-gray-700">
                  {servicecard[4]?.description}
                </Typography>
              </div>

              <div className="mt-auto">
                <StrapiImage
                  src={
                    servicecard[4]?.images?.[0]?.url ||
                    servicecard[4]?.images?.[0]?.url
                  }
                  alt={
                    servicecard[4]?.images?.[0]?.alternativeText || "OT Service"
                  }
                  className="object-cover"
                />
              </div>
            </li>
          </Link>
        )}

        {servicecard[5] && (
          <Link href={servicecard[5]?.href || "#"}>
            <li className="space-y-6 h-full flex flex-col bg-white border-2 border-gray-100 rounded-lg p-6 md:col-span-2 lg:col-span-1">
              <div className="space-y-4">
                <CardHeader
                  title={servicecard[5]?.heading ?? ""}
                  icon={getIcon(servicecard[5]?.icon)}
                  size="md"
                />

                <Typography as={"p"} variant="body" className="text-gray-700">
                  {servicecard[5]?.description}
                </Typography>
              </div>

              <div className="mt-auto">
                <StrapiImage
                  src={servicecard[5]?.images?.[0]?.url ?? ""}
                  alt={
                    servicecard[5]?.images?.[0]?.alternativeText ??
                    "Cloud Security"
                  }
                  className="rounded object-cover"
                />
              </div>
            </li>
          </Link>
        )}
      </div>
    </div>
  );
}

import { ServiceCard, ServicesProps } from "@/types";
import HighlightHeading from "./section-heading";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { Typography } from "@/components/ui/typography";
import OverLine from "@/components/custom/OverLine";
import Link from "next/link";

export default function ServiceSection(data: Readonly<ServicesProps>) {
  if (!data) return null;
  const { heading, label, description, servicecard } = data;
  if (!servicecard?.length) return null;
  return (
    <>
      {" "}
      <section
        className="relative bg-gray-50 py-24 px-4 overflow-hidden"
        aria-labelledby="services-heading"
      >
        {/* Decorative background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle,#1a1a2e 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-14">
            {/* Overline */}

            <OverLine
              label={label}
              aria-label="services-label"
              className={"mb-6 bg-white"}
            />

            {/* Main Heading */}

            <HighlightHeading id="services-heading" segments={heading} />

            {/* Description */}

            <Typography
              variant="body-lg"
              className="text-gray-600  max-w-2xl mx-auto mt-5"
            >
              {description}
            </Typography>
          </header>

          {/* Services Grid */}
          <ul
            className="relative"
            role="list"
            aria-label="Cybersecurity services"
          >
            {ServicesCardsClient({ servicecard })}
          </ul>
        </div>
      </section>
    </>
  );
}
