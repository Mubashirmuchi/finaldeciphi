"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { LanguageSelector } from "./language-selector";

import { Image, NavLink, SubNav } from "@/types";
import { usePathname } from "next/navigation";
import { getIcon, IconMap, IconName } from "../custom/iconMap";

interface HeaderProps {
  data: {
    logo: Image;
    navItems: NavLink[];
    cta: NavLink;
  };
  locale: string;
}

function MobileSubmenu({
  items,
  isOpen,
}: {
  items?: SubNav[];
  isOpen: boolean;
}) {
  if (!isOpen || !items?.length) return null;

  return (
    <div className="overflow-hidden">
      <div className="mx-3 mt-1 mb-2 pl-3 border-l-2 border-[#8B1A1A]/40 flex flex-col">
        {items.map((sub, i) => {
          const Icon = getIcon(sub.icon as IconName);

          const href = sub.href ?? "#";

          return (
            <Link key={sub.name} href={href} prefetch={false}>
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                text-white/70 hover:text-white hover:bg-white/10
                text-sm transition-colors group"
              >
                <span
                  className="mt-0.5 shrink-0 w-10 h-10 rounded-xl 
                  bg-[#F3F3F3] border border-[#d6d1cb9e]
                  flex items-center justify-center
                  transition-all duration-200
                  group-hover:border-[#8B1A1A]/40"
                >
                  {Icon && <Icon size={14} className="text-[#E15241]" />}
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-medium truncate">
                    {sub.name}
                  </span>
                  <span className="block text-xs text-white/40 truncate">
                    {sub.desc}
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Navigation({ data, locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const path = usePathname();
  const isHome = path === `/${locale}` || path === `/${locale}/`;

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;
      const pastThreshold = currentY > 60;

      setScrolled(pastThreshold && !scrollingDown);
      setHidden(scrollingDown && pastThreshold);

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data) return <header />;

  const { logo, navItems } = data;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      role="banner"
      // className="fixed top-0 left-0 right-0 z-50" role="banner"
    >
      <div
        className={`max-w-7xl mx-auto ${scrolled ? "md:py-3" : "sm:py-4"} sm:px-2 md:px-0 transition-all duration-300 ease-out`}
      >
        {/* NAV BAR */}
        <div
          className={`flex items-center justify-between sm:rounded-md py-3 px-4 md:px-4
  transition-all duration-300 ease-out
  ${
    scrolled || !isHome
      ? "bg-black/65 backdrop-blur-md shadow-lg"
      : "bg-transparent backdrop-blur-0"
  }`}
        >
          <Link href={`/${locale}`} aria-label="Homepage">
            <StrapiImage
              alt={logo?.alternativeText ?? "Company logo"}
              src={logo?.url}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <nav
            className="hidden md:flex items-center gap-1 px-10 py-2"
            aria-label="Main Navigation"
          >
            {navItems?.map((item) => {
              const hasSubmenu = !!item.subnav?.length;
              const href = item.href ?? "#";
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.text)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={href.startsWith("#") ? `/${locale}${href}` : href}
                    aria-haspopup={hasSubmenu}
                    aria-expanded={activeMenu === item.text}
                    className="flex gap-1 items-center text-sm font-bold px-4 py-1.5 rounded-full
                    text-white/85 hover:text-white hover:bg-white/12 transition"
                  >
                    {item.text}

                    {hasSubmenu && (
                      <span>
                        <ChevronDown size={13} />
                      </span>
                    )}
                  </Link>

                  <>
                    {hasSubmenu && activeMenu === item.text && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 w-145">
                        <div className="relative bg-white rounded-md shadow-xl border p-2 grid grid-cols-2 gap-2">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 "></div>
                          {item.subnav?.map((sub) => {
                            const Icon =
                              IconMap[sub.icon as keyof typeof IconMap];

                            console.log("sub.icon", sub.icon);
                            return (
                              <Link
                                key={sub.id}
                                href={sub.href ?? "#"}
                                className="flex items-start gap-3 p-3 rounded-xl group hover:bg-[#8B1A1A]/6"
                              >
                                <span className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                  {Icon && (
                                    <Icon
                                      size={18}
                                      className="text-[#E15241]"
                                    />
                                  )}
                                </span>

                                <span>
                                  <span className="block text-sm font-semibold text-gray-800 group-hover:text-[#8B1A1A]">
                                    {sub.name}
                                  </span>
                                  <span className="block text-xs text-gray-500">
                                    {sub.desc}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                </div>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <Link
              href={`/${locale}/contact`}
              className="text-white font-medium overflow-hidden shadow-lg bg-[radial-gradient(circle_at_30%_30%,#AC1B1B_0%,#731212_52%,#460B0B_95%)] hover:brightness-110  inline-flex items-center justify-center h-9 px-4 py-2 rounded-md text-sm transition-colors"
            >
              {locale === "ar" ? "اتصل بنا" : "Contact"}

              <ChevronRight size={15} className="transition-transform " />
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />

            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setMobileOpen((v) => !v);
                setMobileExpanded(null);
              }}
              className="text-white p-1.5"
            >
              <>
                {mobileOpen ? (
                  <span>
                    <X size={22} />
                  </span>
                ) : (
                  <span>
                    <Menu size={22} />
                  </span>
                )}
              </>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <>
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-2 rounded-md bg-black/55 backdrop-blur border border-white/15 shadow-xl"
          >
            <nav className="p-3 flex flex-col">
              {navItems.map((item) => {
                const hasSubmenu = !!item.subnav?.length;
                const isExpanded = mobileExpanded === item.text;

                return (
                  <div key={item.id}>
                    {hasSubmenu ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : item.text)
                          }
                          className="w-full flex justify-between px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/8"
                        >
                          {item.text}
                          <ChevronDown
                            size={15}
                            className={`transition ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <MobileSubmenu
                          items={item.subnav}
                          isOpen={isExpanded}
                        />
                      </>
                    ) : (
                      <Link
                        href={
                          item.href?.startsWith("#")
                            ? `/${locale}${item.href}`
                            : (item.href ?? "#")
                        }
                        className="block w-full px-4 py-3 text-sm text-white/80 hover:bg-white/8 rounded-xl"
                      >
                        {item.text}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  href={`/${locale}/contact`}
                  className="w-full text-white font-medium overflow-hidden shadow-lg bg-[radial-gradient(circle_at_30%_30%,#AC1B1B_0%,#731212_52%,#460B0B_95%)] hover:brightness-110  inline-flex items-center justify-center h-9 px-4 py-2 rounded-md text-sm transition-colors"
                >
                  {locale === "ar" ? "اتصل بنا" : "Contact"}

                  <ChevronRight size={15} className="transition-transform " />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </>
    </header>
  );
}
