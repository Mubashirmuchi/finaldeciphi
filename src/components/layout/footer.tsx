import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import AbstractLines from "./Wave";
import type { heading, Image as ImageType } from "@/types";
import { StrapiImage } from "../custom/StrapiImage";

interface TLink {
  id: string;
  href: string;
  text: string;
  isExternal: boolean;
  isPrimary: boolean;
}

interface FooterProps {
  data: {
    tagline: string;
    phone: number;
    mail: string;
    logo: ImageType;
    Explore: TLink[];
    Services: TLink[];
    heading: heading[];
    cta: TLink;
    socialLinks: TLink[];
  };
  dir: string;
}

const Footer = ({ data, dir }: FooterProps) => {
  if (!data) return null;

  const { logo, Explore, Services, heading, cta, tagline } = data;
  return (
    <footer className="w-full bg-[#FAFAFA]">
      <section
        aria-labelledby="cta-heading"
        className="w-full px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-[#b02123] px-6 sm:px-8 lg:px-12 py-12 lg:py-16 text-center">
            <AbstractLines />

            {/* Content */}
            <header className="relative z-10 text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-rethink text-white leading-tight max-w-4xl mx-auto">
                {heading.map((item: heading, index: number) => (
                  <React.Fragment key={item.id}>
                    {item.highlight ? (
                      <span className="border-b-4 border-[#E85744] pb-1">
                        {item.text}
                      </span>
                    ) : (
                      item.text
                    )}
                    {index !== heading.length - 1 && " "}
                  </React.Fragment>
                ))}
              </h1>
            </header>
            <div className="relative z-10 mt-6">
              {cta?.href ? (
                <Button
                  className="bg-white! text-black"
                  variant="ghost"
                  size="lg"
                  asChild
                >
                  <Link
                    href={cta.href}
                    target={cta.isExternal ? "_blank" : "_self"}
                    rel={cta.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {cta.text}
                    <ChevronRight className="transition-transform rtl:rotate-180" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-10">
            <section
              aria-labelledby="footer-company"
              className="lg:col-span-2 space-y-6"
            >
              <h2 id="footer-company" className="sr-only">
                Company Information
              </h2>

              {logo?.url && (
                <StrapiImage
                  src={logo?.url}
                  alt={logo?.alternativeText ?? "Company logo"}
                  className="h-10 w-auto object-contain"
                  priority
                />
              )}

              <p className="text-base text-text-muted1">{tagline}</p>

              <address className="not-italic bg-gray-100 rounded-lg p-5 shadow-sm max-w-sm space-y-2">
                <p className="text-sm text-gray-500">
                  {dir === "rtl" ? "اتصل بنا" : "Contact"}
                </p>

                <p className="font-medium">
                  <a href="mailto:contact@deciphi.com">{data.mail}</a>
                </p>

                <p className="font-medium">
                  <a href="tel:+97441499289">{"+974 4149 9289"}</a>
                </p>
              </address>
            </section>

            {/* Services */}
            <nav aria-labelledby="footer-services" className="space-y-4">
              <h3 id="footer-services" className="text-lg font-semibold">
                {dir === "rtl" ? "خدماتنا" : "Services"}
              </h3>

              <ul className="space-y-3">
                {Services?.map((service: TLink) => (
                  <li key={service?.id}>
                    <Link
                      href={service?.href}
                      className="text-sm text-gray-600 hover:text-black transition"
                    >
                      {service?.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Explore */}
            <nav aria-labelledby="footer-explore" className="space-y-4">
              <h3 id="footer-explore" className="text-lg font-semibold">
                {dir === "rtl" ? "استكشف" : "Explore"}
              </h3>

              <ul className="space-y-3">
                {Explore?.map((service: TLink) => (
                  <li key={service?.id}>
                    <Link
                      href={service?.href}
                      className="text-sm text-gray-600 hover:text-black transition"
                    >
                      {service?.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-gray-200 pt-6">
            <nav aria-label="Social media" className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-[#9b2521] rounded-full flex items-center justify-center hover:opacity-80"
                >
                  <Icon size={16} color="white" />
                </a>
              ))}
            </nav>

            {/* Legal */}
            <div className="text-center sm:text-right space-y-2">
              <div className="flex gap-4 text-sm justify-center sm:justify-end">
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms & Conditions</Link>
              </div>

              <p className="text-xs text-gray-500">
                © 2024 Deciphi. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
