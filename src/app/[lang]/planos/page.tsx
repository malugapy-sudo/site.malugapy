import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { PlanCard, PlanData } from "@/components/shared/plan-card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PlanCalculator } from "@/components/sections/plan-calculator";
import Link from "next/link";
import { Home, Building2, Wifi } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function PlanosPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.planosPage;

  const planos: PlanData[] = [
    {
      id: 1,
      type: dict.homePage.planBasic,
      megas: "300",
      price: "99.000",
      features: t.plan1Features,
      ctaLabel: t.ctaLabel,
    },
    {
      id: 2,
      type: dict.homePage.planFamily,
      megas: "500",
      price: "130.000",
      features: t.plan2Features,
      popular: true,
      ctaLabel: t.ctaLabel,
    },
    {
      id: 3,
      type: dict.homePage.planGamer,
      megas: "800",
      price: "160.000",
      features: t.plan3Features,
      ctaLabel: t.ctaLabel,
    },
  ];

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/planos-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.plans }]} />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            title={t.catTitle}
            subtitle={t.catSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <Link href={`/${lang}/planos/residencial`} className="group p-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-brand-orange/30 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Home size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">{t.homeTitle}</h3>
              <p className="text-slate-500 font-medium text-sm">{t.homeDesc}</p>
            </Link>

            <Link href={`/${lang}/planos/empresarial`} className="group p-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">{t.bizTitle}</h3>
              <p className="text-slate-500 font-medium text-sm">{t.bizDesc}</p>
            </Link>

            <Link href={`/${lang}/planos/adicionais`} className="group p-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Wifi size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">{t.addonTitle}</h3>
              <p className="text-slate-500 font-medium text-sm">{t.addonDesc}</p>
            </Link>
          </div>

          <SectionHeading
            title={t.featTitle}
            subtitle={t.featSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {planos.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index}  />
            ))}
          </div>
        </div>
      </section>

      <PlanCalculator dict={dict} />
    </>
  );
}
