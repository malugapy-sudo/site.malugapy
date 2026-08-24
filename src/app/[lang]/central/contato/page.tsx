import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ContactForm } from "@/components/shared/contact-form";
import { MapPin, Phone, MessageCircle, Clock, Mail } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/middleware";

export default async function ContatoPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.contatoPage;

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        badge={t.badge}
       bgImage="/suporte-bg.png"
      />

      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <Breadcrumb dict={dict} items={[{ label: dict.nav.support, href: "/suporte" }, { label: dict.nav.contact }]} />
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Canales de Contacto */}
            <div>
              <h2 className="text-3xl font-extrabold text-brand-navy mb-8">{t.channelsTitle}</h2>

              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
                <a href="https://wa.me/+595991554700" target="_blank" className="group flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-colors">
                  <MessageCircle size={20} className="text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 group-hover:text-green-600 transition-colors">{t.whatsappTitle}</h3>
                    <p className="text-slate-400 text-sm">{t.whatsappDesc}</p>
                  </div>
                  <span className="text-sm font-bold text-green-600 flex-shrink-0">{t.chatNow} →</span>
                </a>

                <div className="flex items-center gap-4 px-6 py-5">
                  <Phone size={20} className="text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800">{t.callCenter}</h3>
                    <p className="text-slate-400 text-sm">{t.callCenterDesc}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-700 flex-shrink-0">{"(0XXX) XXX-XXX"}</span>
                </div>

                <div className="flex items-center gap-4 px-6 py-5">
                  <Mail size={20} className="text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800">{t.email}</h3>
                    <p className="text-slate-400 text-sm">{t.emailDesc}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-700 flex-shrink-0">{"soporte@malugatelecom.com"}</span>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-brand-navy mb-6 mt-12">{t.inPerson}</h2>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{t.headquartersTitle}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-2">
                      {t.headquartersAddress}<br/>
                      {t.headquartersCity}
                    </p>
                    <div className="flex items-center text-slate-400 text-sm font-medium">
                      <Clock size={14} className="mr-1.5" />
                      {t.businessHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-slate-50 rounded-2xl p-8">
              <h2 className="text-2xl font-extrabold text-brand-navy mb-2">{t.sendMessage}</h2>
              <p className="text-slate-500 mb-8">{t.sendMessageDesc}</p>
              <ContactForm dict={dict} />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
