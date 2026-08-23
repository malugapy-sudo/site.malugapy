import Image from "next/image";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function BlogPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.blogPage;

  return (
    <>
      {/* Blog Article */}
      <section className="pt-8 pb-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a1a2e] mb-2 leading-tight">
            {t.articleTitle}
          </h1>

          {/* Date */}
          <p className="text-sm text-slate-500 mb-6">{t.articleDate}</p>

          {/* Video Thumbnail */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 group cursor-pointer shadow-lg">
            <Image
              src="/blog-wifi-thumb.png"
              alt={t.articleTitle}
              fill
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <a
              href={t.videoUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none text-[14px] md:text-[15px] leading-relaxed">
            <p>{t.intro1}</p>
            <p className="mt-4">{t.intro2}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{t.tip1Title}</h3>
            <p>{t.tip1Desc}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{t.tip2Title}</h3>
            <p>{t.tip2Desc}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{t.tip3Title}</h3>
            <p>{t.tip3Desc}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>{t.tip3Bullet1Label}</strong> {t.tip3Bullet1Desc}</li>
              <li><strong>{t.tip3Bullet2Label}</strong> {t.tip3Bullet2Desc}</li>
            </ul>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{t.tip4Title}</h3>
            <p>{t.tip4Desc}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{t.tip5Title}</h3>
            <p>{t.tip5Desc}</p>

            <p className="mt-6">{t.conclusion}</p>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-10">
            <div className="text-[#ff6a00]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <h2 className="text-2xl md:text-3xl tracking-tight">
              <span className="text-[#ff6a00] font-light">{t.relatedPrefix}</span>{" "}
              <span className="text-[#004ecd] font-bold">{t.relatedSuffix}</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src="/1.webp" alt={t.related1Title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[14px] text-[#1a1a2e] mb-1">{t.related1Title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{t.related1Desc}</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src="/2.webp" alt={t.related2Title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[14px] text-[#1a1a2e] mb-1">{t.related2Title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{t.related2Desc}</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src="/3.webp" alt={t.related3Title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[14px] text-[#1a1a2e] mb-1">{t.related3Title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{t.related3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
