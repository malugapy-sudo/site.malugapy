import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { FileText, Download } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function ContratosPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.contratosPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
       bgImage="/legal-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: t.breadcrumbLegal }, { label: t.breadcrumbContracts }]} />
      </div>

      <section className="py-16 bg-white mb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeading
            title={t.docTitle}
            subtitle={t.docSubtitle}
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="border border-slate-200 rounded-lg p-8 hover:shadow-xl transition-shadow flex items-start justify-between group">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange mr-5 flex-shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy mb-1">{t.residentialContract}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-3">{t.residentialContractDesc}</p>
                  <span className="text-xs font-bold text-slate-400">PDF • 1.2 MB</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-orange group-hover:text-white transition-colors" title="Download">
                <Download size={18} />
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-8 hover:shadow-xl transition-shadow flex items-start justify-between group">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue mr-5 flex-shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy mb-1">{t.businessContract}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-3">{t.businessContractDesc}</p>
                  <span className="text-xs font-bold text-slate-400">PDF • 1.5 MB</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-blue group-hover:text-white transition-colors" title="Download">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
