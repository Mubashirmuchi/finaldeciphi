export type Image = {
  id: string;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name: string;
};

type ComponentType =
  | "layout.hero"
  | "layout.card-grid"
  | "layout.choose-us-section"
  | "layout.content-with-image"
  | "layout.price-grid"
  | "blocks.video"
  | "blocks.text"
  | "layout.service-detail-section";

interface Base<
  T extends ComponentType,
  D extends Record<string, unknown> = Record<string, unknown>,
> {
  __component: T;
  id: string;
  createdAt: string;
  updatedAt: string;
  data: D;
}

export type SubNav = {
  id: number;
  name: string;
  desc: string;
  href: string;
  icon: string;
};

export interface NavLink {
  id: number;
  href: string;
  text: string;
  isExternal: boolean;
  isPrimary: boolean;
  subnav?: SubNav[];
}

export type Block =
  | HeroProps
  | WhyChooseUsProps
  | AboutUsProps
  | ServicesProps
  | SolutionsProps
  | TextProps
  | ServiceDetailSection;

export interface HeroProps extends Base<"layout.hero"> {
  heading: string;
  text: string;
  topLink?: NavLink;
  buttonLink?: NavLink[];
  image: {
    url: string;
    alternativeText: string | null;
    name: string;
  };
  video: {
    url: string;
    alternativeText: string | null;
    name: string;
  };
}

type cta = {
  text: string;
  href: string;
  isExternal: boolean;
};

type feature = {
  id: string;
  text: string;
  icon: string;
};

export type heading = {
  id: number;
  text: string;
  highlight: boolean;
};

type cardtext = {
  id: number;
  value: string;
  label: string;
};

export interface AboutUsProps extends Base<"layout.content-with-image"> {
  label: string;
  description: string;
  indicatorlabel: string;
  heading: heading[];
  cta: cta;
  text: string;
  cardtext: cardtext[];
  feature: feature[];
  cardImage: Image;
}

export interface WhyChooseUsProps extends Base<"layout.choose-us-section"> {
  label: string;
  description: string;
  indicatorlabel: string;
  heading: heading[];
  cta: cta;
  image: Image;
  points: Point[];
}

type Paragraph = {
  id: string;
  point: string;
};

export interface ServiceDetailSection extends Base<"layout.service-detail-section"> {
  label: string;
  description: string;
  heading: heading[];
  quote: string;
  boldtext: heading[];
  points: Point[];
  paragraphs: Paragraph[];
  heading2: heading[];
  largeImage: Image;
  cardImage: Image;
  serviceCard: ServiceCard;
}

export type ServiceCard = {
  id: string;
  heading: string;
  description: string;
  icon: string;
  href: string;
  images: Image[];
};

export interface ServicesProps extends Base<"layout.price-grid"> {
  label: string;
  description: string;
  heading: heading[];
  servicecard: ServiceCard[];
}

export type Point = {
  id: string;
  point: string;
};

export type Accordian = {
  id: string;
  icon: string;
  heading: string;
  description: string;
  points: Point[];
  image: Image;
};

export interface SolutionsProps extends Base<"layout.card-grid"> {
  label: string;
  heading: heading[];
  description: string;

  accordian: Accordian[];
}

export interface VideoProps extends Base<"blocks.video"> {
  video: {
    videoId: string;
    start?: string;
    end?: string;
  };
  image?: Image;
}

export interface TextProps extends Base<"blocks.text"> {
  content: string;
}

export interface ContentWithImageProps {
  reverse?: boolean;
  image: Image;
  heading: string;
  subHeading?: string;
  text: string;
}
