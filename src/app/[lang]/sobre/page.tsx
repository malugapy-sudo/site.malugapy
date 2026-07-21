import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { TrackedAnchor } from "@/components/shared/tracked-link";
import { Map, Zap, Users } from "lucide-react";
import Image from "next/image";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function SobrePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.sobrePage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/institucional.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.about }]} />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <SectionHeading
                title={t.connectTitle}
                subtitle={t.connectSubtitle}
                align="left"
              />
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
              </div>
            </div>
            <div className="relative">
              {/* Institutional Image */}
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl relative">
                <Image
                  src="/institucional.png"
                  alt={t.imgAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-xl border border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy text-2xl">10k+</h4>
                    <p className="text-slate-500 font-medium text-sm">{t.clientsConnected}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SectionHeading
            title={t.pillarsTitle}
            subtitle={t.pillarsSubtitle}
          />

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-8 md:p-10 border-b border-slate-100 md:border-b-0 md:border-r">
                <Zap size={28} className="text-brand-blue" />
                <h3 className="text-lg font-bold text-brand-navy mt-4 mb-2">{t.techTitle}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.techDesc}</p>
              </div>

              <div className="p-8 md:p-10 border-b border-slate-100 md:border-b-0 md:border-r">
                <Users size={28} className="text-brand-orange" />
                <h3 className="text-lg font-bold text-brand-navy mt-4 mb-2">{t.humanTitle}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.humanDesc}</p>
              </div>

              <div className="p-8 md:p-10">
                <Map size={28} className="text-green-600" />
                <h3 className="text-lg font-bold text-brand-navy mt-4 mb-2">{t.covTitle}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.covDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="bg-gradient-to-r from-[#004ecd] via-[#3371d9] to-[#ff6a00] rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-xl">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t.careerTitle}</h2>
              <p className="text-orange-100 font-medium max-w-xl">
                {t.careerDesc}
              </p>
            </div>
            <TrackedAnchor href="mailto:rrhh@maluga.com.py" eventName="clicou_trabalhe_conosco" className="bg-white text-brand-orange font-extrabold px-8 py-4 rounded-lg uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap">
              {t.careerBtn}
            </TrackedAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
