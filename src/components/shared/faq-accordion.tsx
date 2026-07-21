"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    trackEvent('clicou_faq_pergunta', { indice: String(index) });
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg border transition-all overflow-hidden ${
            openIndex === index ? "border-brand-orange/30 shadow-lg" : "border-slate-200 shadow-sm"
          }`}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-6 text-left group"
          >
            <span className={`font-bold text-base pr-4 transition-colors ${
              openIndex === index ? "text-brand-orange" : "text-brand-navy group-hover:text-brand-blue"
            }`}>
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-brand-orange" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
