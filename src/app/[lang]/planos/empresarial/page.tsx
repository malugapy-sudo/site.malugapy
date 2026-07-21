import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ContactForm } from "@/components/shared/contact-form";
import { Server, ShieldCheck, Clock, HeadphonesIcon } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function EmpresarialPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.empresarialPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/planos-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.plans, href: `/${lang}/planos` }, { label: dict.nav.business }]} />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            title={t.designedTitle}
            subtitle={t.designedSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="p-8 rounded-lg bg-slate-50 border border-slate-100">
              <Server className="text-brand-orange w-12 h-12 mb-6" />
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">{t.publicIP}</h3>
              <p className="text-slate-500 font-medium text-sm">{t.publicIPDesc}</p>
            </div>
            <div className="p-8 rounded-lg bg-slate-50 border border-slate-100">
              <ShieldCheck className="text-brand-orange w-12 h-12 mb-6" />
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">{t.sla}</h3>
              <p className="text-slate-500 font-medium text-sm">{t.slaDesc}</p>
            </div>
            <div className="p-8 rounded-lg bg-slate-50 border border-slate-100">
              <Clock className="text-brand-orange w-12 h-12 mb-6" />
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">{t.symmetry}</h3>
              <p className="text-slate-500 font-medium text-sm">{t.symmetryDesc}</p>
            </div>
            <div className="p-8 rounded-lg bg-slate-50 border border-slate-100">
              <HeadphonesIcon className="text-brand-orange w-12 h-12 mb-6" />
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">{t.b2bSupport}</h3>
              <p className="text-slate-500 font-medium text-sm">{t.b2bSupportDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                title={t.talkProject}
                subtitle={t.talkProjectSubtitle}
                light
                align="left"
              />
            </div>
            <div className="bg-white rounded-lg p-10 shadow-2xl">
              <h3 className="text-2xl font-extrabold text-brand-navy mb-6">{t.requestQuote}</h3>
              <ContactForm dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
