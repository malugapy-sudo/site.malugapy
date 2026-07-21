import { Hero } from "@/components/sections/hero";
import { Advantages } from "@/components/sections/advantages";
import { SectionHeading } from "@/components/shared/section-heading";
import { PlanCard, PlanData } from "@/components/shared/plan-card";
import { QuickLinks } from "@/components/shared/quick-links";
import { ContactForm } from "@/components/shared/contact-form";
import { TrackedLink, TrackedAnchor } from "@/components/shared/tracked-link";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  const homePlans: PlanData[] = [
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
      {/* 1. Hero */}
      <Hero dict={dict} />

      {/* 2. Atalhos Rápidos */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            badge={dict.homePage.selfServiceBadge}
            title={dict.homePage.selfServiceTitle}
            subtitle={dict.homePage.selfServiceSubtitle}
          />
          <QuickLinks lang={lang} dict={dict} />
        </div>
      </section>

      {/* 3. Vantagens */}
      <Advantages dict={dict} />

      {/* 4. Vitrine de Planos */}
      <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 w-full h-[500px] bg-gradient-to-br from-[#001f52] via-[#004ecd] to-[#001f52] z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <SectionHeading
            badge={dict.homePage.packagesBadge}
            title={dict.homePage.packagesTitle}
            subtitle={dict.homePage.packagesSubtitle}
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {homePlans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index}  />
            ))}
          </div>

          <div className="text-center mt-10 md:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <TrackedLink
              href={`/${lang}/planos`}
              eventName="clicou_ver_todos_planos_home"
              className="inline-flex items-center bg-gradient-to-r from-[#ff6a00] to-[#004ecd] bg-clip-text text-transparent font-bold hover:opacity-80 text-lg group"
            >
              {dict.homePage.viewAllPlans}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* 5. CTA + Formulário de Leads */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Info */}
              <div className="bg-gradient-to-br from-[#001f52] via-[#003da3] to-[#004ecd] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange-light text-xs font-bold tracking-widest uppercase mb-6">
                    {dict.homePage.contactBadge}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight whitespace-pre-line">
                    {dict.homePage.contactTitle}
                  </h3>
                  <p className="text-slate-300 font-medium leading-relaxed mb-10 max-w-md">
                    {dict.homePage.contactDesc}
                  </p>
                  <TrackedAnchor
                    href="https://wa.me/595XXXXXXXXX"
                    target="_blank"
                    eventName="clicou_whatsapp_secao_contato"
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    {dict.homePage.chatWhatsApp}
                  </TrackedAnchor>
                </div>
              </div>

              {/* Right: Form */}
              <div className="p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <ContactForm dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
