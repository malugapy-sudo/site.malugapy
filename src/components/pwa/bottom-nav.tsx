/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Wifi, MessageCircle, HeadphonesIcon, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDevice } from "@/hooks/useDeviceDetect";
import type { Locale } from "@/middleware";

interface BottomNavProps {
  lang: Locale;
  dict: any;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  external?: boolean;
  accent?: string;
}

export function BottomNav({ lang, dict }: BottomNavProps) {
  const { isMobile } = useDevice();
  const pathname = usePathname();

  if (!isMobile) return null;

  const navItems: NavItem[] = [
    { label: dict.nav.home, href: `/${lang}`, icon: Home },
    { label: dict.nav.plans, href: `/${lang}/planos`, icon: Wifi },
    {
      label: "WhatsApp",
      href: "https://wa.me/595XXXXXXXXX",
      icon: MessageCircle,
      external: true,
      accent: "whatsapp",
    },
    { label: dict.nav.support, href: `/${lang}/suporte`, icon: HeadphonesIcon },
    { label: dict.nav.about, href: `/${lang}/sobre`, icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === `/${lang}` || pathname === `/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {/* Background — gradient escuro com blur */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001f52] via-[#001f52]/98 to-[#001f52]/90 backdrop-blur-2xl" />
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff6a00]/50 to-transparent" />

      <div className="relative flex items-stretch justify-around h-[70px] max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const active = !item.external && isActive(item.href);
          const isWhatsApp = item.accent === "whatsapp";
          const Icon = item.icon;

          const content = (
            <motion.div
              className="flex flex-col items-center justify-center relative w-full h-full py-2"
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >


              <div className="relative z-10 flex flex-col items-center gap-1">
                {/* WhatsApp FAB */}
                {isWhatsApp ? (
                  <div className="w-12 h-12 -mt-7 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
                    <Icon size={22} className="text-white" strokeWidth={2.2} />
                  </div>
                ) : (
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-br from-[#ff6a00] to-[#004ecd] shadow-md shadow-orange-500/25"
                      : "bg-white/10"
                  }`}>
                    <Icon
                      size={18}
                      strokeWidth={active ? 2.2 : 1.6}
                      className={`transition-colors duration-200 ${
                        active ? "text-white" : "text-blue-200/70"
                      }`}
                    />
                  </div>
                )}

                <span
                  className={`text-[10px] leading-none transition-all duration-200 ${
                    isWhatsApp
                      ? "text-[#25D366] font-bold mt-1"
                      : active
                        ? "text-white font-bold"
                        : "text-blue-200/50 font-medium"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator bar */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="activeBar"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      className="w-4 h-[2px] rounded-full bg-gradient-to-r from-[#ff6a00] to-[#004ecd] mt-0.5"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex items-center justify-center"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
