import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { TrackedAnchor } from "@/components/shared/tracked-link";
import { ExternalLink, Wifi, MonitorSmartphone, Server } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function VelocidadePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.velocidadePage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/suporte-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.support, href: "/suporte" }, { label: dict.nav.speedtest }]} />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-10 md:p-16 mb-16 shadow-lg">
            <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-brand-orange/20 rounded-full animate-ping" />
              <ExternalLink size={40} className="text-brand-orange relative z-10" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-brand-navy mb-4">{t.measureNow}</h2>
            <p className="text-slate-500 mb-10 max-w-xl mx-auto text-lg">
              {t.measureDesc}
            </p>
            
            <TrackedAnchor
              href="https://fast.com/es/"
              target="_blank"
              rel="noopener noreferrer"
              eventName="clicou_iniciar_teste_velocidade"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white rounded-full font-extrabold uppercase tracking-widest text-lg shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform"
            >
              {t.startTest}
              <ExternalLink size={20} className="ml-3" />
            </TrackedAnchor>
          </div>

          <SectionHeading
            title={t.tipsTitle}
            subtitle={t.tipsSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
            <div className="p-8 rounded-lg bg-white border border-slate-100 shadow-md">
              <Server className="text-brand-blue w-10 h-10 mb-4" />
              <h4 className="text-lg font-bold text-slate-800 mb-2">{t.tip1Title}</h4>
              <p className="text-slate-500 text-sm">
                {t.tip1Desc}
              </p>
            </div>
            
            <div className="p-8 rounded-lg bg-white border border-slate-100 shadow-md">
              <MonitorSmartphone className="text-brand-blue w-10 h-10 mb-4" />
              <h4 className="text-lg font-bold text-slate-800 mb-2">{t.tip2Title}</h4>
              <p className="text-slate-500 text-sm">
                {t.tip2Desc}
              </p>
            </div>
            
            <div className="p-8 rounded-lg bg-white border border-slate-100 shadow-md">
              <Wifi className="text-brand-blue w-10 h-10 mb-4" />
              <h4 className="text-lg font-bold text-slate-800 mb-2">{t.tip3Title}</h4>
              <p className="text-slate-500 text-sm">
                {t.tip3Desc}
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
