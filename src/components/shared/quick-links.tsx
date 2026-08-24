"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, MessageCircle, Wifi, Activity, HelpCircle, Gauge, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/middleware";

interface QuickLinksProps {
  maxItems?: number;
  lang?: Locale;
  dict?: any;
}

export function QuickLinks({ maxItems, lang, dict }: QuickLinksProps) {
  const quickLinksData = [
    {
      id: "invoice",
      icon: <FileText size={20} />,
      title: dict?.quickLinks?.invoice?.title || '2ª Vía de Factura',
      desc: dict?.quickLinks?.invoice?.desc || 'Emití tu boleta rápidamente',
      href: "/central",
      color: "text-brand-orange",
    },
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} />,
      title: dict?.quickLinks?.whatsapp?.title || 'WhatsApp Soporte',
      desc: dict?.quickLinks?.whatsapp?.desc || 'Atención rápida y humana',
      href: "https://wa.me/+595991554700",
      external: true,
      color: "text-green-500",
    },
    {
      id: "networkStatus",
      icon: <Activity size={20} />,
      title: dict?.quickLinks?.networkStatus?.title || 'Status de la Red',
      desc: dict?.quickLinks?.networkStatus?.desc || 'Consultá mantenimientos en tu zona',
      href: "/suporte/status",
      color: "text-brand-blue",
    },
    {
      id: "speedTest",
      icon: <Gauge size={20} />,
      title: dict?.quickLinks?.speedTest?.title || 'Test de Velocidad',
      desc: dict?.quickLinks?.speedTest?.desc || 'Verificá la velocidad de tu conexión',
      href: "/suporte/velocidade",
      color: "text-purple-500",
    },
    {
      id: "helpCenter",
      icon: <HelpCircle size={20} />,
      title: dict?.quickLinks?.helpCenter?.title || 'Central de Ayuda',
      desc: dict?.quickLinks?.helpCenter?.desc || 'Preguntas frecuentes y tutoriales',
      href: "/suporte",
      color: "text-sky-500",
    },
    {
      id: "hirePlan",
      icon: <Wifi size={20} />,
      title: dict?.quickLinks?.hirePlan?.title || 'Contratar Plan',
      desc: dict?.quickLinks?.hirePlan?.desc || 'Conocé nuestros planes de fibra',
      href: "/planos",
      color: "text-brand-orange",
    }
  ];

  const items = maxItems ? quickLinksData.slice(0, maxItems) : quickLinksData;

  const getHref = (link: { href: string; external?: boolean }) => {
    if (link.external) return link.href;
    if (lang) return `/${lang}${link.href}`;
    return link.href;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((link, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04, duration: 0.3 }}
        >
          <Link
            href={getHref(link)}
            target={link.external ? "_blank" : undefined}
            onClick={() => trackEvent('clicou_atalho_' + link.id)}
            className="group flex items-start gap-3 py-4 px-5 rounded-xl bg-white/70 hover:bg-white border border-slate-100/80 hover:border-slate-200 transition-all duration-200 hover:-translate-y-px h-full"
          >
            <span className={`${link.color} flex-shrink-0 mt-0.5`}>
              {link.icon}
            </span>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-sm text-brand-navy block leading-snug">
                {link.title}
              </span>
              <p className="text-slate-400 text-xs leading-snug mt-1 line-clamp-2">
                {link.desc}
              </p>
            </div>
            <ChevronRight
              size={14}
              className="text-slate-300 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
