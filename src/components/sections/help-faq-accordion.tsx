"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function HelpFaqAccordion({ items }: FaqAccordionProps) {
  const displayItems = items.slice(0, 5);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    trackEvent('clicou_faq_pergunta', { indice: String(index) });
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 w-full">
      {displayItems.map((item, index) => (
        <div
          key={index}
          className="rounded-xl transition-all overflow-hidden bg-[#243f72]"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-5 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 text-[#ff6a00]">
                <HelpCircle size={20} className="stroke-[2.5px]" />
              </div>
              <span className="font-bold text-lg text-white pr-4">
                {item.question}
              </span>
            </div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed pl-12 pr-6">
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
