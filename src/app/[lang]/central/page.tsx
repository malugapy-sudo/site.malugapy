import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";
import { HelpFaqAccordion } from "@/components/sections/help-faq-accordion";
import { MessageCircle, FileText, Wifi, HelpCircle } from "lucide-react";
import { TrackedAnchor } from "@/components/shared/tracked-link";
import Link from "next/link";

export default async function SuportePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.suportePage;

  // The blog posts (reusing from homepage logic)
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
      href: null as string | null,
    },
    {
      title: dict.newLayout.blogPost3Title,
      image: dict.newLayout.blogPost3Img,
      desc: dict.newLayout.blogPost3Desc,
      href: null as string | null,
    },
    {
      title: dict.newLayout.blogPost4Title,
      image: dict.newLayout.blogPost4Img,
      desc: dict.newLayout.blogPost4Desc,
      href: null as string | null,
    }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="bg-white pt-32 lg:pt-40 relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-20">
          {/* Header Text */}
          <div className="max-w-2xl pb-10">
            <h1 className="text-4xl md:text-[3.5rem] font-extrabold uppercase tracking-tight leading-none mb-6">
              <span className="text-[#ff6a00]">{t.heroTitle1}</span>
              <span className="text-[#5b5175]">{t.heroTitle2}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-md">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* The Colored Banner Area */}
        <div className="relative w-full mt-4">
          {/* Absolute Backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff6a00] from-[40%] via-[#7a597a] via-[55%] to-[#0a3dd2] to-[100%]"></div>
          
          {/* Content inside the Banner */}
          <div className="container mx-auto px-6 max-w-7xl relative z-20 flex flex-col md:flex-row">
            {/* Left Buttons Container */}
            <div className="w-full md:w-[45%] py-12 flex flex-col gap-4 pr-4 justify-center">
              <TrackedAnchor href="https://wa.me/595XXXXXXXXX" target="_blank" eventName="clicou_whatsapp_suporte" className="bg-white text-[#4a4e6d] font-bold py-3 px-5 rounded-lg w-full max-w-[260px] text-left flex items-center shadow-md hover:bg-slate-50 transition-colors">
                <MessageCircle className="w-5 h-5 min-w-[20px] mr-3 text-[#4a4e6d]" /> {t.btnWhatsapp}
              </TrackedAnchor>
              <TrackedAnchor href={`/${lang}/central`} eventName="clicou_2via_suporte" className="bg-white text-[#4a4e6d] font-bold py-3 px-5 rounded-lg w-full max-w-[260px] text-left flex items-center shadow-md hover:bg-slate-50 transition-colors">
                <FileText className="w-5 h-5 min-w-[20px] mr-3 text-[#4a4e6d]" /> {t.btn2via}
              </TrackedAnchor>
              <TrackedAnchor href={`/${lang}/planos`} eventName="clicou_contratar_suporte" className="bg-white text-[#4a4e6d] font-bold py-3 px-5 rounded-lg w-full max-w-[260px] text-left flex items-center shadow-md hover:bg-slate-50 transition-colors">
                <Wifi className="w-5 h-5 min-w-[20px] mr-3 text-[#4a4e6d]" /> {t.btnContratar}
              </TrackedAnchor>
            </div>

            {/* Right Woman Image Container */}
            <div className="w-full md:w-[55%] relative min-h-[300px] flex justify-end">
              {/* Anchor the image to the bottom, scale to a max width so she is huge and overlaps the top */}
              <img 
                src="/suporte-woman.png" 
                alt="Atendente Maluga" 
                className="absolute bottom-[-10px] md:bottom-0 right-[-30px] md:right-0 lg:right-[5%] w-[450px] md:w-[600px] lg:w-[700px] xl:w-[800px] h-auto object-contain z-20 pointer-events-none" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAQ Section */}
      <section className="bg-[#021f59] pt-16 md:pt-24 pb-16 md:pb-24 relative overflow-y-visible overflow-x-clip">
        <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-8">
          {/* Left Column: FAQ Accordion */}
          <div className="w-full lg:w-7/12 xl:w-8/12 z-20 relative">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-white w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{t.faqSectionTitle}</h2>
            </div>
            <HelpFaqAccordion items={t.faqs} />
          </div>
          
          {/* Right Column: Technician Illustration */}
          <div className="hidden lg:flex w-full lg:w-5/12 xl:w-4/12 justify-center items-start pt-2">
            <img 
              src="/suporte-tech.png" 
              alt="Técnico Maluga" 
              className="w-auto h-[450px] xl:h-[520px] object-contain pointer-events-none" 
            />
          </div>
        </div>
      </section>

      {/* 3. Blog Section */}
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
    </div>
  );
}
