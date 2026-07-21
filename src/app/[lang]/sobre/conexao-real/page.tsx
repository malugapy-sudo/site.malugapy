import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Play } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function ConexaoRealPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.conexaoRealPage;

  return (
    <div className="bg-[#050810] min-h-screen text-slate-300">
      <div className="container mx-auto px-6 py-6 max-w-7xl relative z-20">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.about, href: "/sobre" }, { label: dict.nav.project }]} />
      </div>

      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Cinematic ambient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-orange/5 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-brand-blue/10 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center mb-20">
          <div>
            <span className="inline-block py-1.5 px-6 border border-white/10 rounded-full text-white/50 text-xs font-extrabold uppercase tracking-[0.3em] mb-8 bg-white/5 backdrop-blur-md">
              {t.docLabel}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8 tracking-tight">
              <span dangerouslySetInnerHTML={{ __html: t.title.replace('\n', '<br/>') }} />
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
              {t.description}
            </p>
          </div>
        </div>

        {/* Video Player Placeholder */}
        <div className="container mx-auto px-6 relative z-20 max-w-6xl">
          <div
            className="aspect-video w-full bg-black rounded-lg border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative group cursor-pointer"
          >
            {/* Thumbnail Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/conexao-real.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-navy/50 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500 group-hover:bg-brand-orange/20 group-hover:border-brand-orange/50">
                <Play className="text-white ml-2" size={40} />
              </div>
            </div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 w-full p-10 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-brand-orange font-bold text-sm tracking-widest uppercase mb-2 block drop-shadow-md">{t.episode1}</span>
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">{t.episode1Title}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10 bg-black/50 backdrop-blur-3xl border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-8">{t.visionTitle}</h2>
          <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
            <p>{t.visionP1}</p>
            <p>{t.visionP2}</p>
            <p>{t.visionP3}</p>
          </div>
          
          <div className="mt-16 pt-16 border-t border-white/10">
            <Link href="/" className="text-slate-500 hover:text-white uppercase tracking-widest text-sm font-bold transition-colors">
              {t.backToMaluga}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
