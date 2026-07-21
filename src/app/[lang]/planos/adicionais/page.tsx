import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ContactForm } from "@/components/shared/contact-form";
import { Router, PhoneCall, PlaySquare } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function AdicionaisPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.adicionaisPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/planos-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.plans, href: `/${lang}/planos` }, { label: dict.nav.addons }]} />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            title={t.complementsTitle}
            subtitle={t.complementsSubtitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Mesh Router */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <Router className="w-24 h-24 text-slate-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent" />
              </div>
              <div className="p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2 block">{t.hardware}</span>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-4">{t.meshRouters}</h3>
                <p className="text-slate-500 font-medium mb-6">
                  {t.meshDesc}
                </p>
                <div className="p-4 bg-slate-50 rounded-lg mb-6">
                  <p className="text-sm text-slate-600 font-semibold mb-1">{t.startingFrom}</p>
                  <p className="text-2xl font-extrabold text-slate-800">Gs 30.000 <span className="text-sm font-medium text-slate-500">{t.perMonth}</span></p>
                </div>
              </div>
            </div>

            {/* Telefonia IP */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <PhoneCall className="w-24 h-24 text-slate-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-transparent" />
              </div>
              <div className="p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-2 block">{t.communication}</span>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-4">{t.voip}</h3>
                <p className="text-slate-500 font-medium mb-6">
                  {t.voipDesc}
                </p>
                <div className="p-4 bg-slate-50 rounded-lg mb-6">
                  <p className="text-sm text-slate-600 font-semibold mb-1">{t.startingFrom}</p>
                  <p className="text-2xl font-extrabold text-slate-800">Gs 25.000 <span className="text-sm font-medium text-slate-500">{t.perMonth}</span></p>
                </div>
              </div>
            </div>

            {/* Streaming */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <PlaySquare className="w-24 h-24 text-slate-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent" />
              </div>
              <div className="p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2 block">{t.entertainment}</span>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-4">{t.streamingCombos}</h3>
                <p className="text-slate-500 font-medium mb-6">
                  {t.streamingDesc}
                </p>
                <div className="p-4 bg-slate-50 rounded-lg mb-6">
                  <p className="text-sm text-slate-600 font-semibold mb-1">{t.startingFrom}</p>
                  <p className="text-2xl font-extrabold text-slate-800">Gs 40.000 <span className="text-sm font-medium text-slate-500">{t.perMonth}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-brand-blue/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                title={t.boostTitle}
                subtitle={t.boostSubtitle}
                light
                align="left"
              />
            </div>
            <div className="bg-white rounded-lg p-10 shadow-2xl">
              <h3 className="text-2xl font-extrabold text-brand-navy mb-6">{t.requestService}</h3>
              <ContactForm dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
