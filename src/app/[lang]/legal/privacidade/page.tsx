import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function PrivacidadePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.privacidadePage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
       bgImage="/legal-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-4xl">
        <Breadcrumb dict={dict} items={[{ label: t.breadcrumbLegal }, { label: t.breadcrumbPrivacy }]} />
      </div>

      <section className="py-12 bg-white mb-20">
        <div className="container mx-auto px-6 max-w-4xl prose prose-slate prose-lg">
          <h2>{t.section1Title}</h2>
          <p>{t.section1Text}</p>

          <h2>{t.section2Title}</h2>
          <ul>
            {t.section2Items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>{t.section3Title}</h2>
          <p>{t.section3Text}</p>

          <h2>{t.section4Title}</h2>
          <p>{t.section4Text}</p>

          <h2>{t.section5Title}</h2>
          <p>{t.section5Text}</p>
          
          <p className="text-sm text-slate-400 mt-12 pt-6 border-t border-slate-100">
            {t.lastUpdate}
          </p>
        </div>
      </section>
    </>
  );
}
