import { TrackedAnchor } from "@/components/shared/tracked-link";
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
      {/* Hero Header */}
      <div className="w-full relative">
        <Image 
          src="/nova-capa-maluga.jpg" 
          alt="Maluga Telecom Fachada" 
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ff6a00] to-[#004ecd]" />
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Main About Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-[#ff6a00]">
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
                </div>
                <h2 className="text-3xl md:text-4xl tracking-tight">
                  <span className="text-[#ff6a00] font-light">{t.titlePrefix}</span> <span className="text-[#2b1b6d] font-bold">{t.titleSuffix}</span>
                </h2>
              </div>
              <p className="text-sm text-slate-800 mb-8 font-medium">
                {t.subtitle}
              </p>

              <div className="border-l-[4px] border-[#ff6a00] pl-5 space-y-5 text-[13px] md:text-sm text-slate-800 leading-relaxed font-medium">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
                <p>{t.p3}</p>
              </div>
            </div>

            <div className="flex-1 relative flex justify-center mt-10 md:mt-0">
              <div className="relative w-64 h-80 md:w-[320px] md:h-[400px]">
                {/* Background Shapes */}
                <div className="absolute top-8 -left-4 w-32 h-56 md:w-40 md:h-64 bg-[#ff6a00] rounded-tl-[32px] rounded-bl-lg rounded-tr-lg rounded-br-lg z-0"></div>
                <div className="absolute bottom-4 -right-2 w-32 h-56 md:w-40 md:h-64 bg-[#3b47f6] rounded-br-[32px] rounded-bl-lg rounded-tr-lg rounded-tl-lg z-0"></div>
                
                {/* Woman Image */}
                <Image
                  src="/sobre-woman.png"
                  alt="Equipe Maluga"
                  fill
                  className="object-contain z-10 relative drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Nossos Pilares */}
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="text-[#ff6a00]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h2 className="text-3xl tracking-tight">
                <span className="text-[#ff6a00] font-light">{t.pillarsTitlePrefix}</span> <span className="text-[#3b82f6] font-medium">{t.pillarsTitleSuffix}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-[#eff4ff] rounded-[24px] p-8 shadow-sm flex flex-col items-center text-center">
                <h3 className="font-bold text-[13px] mb-4 text-slate-800">{t.pillar1Title}</h3>
                <p className="text-[12px] text-slate-700 leading-relaxed font-medium">
                  {t.pillar1Desc}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#eff4ff] rounded-[24px] p-8 shadow-sm flex flex-col items-center text-center">
                <h3 className="font-bold text-[13px] mb-4 text-slate-800">{t.pillar2Title}</h3>
                <p className="text-[12px] text-slate-700 leading-relaxed font-medium">
                  {t.pillar2Desc}
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#eff4ff] rounded-[24px] p-8 shadow-sm flex flex-col items-center text-center">
                <h3 className="font-bold text-[13px] mb-4 text-slate-800">{t.pillar3Title}</h3>
                <p className="text-[12px] text-slate-700 leading-relaxed font-medium">
                  {t.pillar3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Join Us Banner */}
          <div className="bg-gradient-to-r from-[#ff6a00] to-[#0e49c7] rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-xl">
            <div className="flex items-start gap-4 mb-6 md:mb-0">
              <div className="text-white mt-1">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
              </div>
              <div>
                <h3 className="text-xl md:text-[22px] font-medium text-white mb-2">{t.careerTitle}</h3>
                <p className="text-white/95 text-[13px] md:text-[14px]">
                  {t.careerDesc}
                </p>
              </div>
            </div>
            
            <TrackedAnchor href="mailto:rrhh@maluga.com.py" eventName="clicou_trabalhe_conosco" className="bg-white text-[#ff6a00] font-bold px-8 py-3 rounded-full text-sm hover:bg-orange-50 transition-colors shadow-md whitespace-nowrap">
              {t.careerBtn}
            </TrackedAnchor>
          </div>

        </div>
      </section>
    </>
  );
}
