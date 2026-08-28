import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";
import { YouTubePlayer } from "@/components/shared/youtube-player";

export default async function InternetLentaPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  
  const post = dict.blogPosts.blogPost2;

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
    },
  ];

  return (
    <>
      <section className="pt-28 pb-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-[#ff6a00] to-[#004ecd] bg-clip-text text-transparent">
              {post.title}
            </span>
          </h1>

          <p className="text-sm text-slate-500 mb-6">{post.date}</p>

          <YouTubePlayer
            thumbnailSrc={dict.newLayout.blogPost2Img}
            videoId="kKpGt-EmGps"
            alt={post.title}
          />

          <div className="prose prose-slate max-w-none text-[14px] md:text-[15px] leading-relaxed">
            <p className="whitespace-pre-wrap">{post.p1}</p>
            <p className="mt-4">{post.p2}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{post.sub1}</h3>
            <p>{post.sub1p}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{post.sub1li1}</li>
              <li>{post.sub1li2}</li>
              <li>{post.sub1li3}</li>
              <li>{post.sub1li4}</li>
              <li>{post.sub1li5}</li>
            </ul>
            <p className="mt-4">{post.sub1p2}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{post.sub2}</h3>
            <p>{post.sub2p}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li dangerouslySetInnerHTML={{ __html: post.sub2li1 }}></li>
              <li dangerouslySetInnerHTML={{ __html: post.sub2li2 }}></li>
            </ul>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{post.sub3}</h3>
            <p>{post.sub3p}</p>
            <p className="mt-4">{post.sub3p2}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{post.sub4}</h3>
            <p>{post.sub4p}</p>

            <h3 className="text-[15px] md:text-base font-bold text-[#1a1a2e] mt-6 mb-2">{post.sub5}</h3>
            <p>{post.sub5p}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#e8f2fc]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10 inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
            <img src={dict.newLayout.blogTitleImg} alt={dict.newLayout.blogTitleImgAlt} className="h-8 md:h-10 object-contain" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((bp, index) => {
              const content = (
                <>
                  <div className="rounded-2xl overflow-hidden mb-4 shadow-sm aspect-video">
                    <img src={bp.image} alt={bp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-[#0a153b] text-base mb-2 group-hover:text-[#ff6a00] transition-colors">
                    {bp.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {bp.desc}
                  </p>
                </>
              );

              return bp.href ? (
                <Link key={index} href={bp.href} className="flex flex-col group cursor-pointer">
                  {content}
                </Link>
              ) : (
                <div key={index} className="flex flex-col group cursor-pointer">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
