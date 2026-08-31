/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { MessageCircle, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useDevice } from "@/hooks/useDeviceDetect";
import { FooterInstallLink } from "@/components/pwa/footer-install-link";
import { trackEvent } from "@/lib/analytics";

export function Footer({ dict }: { dict: any }) {
  const { isMobile } = useDevice();

  const footerLinks = {
    navegacion: [
      { label: dict.nav.home, href: "/" },
      { label: dict.nav.support, href: "/central" },
      { label: dict.nav.portal, href: "/blog" },
      { label: dict.nav.about, href: "/sobre" },
    ],
    legal: [
      { label: dict.footer.privacyPolicy, href: "/legal/privacidade" },
      { label: dict.footer.termsOfUse, href: "/legal/termos" },
      { label: dict.footer.contracts, href: "/legal/contratos" },
    ],
  };


  if (isMobile) {
    return (
      <footer className="bg-gradient-to-b from-[#003da3] to-[#001f52] text-white relative pb-24">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#004ecd] via-[#ff6a00] to-[#004ecd]" />

        <div className="px-6 pt-10 pb-6">

          <div className="mb-6">
            <Link href="/">
              <Logo isWhite className="scale-90 origin-left" />
            </Link>
          </div>


          <p className="text-blue-100 font-medium leading-relaxed mb-6 text-sm">
            {dict.footer.desc}
          </p>


          <div className="flex space-x-3 mb-8">
            <a href="#" className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-lg flex items-center justify-center transition-all" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/malugapy/" target="_blank" className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-lg flex items-center justify-center transition-all" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.youtube.com/@MALUGA-PY" target="_blank" className="w-9 h-9 bg-white/10 hover:bg-brand-orange rounded-lg flex items-center justify-center transition-all" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="https://wa.me/+595991554700" target="_blank" onClick={() => trackEvent('clicou_whatsapp_footer_mobile')} className="w-9 h-9 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all" aria-label="WhatsApp">
              <MessageCircle size={16} />
            </a>
          </div>


          <div className="grid grid-cols-2 gap-6 mb-8">

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-4">{dict.footer.navSection}</h4>
              <ul className="space-y-2.5">
                {footerLinks.navegacion.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-blue-200 hover:text-white transition-colors font-medium text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <FooterInstallLink dict={dict} />
                </li>
              </ul>
            </div>


            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-4">{dict.footer.contactSection}</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="text-brand-orange mt-0.5 mr-3 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-xs text-blue-300 font-semibold uppercase mb-1">{dict.footer.salesSupport}</p>
                    <a href="tel:+595991554700" onClick={() => trackEvent('clicou_telefone_footer')} className="text-white font-bold hover:text-brand-orange transition-colors">
                      (991) 554-700
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="text-brand-orange mt-0.5 mr-3 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-xs text-blue-300 font-semibold uppercase mb-1">{dict.footer.headquarters}</p>
                    <span className="text-blue-200 text-sm font-medium">{dict.footer.headquartersDesc}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>


          <div className="border-t border-white/10 pt-6">

            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 justify-center">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} className="text-blue-300 hover:text-white text-xs font-medium transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>


            <p className="text-blue-400 text-[11px] text-center leading-relaxed">
              © {new Date().getFullYear()} Maluga Telecom Sociedad Anonima. RUC 80165701-6 {dict.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    );
  }


  return (
    <footer className="bg-gradient-to-b from-[#003da3] to-[#001f52] text-white relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#004ecd] via-[#ff6a00] to-[#004ecd] z-20" />


      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-brand-blue-light/20 rounded-full blur-[120px] pointer-events-none" />


      <div className="container mx-auto px-6 max-w-7xl pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo isWhite={true} className="scale-90 origin-left" />
            </Link>
            <p className="text-blue-100 font-medium leading-relaxed mb-8 max-w-sm">
              {dict.footer.desc}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-brand-orange hover:shadow-md hover:shadow-orange-500/20 rounded-lg flex items-center justify-center transition-all hover:-translate-y-1" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/malugapy/" target="_blank" className="w-10 h-10 bg-white/10 hover:bg-brand-orange hover:shadow-md hover:shadow-orange-500/20 rounded-lg flex items-center justify-center transition-all hover:-translate-y-1" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@MALUGA-PY" target="_blank" className="w-10 h-10 bg-white/10 hover:bg-brand-orange hover:shadow-md hover:shadow-orange-500/20 rounded-lg flex items-center justify-center transition-all hover:-translate-y-1" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://wa.me/+595991554700" target="_blank" onClick={() => trackEvent('clicou_whatsapp_footer')} className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all hover:-translate-y-1" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-orange mb-6">{dict.footer.navSection}</h4>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200 hover:text-white transition-colors font-medium text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <FooterInstallLink dict={dict} />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-orange mb-6">{dict.footer.contactSection}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="text-brand-orange mt-0.5 mr-3 flex-shrink-0" size={16} />
                <div>
                  <p className="text-xs text-blue-300 font-semibold uppercase mb-1">{dict.footer.salesSupport}</p>
                  <a href="tel:+595991554700" onClick={() => trackEvent('clicou_telefone_footer')} className="text-white font-bold hover:text-brand-orange transition-colors">
                    (991) 554-700
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="text-brand-orange mt-0.5 mr-3 flex-shrink-0" size={16} />
                <div>
                  <p className="text-xs text-blue-300 font-semibold uppercase mb-1">{dict.footer.headquarters}</p>
                  <span className="text-blue-200 text-sm font-medium">{dict.footer.headquartersDesc}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 relative pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#004ecd] to-[#ff6a00] rounded-full" />
          <p className="text-blue-300 text-sm font-medium">
            © {new Date().getFullYear()} Maluga Telecom Sociedad Anonima. RUC 80165701-6 {dict.footer.rights}
          </p>
          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-blue-300 hover:text-white text-sm font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
