import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { QuickLinks } from "@/components/shared/quick-links";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function CentralPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.centralPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
        bgImage="/central-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.portal }]} />
      </div>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            title={t.whatCanIDo}
            subtitle={t.whatCanIDoDesc}
          />
          <QuickLinks lang={lang} dict={dict} />
        </div>
      </section>
    </>
  );
}
