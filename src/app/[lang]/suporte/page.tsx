import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { QuickLinks } from "@/components/shared/quick-links";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PwaInstallBanner } from "@/components/pwa/install-banner";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function SuportePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.suportePage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/suporte-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.support }]} />
      </div>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            title={dict.nav.portal}
            subtitle={t.contactSubtitle}
          />
          <QuickLinks lang={lang} dict={dict} />
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeading
            title={t.faqTitle}
            subtitle={t.faqSubtitle}
          />
          <FaqAccordion items={t.faqs} />

          {/* Banner Instalar PWA — CTA natural no fim da página */}
          <div className="mt-16 max-w-3xl mx-auto">
            <PwaInstallBanner dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
