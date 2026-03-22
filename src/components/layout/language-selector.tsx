"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Languages, Check } from "lucide-react";
import { locales, type Locale } from "@/i18n";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const languageConfig = {
  en: {
    label: "English",
    flag: "🇬🇧",
  },
  ar: {
    label: "العربية",
    flag: "🇦🇪",
  },
};

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] as Locale;

  const switchLocale = (locale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full
          text-sm font-medium text-white"
        >
          <Languages size={16} />
          {currentLocale.toUpperCase()}
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>

      {/* Dropdown */}
      <DropdownMenuContent
        align="end"
        className="w-48 rounded-2xl p-2 bg-white   "
      >
        {locales.map((locale) => {
          const lang = languageConfig[locale];

          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => switchLocale(locale)}
              className="flex items-center justify-between
              rounded-xl px-3 py-2 text-black bg-white focus:bg-[#8B1A1A]/6 data-[state=open]:bg-gray-100 focus:text-gray-900"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                {lang.label}
              </span>

              {locale === currentLocale && (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-700 text-white">
                  <Check size={14} />
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
