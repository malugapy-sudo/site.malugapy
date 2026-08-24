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
          
          {/* Intro */}
          <p>{t.intro}</p>
          <p>{t.introLegal}</p>

          <hr />

          {/* Section 1 */}
          <h2>{t.s1Title}</h2>
          <p>{t.s1Intro}</p>

          <h3>{t.s1aTitle}</h3>
          <ul>
            {t.s1aItems.map((item: string, i: number) => (
              <li key={i}><strong>{item.split(":")[0]}:</strong>{item.substring(item.indexOf(":") + 1)}</li>
            ))}
          </ul>

          <h3>{t.s1bTitle}</h3>
          <p>{t.s1bIntro}</p>
          <ul>
            {t.s1bItems.map((item: string, i: number) => (
              <li key={i}><strong>{item.split(":")[0]}:</strong>{item.substring(item.indexOf(":") + 1)}</li>
            ))}
          </ul>

          {/* Section 2 */}
          <h2>{t.s2Title}</h2>
          <p>{t.s2Intro}</p>
          <ul>
            {t.s2Items.map((item: string, i: number) => (
              <li key={i}><strong>{item.split(":")[0]}:</strong>{item.substring(item.indexOf(":") + 1)}</li>
            ))}
          </ul>

          {/* Section 3 */}
          <h2>{t.s3Title}</h2>
          <p>{t.s3Intro}</p>
          <ul>
            {t.s3Items.map((item: string, i: number) => (
              <li key={i}><strong>{item.split(":")[0]}:</strong>{item.substring(item.indexOf(":") + 1)}</li>
            ))}
          </ul>

          {/* Section 4 */}
          <h2>{t.s4Title}</h2>
          <p>{t.s4Intro}</p>
          <ul>
            {t.s4Items.map((item: string, i: number) => (
              <li key={i}><strong>{item.split(":")[0]}:</strong>{item.substring(item.indexOf(":") + 1)}</li>
            ))}
          </ul>
          <p>{t.s4Outro}</p>

          {/* Section 5 */}
          <h2>{t.s5Title}</h2>
          <p>{t.s5Text}</p>

          {/* Section 6 */}
          <h2>{t.s6Title}</h2>
          <p>{t.s6Text}</p>

          {/* Section 7 */}
          <h2>{t.s7Title}</h2>
          <p>{t.s7Text}</p>

          {/* Section 8 */}
          <h2>{t.s8Title}</h2>
          <p>{t.s8Intro}</p>
          <ul>
            {t.s8Items.map((item: string, i: number) => (
              <li key={i}><strong>{item.split(":")[0]}:</strong>{item.substring(item.indexOf(":") + 1)}</li>
            ))}
          </ul>

          <p className="text-sm text-slate-400 mt-12 pt-6 border-t border-slate-100">
            {t.lastUpdate}
          </p>
        </div>
      </section>
    </>
  );
}
