"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export interface PlanData {
  id: number;
  type: string;
  megas: string;
  price: string;
  features: string[];
  popular?: boolean;
  whatsappLink?: string;
  ctaLabel: string;
}

interface PlanCardProps {
  plan: PlanData;
  index?: number;
  compact?: boolean;
  dict?: any;
}

export function PlanCard({ plan, index = 0, compact = false, dict }: PlanCardProps) {
  const whatsappLink = plan.whatsappLink || `https://wa.me/+595991554700?text=Hola,%20me%20interesa%20el%20plan%20${plan.type}%20de%20${plan.megas}MB`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, ease: "easeOut" }}
      className={`relative bg-white transition-all duration-300 flex flex-col h-full rounded-xl ${
        plan.popular ? "overflow-hidden" : ""
      } ${
        plan.popular
          ? "border border-slate-200 shadow-md z-20"
          : "border border-slate-200 shadow-sm hover:shadow-lg z-10"
      }`}
    >
      {plan.popular && <div className="h-1 bg-gradient-to-r from-[#004ecd] via-[#ff6a00] to-[#004ecd]" />}

      <div className={compact ? "p-5" : "p-6 md:p-8"}>
      {plan.popular && (
        <span className="absolute top-4 right-4 inline-flex items-center bg-gradient-to-r from-[#ff6a00] to-[#004ecd] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {dict?.planCard?.popular || 'Más Vendido'}
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          {plan.type}
        </h3>

        <div className="flex items-baseline gap-1.5 mb-1">
          <span className={`text-5xl md:text-6xl font-extrabold tracking-tight ${
            plan.popular ? "text-brand-orange" : "text-slate-900"
          }`}>
            {plan.megas}
          </span>
          <span className="text-lg font-semibold text-slate-400">
            {dict?.planCard?.megas || 'MEGAS'}
          </span>
        </div>

        {!compact && (
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-sm text-slate-500">
              {dict?.planCard?.pricePrefix || 'Por apenas'}
            </span>
            <span className="text-sm text-slate-500">
              {dict?.planCard?.currency || 'Gs'}
            </span>
            <span className="text-2xl font-bold text-slate-800">
              {plan.price}
            </span>
            <span className="text-sm text-slate-400">
              {dict?.planCard?.perMonth || '/mes'}
            </span>
          </div>
        )}
      </div>

      {!compact && (
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                plan.popular ? "bg-orange-100 text-brand-orange" : "bg-slate-100 text-slate-500"
              }`}>
                <Check size={12} className="stroke-[3]" />
              </div>
              <span className="text-sm text-slate-600">{feature.trim()}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={whatsappLink}
        target="_blank"
        onClick={() => trackEvent('clicou_contratar_plano', { plano: plan.type, megas: String(plan.megas) })}
        className={`w-full py-3.5 rounded-lg font-semibold text-center text-sm transition-all block ${
          plan.popular
            ? "bg-gradient-to-r from-[#ff6a00] to-[#004ecd] text-white hover:opacity-90"
            : "bg-brand-blue text-white hover:bg-brand-blue-dark"
        }`}
      >
        {plan.ctaLabel}
      </Link>
      </div>
    </motion.div>
  );
}
