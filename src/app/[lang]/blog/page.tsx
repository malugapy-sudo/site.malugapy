import Image from "next/image";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function BlogPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.blogPage;

  const blogPosts = [
    {
      title: dict.newLayout.blogPost1Title,
      image: "/1.webp",
      desc: dict.newLayout.blogPost1Desc
    },
    {
      title: dict.newLayout.blogPost2Title,
      image: "/2.webp",
      desc: dict.newLayout.blogPost2Desc
    },
    {
      title: dict.newLayout.blogPost3Title,
      image: "/3.webp",
      desc: dict.newLayout.blogPost3Desc
    },
    {
      title: dict.newLayout.blogPost4Title,
      image: "/4.webp",
      desc: dict.newLayout.blogPost4Desc
    },
  ];

  return (
    <>
      {/* Blog Article */}
      <section className="pt-28 pb-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">

          {/* Title with gradient */}
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-[#ff6a00] to-[#004ecd] bg-clip-text text-transparent">
              {t.articleTitle}
            </span>
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

      {/* Blog Dicas do Técnico - Same component as homepage */}
      <section className="py-16 md:py-24 bg-[#e8f2fc]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10 inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
            <img src={dict.newLayout.blogTitleImg} alt={dict.newLayout.blogTitleImgAlt} className="h-8 md:h-10 object-contain" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <div key={index} className="flex flex-col group cursor-pointer">
                <div className="rounded-2xl overflow-hidden mb-4 shadow-sm aspect-video">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-[#0a153b] text-base mb-2 group-hover:text-[#ff6a00] transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {post.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
