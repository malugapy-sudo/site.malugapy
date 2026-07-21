import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { PlanCard, PlanData } from "@/components/shared/plan-card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ContactForm } from "@/components/shared/contact-form";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function ResidencialPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.residencialPage;

  const planosResidenciais: PlanData[] = [
    {
      id: 1,
      type: dict.homePage.planBasic,
      megas: "300",
      price: "99.000",
      features: dict.planosPage.plan1Features,
      ctaLabel: dict.planosPage.ctaLabel,
    },
    {
      id: 2,
      type: dict.homePage.planFamily,
      megas: "500",
      price: "130.000",
      features: dict.planosPage.plan2Features,
      popular: true,
      ctaLabel: dict.planosPage.ctaLabel,
    },
    {
      id: 3,
      type: dict.homePage.planGamer,
      megas: "800",
      price: "160.000",
      features: dict.planosPage.plan3Features,
      ctaLabel: dict.planosPage.ctaLabel,
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
        <Breadcrumb dict={dict} items={[{ label: dict.nav.plans, href: `/${lang}/planos` }, { label: dict.nav.residential }]} />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            title={t.choosePlan}
            subtitle={t.choosePlanSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-24">
            {planosResidenciais.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                title={t.doubtsTitle}
                subtitle={t.doubtsSubtitle}
                light
                align="left"
              />
              <ul className="space-y-4 mt-8 text-slate-300 font-medium">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-orange mr-3" />
                  {t.fastInstall}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-orange mr-3" />
                  {t.techSupport}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-orange mr-3" />
                  {t.wifiEquip}
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-10 shadow-2xl">
              <h3 className="text-2xl font-extrabold text-brand-navy mb-6">{t.requestAdvice}</h3>
              <ContactForm dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
