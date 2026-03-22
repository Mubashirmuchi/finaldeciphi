import type { Block } from "@/types";

import { Hero } from "@/components/block-renderer/layout/hero";
import AboutSection from "./layout/AboutUs";
import ServiceSection from "./layout/services-section";
import SolutionSection from "./layout/solution-section";
import WhyChoosUsSection from "./layout/why-choose-us";
import ServiceDetailSection from "./layout/service-detail-section";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={index} {...block} />;
    case "layout.choose-us-section":
      return <WhyChoosUsSection key={index} {...block} />;
    case "layout.content-with-image":
      return <AboutSection key={index} {...block} />;
    case "layout.price-grid":
      return <ServiceSection key={index} {...block} />;
    case "layout.card-grid":
      return <SolutionSection key={index} {...block} />;

    case "layout.service-detail-section":
      return <ServiceDetailSection key={index} {...block} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
