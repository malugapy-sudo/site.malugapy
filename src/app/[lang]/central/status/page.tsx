import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { CheckCircle2, AlertTriangle, CalendarClock, Activity } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function StatusPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.statusPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/suporte-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.support, href: "/suporte" }, { label: dict.nav.status }]} />
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Global Status Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 flex items-center mb-16 shadow-lg shadow-green-100">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white mr-6 shadow-md shadow-green-500/30 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <CheckCircle2 size={32} className="relative z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-green-800 mb-1">{t.allOperational}</h2>
              <p className="text-green-600 font-medium">{t.allOperationalDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Status por Regiao */}
            <div>
              <div className="flex items-center mb-6">
                <Activity className="text-brand-navy mr-3" size={24} />
                <h3 className="text-2xl font-extrabold text-brand-navy">{t.statusByZone}</h3>
              </div>
              
              <div className="space-y-4">
                {/* Mock Regions */}
                {['Asunción', 'Central', 'Alto Paraná', 'Itapúa'].map((region) => (
                  <div key={region} className="flex items-center justify-between p-5 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold text-slate-700">{region}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-green-600 mr-3">{t.operational}</span>
                      <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mantenimientos Programados */}
            <div>
              <div className="flex items-center mb-6">
                <CalendarClock className="text-brand-navy mr-3" size={24} />
                <h3 className="text-2xl font-extrabold text-brand-navy">{t.maintenance}</h3>
              </div>
              
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-10 text-center flex flex-col items-center justify-center h-[calc(100%-3.5rem)] bg-slate-50">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-lg font-bold text-slate-700 mb-2">{t.noMaintenance}</h4>
                <p className="text-slate-500 text-sm">{t.noMaintenanceDesc}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Warning CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 mt-12">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-brand-orange rounded-full mb-6">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-2xl font-extrabold text-brand-navy mb-4">{t.connectionProblems}</h3>
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            {t.connectionProblemsDesc}
          </p>
          <Link
            href="/suporte/contato"
            className="inline-flex py-3 px-8 bg-brand-navy text-white font-bold rounded-lg shadow-lg hover:bg-brand-blue-dark transition-colors"
          >
            {t.contactSupport}
          </Link>
        </div>
      </section>
    </>
  );
}
