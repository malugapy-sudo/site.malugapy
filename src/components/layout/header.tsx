/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Smartphone } from "lucide-react";
import { useDevice } from "@/hooks/useDeviceDetect";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/ui/logo";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/middleware";

export function Header({ lang, dict }: { lang: Locale; dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile, isManualOverride, toggleForceMobile } = useDevice();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobileScreen(window.innerWidth < 1024);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
      setOpenDropdown(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isHome = pathname === `/${lang}` || pathname === `/`;
  const showTransparent = isHome && !isScrolled;

  const isActive = (href: string) => {
    const fullHref = `/${lang}${href}`;
    if (href === "") return pathname === `/${lang}` || pathname === `/`;
    return pathname.startsWith(fullHref);
  };

  type NavLink = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  };

  const navLinks: NavLink[] = [
    { label: dict.nav.home, href: "" },
    { label: dict.nav.support, href: "/central" },
    { label: dict.nav.portal, href: "/blog" },
    { label: dict.nav.about, href: "/sobre" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        showTransparent
          ? "bg-gradient-to-b from-brand-blue-dark/80 to-transparent py-4"
          : "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] py-2"
      }`}
    >
      {!showTransparent && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#004ecd] via-[#ff6a00] to-[#004ecd]" />}
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center group transition-transform hover:scale-105">
          <Logo isWhite={showTransparent} className="scale-75 origin-left" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              {link.children ? (
                <>
                  <button
                    onMouseEnter={() => setOpenDropdown(link.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${
                      isActive(link.href)
                        ? showTransparent ? "text-white bg-white/10" : "bg-gradient-to-r from-[#ff6a00] to-[#004ecd] bg-clip-text text-transparent"
                        : showTransparent ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className="ml-1" />
                  </button>

                  <AnimatePresence>
                    {openDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        onMouseEnter={() => setOpenDropdown(link.href)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-2xl border border-slate-100 overflow-hidden py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={`/${lang}${child.href}`}
                            className={`block px-5 py-3 text-sm font-bold transition-colors ${
                              isActive(child.href)
                                ? "text-brand-orange bg-orange-50"
                                : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={`/${lang}${link.href}`}
                  className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${
                    isActive(link.href)
                      ? showTransparent ? "text-white bg-white/10" : "bg-gradient-to-r from-[#ff6a00] to-[#004ecd] bg-clip-text text-transparent"
                      : showTransparent ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          <div className="flex items-center space-x-4 pl-4 ml-2 border-l border-slate-200/30">
            <LanguageSwitcher currentLang={lang} />
            {/* <button
              onClick={toggleForceMobile}
              title={isMobile ? "Desativar modo PWA" : "Ativar modo PWA"}
              className={`relative p-2 rounded-lg transition-all duration-200 ${
                isMobile
                  ? "bg-brand-orange text-white shadow-md shadow-orange-500/25"
                  : showTransparent
                    ? "text-slate-300 hover:text-white hover:bg-white/10"
                    : "text-slate-400 hover:text-brand-orange hover:bg-orange-50"
              }`}
            >
              <Smartphone size={18} />
              {isMobile && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
              )}
            </button> */}
            {/* <Link
              href={`/${lang}/planos`}
              onClick={() => trackEvent('clicou_cta_contratar_header')}
              className="relative group overflow-hidden px-7 py-3 bg-gradient-to-r from-[#ff6a00] to-[#004ecd] text-white rounded-lg font-extrabold text-sm uppercase tracking-widest shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">{dict.nav.cta}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#004ecd] to-[#ff6a00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link> */}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            className={`transition-colors p-2 ${showTransparent ? "text-white" : "text-brand-blue-dark"}`}
            onClick={() => { trackEvent('clicou_menu_hamburger'); setMobileMenuOpen(!mobileMenuOpen); }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl shadow-2xl border-t border-slate-100"
          >
            <div className="flex flex-col px-6 py-8 space-y-2">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={`/${lang}${link.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-bold uppercase tracking-wider transition-colors ${
                      isActive(link.href)
                        ? "text-brand-orange bg-orange-50"
                        : "text-slate-700 hover:text-brand-orange hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-6 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={`/${lang}${child.href}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                            isActive(child.href)
                              ? "text-brand-orange"
                              : "text-slate-500 hover:text-brand-blue"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Language Switcher inside mobile menu */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-center">
                <LanguageSwitcher currentLang={lang} dropUp />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
