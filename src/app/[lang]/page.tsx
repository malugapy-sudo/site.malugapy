import { Hero } from "@/components/sections/hero";
import { PlanCard, PlanData } from "@/components/shared/plan-card";
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

  const blogPosts = [
    {
      title: dict.newLayout.blogPost1Title,
      image: dict.newLayout.blogPost1Img,
      desc: dict.newLayout.blogPost1Desc,
      href: `/${lang}/blog`,
    },
    {
      title: dict.newLayout.blogPost2Title,
      image: dict.newLayout.blogPost2Img,
      desc: dict.newLayout.blogPost2Desc,
      href: `/${lang}/blog/internet-lenta`,
    },
    {
      title: dict.newLayout.blogPost3Title,
      image: dict.newLayout.blogPost3Img,
      desc: dict.newLayout.blogPost3Desc,
      href: `/${lang}/blog/proteja-sua-rede`,
    },
    {
      title: dict.newLayout.blogPost4Title,
      image: dict.newLayout.blogPost4Img,
      desc: dict.newLayout.blogPost4Desc,
      href: `/${lang}/blog/internet-para-gamers`,
    }
  ];

  return (
    <>
      {/* 1. Hero */}
      <Hero dict={dict} />

      {/* 2. Vitrine de Planos - Dark Blue Background */}
      <section className="py-16 md:py-24 bg-[#0a153b] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {dict.newLayout.planosTitle}
            </h2>
            <p className="text-[#ff6a00] font-medium text-lg">
              {dict.newLayout.planosSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {homePlans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index}  />
            ))}
          </div>

          {/* <div className="text-center mt-10 md:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <TrackedLink
              href={`/${lang}/planos`}
              eventName="clicou_ver_todos_planos_home"
              className="inline-flex items-center text-white bg-white/10 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-all text-lg group"
            >
              {dict.homePage.viewAllPlans}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </TrackedLink>
          </div> */}
        </div>
      </section>

      {/* 3. Vantagens (Por que escolher a Maluga) - Light Blue Background */}
      <section className="py-16 md:py-24 bg-[#e8f2fc]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-12">
            <div className="mb-2 bg-white inline-block px-6 py-3 rounded-full shadow-sm">
              <img src={dict.newLayout.vantagensTitleImg} alt="Por que escolher a Maluga Telecom" className="h-6 md:h-8 object-contain" />
            </div>
            <p className="text-slate-600 font-medium text-lg mt-4 pl-4 font-bold">
              {dict.newLayout.vantagensSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1e3a8a] text-lg mb-3">{dict.newLayout.vantagem1Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {dict.newLayout.vantagem1Desc}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1e3a8a] text-lg mb-3">{dict.newLayout.vantagem2Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {dict.newLayout.vantagem2Desc}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1e3a8a] text-lg mb-3">{dict.newLayout.vantagem3Title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {dict.newLayout.vantagem3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA + Formulário de Leads - White Background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#ff6a00]/20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Info */}
              <div className="bg-[#0a153b] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
                <span className="text-[#ff6a00] text-xs font-bold tracking-widest uppercase mb-4">
                  {dict.newLayout.contatoBadge}
                </span>
                <h3 className="text-3xl font-bold text-white mb-8 leading-snug">
                  {dict.newLayout.contatoTitle1} <br/>{dict.newLayout.contatoTitle2}
                </h3>
                <p className="text-slate-300 font-medium mb-8">
                  {dict.newLayout.contatoSubtitle}
                </p>
                <TrackedAnchor
                  href="https://wa.me/+595991554700"
                  target="_blank"
                  eventName="clicou_whatsapp_secao_contato"
                  className="inline-flex items-center justify-center px-6 py-4 bg-[#00c950] text-white rounded-lg font-bold hover:bg-[#00b046] transition-colors w-max"
                >
                  <MessageCircle size={20} className="mr-2" />
                  991 554700
                </TrackedAnchor>
              </div>

              {/* Right: Form */}
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white">
                <ContactForm dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Blog Section */}
      <section className="py-16 md:py-24 bg-[#e8f2fc]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10 inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
            <img src={dict.newLayout.blogTitleImg} alt={dict.newLayout.blogTitleImgAlt} className="h-8 md:h-10 object-contain" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => {
              const cardContent = (
                <>
                  <div className="rounded-2xl overflow-hidden mb-4 shadow-sm aspect-video">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-[#0a153b] text-base mb-2 group-hover:text-[#ff6a00] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {post.desc}
                  </p>
                </>
              );

              if (post.href) {
                return (
                  <Link key={index} href={post.href} className="flex flex-col group cursor-pointer">
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={index} className="flex flex-col group cursor-pointer">
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
