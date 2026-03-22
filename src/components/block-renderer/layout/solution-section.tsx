import React from "react";
import { AccordionClient } from "@/components/custom/AccordianClient";
import OverLine from "@/components/custom/OverLine";
import HighlightHeading from "./section-heading";
import { Typography } from "@/components/ui/typography";
import type { SolutionsProps } from "@/types";
import ImagePanel from "@/components/custom/SolutionsImage";
import { getIcon, IconName } from "@/components/custom/iconMap";

function SolutionSection(data: Readonly<SolutionsProps>) {
  if (!data) return null;

  const { label, heading, description, accordian } = data;
  if (!accordian?.length) return null;

  const imagePanels: Record<string, React.ReactNode> = {};
  const descriptions: Record<string, React.ReactNode> = {};
  const icons: Record<string, React.ReactNode> = {};

  for (const item of accordian) {
    imagePanels[item.id] = <ImagePanel item={item} />;

    descriptions[item.id] = (
      <p className="pb-5 pt-1 leading-relaxed">{item.description}</p>
    );

    const Icon = getIcon(item.icon as IconName);

    icons[item.id] = Icon ? React.createElement(Icon, { size: 20 }) : null;
  }

  return (
    <section
      id="solution-section"
      className="mx-auto max-w-7xl bg-white px-4 py-20 md:px-8"
    >
      <header className="mb-14">
        <OverLine label={label} className="mb-5" />

        <HighlightHeading
          id="solutionsection"
          segments={heading}
          className="rtl:leading-relaxed"
        />

        <Typography variant="body-lg" className="mt-4 max-w-lg text-gray-600">
          {description}
        </Typography>
      </header>

      <AccordionClient
        items={accordian}
        defaultOpen="item-0"
        imagePanels={imagePanels}
        descriptions={descriptions}
        icons={icons}
      />
    </section>
  );
}

export default SolutionSection;
