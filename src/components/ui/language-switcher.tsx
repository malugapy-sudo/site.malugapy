"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n, type Locale } from "@/middleware";
import { useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const languages = {
  es: { label: "ES", flagUrl: "https://flagcdn.com/w20/es.png" },
  pt: { label: "PT", flagUrl: "https://flagcdn.com/w20/br.png" },
  en: { label: "EN", flagUrl: "https://flagcdn.com/w20/us.png" },
};

export function LanguageSwitcher({ currentLang, dropUp = false }: { currentLang: Locale; dropUp?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const lang = languages[currentLang] ? currentLang : "es";

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    // Replace the language segment
    if (i18n.locales.includes(segments[1] as Locale)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    return segments.join("/");
  };

  const handleLanguageChange = (locale: string) => {
    trackEvent('trocou_idioma', { idioma: locale });
    setIsOpen(false);
    // document.cookie will be updated by middleware on next request
    router.push(redirectedPathName(locale));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-800"
      >
        <Image 
          src={languages[lang].flagUrl} 
          alt={languages[lang].label}
          width={20}
          height={15}
          className="h-auto"
        />
        <span className="font-bold text-sm text-slate-800">{languages[lang].label}</span>
      </button>

      {isOpen && (
        <div className={`absolute ${dropUp ? "bottom-full left-1/2 -translate-x-1/2 mb-2" : "top-full right-0 mt-2"} w-28 bg-white rounded-lg shadow-lg border border-slate-100 py-2 z-50`}>
          {i18n.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 ${
                currentLang === loc ? "text-brand-orange" : "text-slate-600"
              }`}
            >
              <Image 
                src={languages[loc as Locale].flagUrl} 
                alt={languages[loc as Locale].label}
                width={20}
                height={15}
                className="h-auto"
              />
              <span>{languages[loc as Locale].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
