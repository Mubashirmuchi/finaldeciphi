import OverLine from "@/components/custom/OverLine";
import { StrapiImage } from "@/components/custom/StrapiImage";
import {
  Point,
  SubNav,
  ServiceDetailSection as TServiceDetailSection,
} from "@/types";
import HighlightHeading from "./section-heading";
import { Typography } from "@/components/ui/typography";
import { getIcon, IconName } from "@/components/custom/iconMap";

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <span className="inline-flex w-10 h-10 rounded-xl bg-red-50 items-center justify-center text-[#C0392B] mb-4">
        {icon}
      </span>
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ServiceDetailSection(data: Readonly<TServiceDetailSection>) {
  if (!data) return null;

  const {
    label,
    heading,
    description,
    quote,
    largeImage,
    cardImage,
    paragraphs,
    points,
    boldtext,
    heading2,
    serviceCard,
  } = data;

  const cards = Array.isArray(serviceCard) ? serviceCard : [];

  const mid = Math.ceil(cards.length / 2);
  const leftCards = cards.slice(0, mid);
  const rightCards = cards.slice(mid);

  const renderCard = (c: SubNav) => {
    const Icon = getIcon(c.icon as IconName);
    return (
      <FeatureCard
        key={c.id}
        icon={
          Icon ? <Icon /> : <span className="w-4 h-4 bg-gray-300 rounded" />
        }
        title={c.name}
        desc={c.desc}
      />
    );
  };
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-[#F7F6F2] pt-26 pb-0 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <header className="mb-14">
            <OverLine label={label} className="my-6 bg-white" />

            <HighlightHeading
              id=""
              segments={heading}
              className="max-w-5xl text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.3] tracking-tight text-gray-900 mb-4"
            />

            <Typography className="mt-4 max-w-lg mx-auto text-gray-600">
              {description}
            </Typography>
          </header>
        </div>

        {/* Image + Quote */}
        <div className="relative max-w-7xl mx-auto mt-16">
          <div className="relative z-10 mx-6 -mb-8">
            <div className="bg-white rounded-2xl shadow-xl px-8 pt-6 pb-8 border border-gray-100">
              <p className="text-gray-800 text-base md:text-lg font-medium max-w-lg">
                <span className="text-blue-700 text-3xl md:text-4xl align-top leading-none mr-1">
                  &ldquo;
                </span>

                {quote}

                <span className="text-blue-700 text-3xl md:text-4xl align-bottom leading-none ml-1">
                  &rdquo;
                </span>
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <div className="overflow-hidden rounded-3xl h-[420px] md:h-[540px]">
              <StrapiImage
                src={largeImage?.url}
                alt={largeImage?.alternativeText || "Service image"}
                className="w-full h-[115%] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="bg-[#F5F4F0] py-24 px-6 md:px-12  mx-auto">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <HighlightHeading
              segments={boldtext}
              id="service-detailpage"
              className="text-[3.5rem] font-extrabold mb-10 max-w-sm"
            />

            <ul className="flex flex-col gap-3">
              {points?.map((item: Point) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    ✓
                  </span>
                  <span className="text-sm text-gray-600">{item.point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-10">
            {paragraphs?.map((p: Point) => (
              <p key={p.id} className="text-gray-600">
                {p.point}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="bg-white py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <HighlightHeading
            id="boldtext"
            segments={heading2}
            className="text-4xl md:text-5xl font-bold mb-6 max-w-5xl mx-auto"
          />
          <p className="text-gray-500 max-w-xl mx-auto">{description}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6">
          {/* Left */}
          <div className="flex flex-col gap-4">{leftCards.map(renderCard)}</div>

          {/* Center */}
          <div className="hidden lg:block w-[320px] rounded-2xl overflow-hidden">
            <StrapiImage
              src={cardImage?.url}
              alt={cardImage?.alternativeText || "Service image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {rightCards.map(renderCard)}
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetailSection;
