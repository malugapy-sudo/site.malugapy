/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Gauge, ShieldCheck, Wifi, Wrench } from "lucide-react";

export function Advantages({ dict }: { dict: any }) {
  const advantages = [
    {
      icon: <Gauge size={32} className="text-brand-orange" />,
      title: dict.advantages.items.speed.title,
      desc: dict.advantages.items.speed.desc,
    },
    {
      icon: <Wrench size={32} className="text-brand-blue" />,
      title: dict.advantages.items.install.title,
      desc: dict.advantages.items.install.desc,
    },
    {
      icon: <ShieldCheck size={32} className="text-brand-orange" />,
      title: dict.advantages.items.security.title,
      desc: dict.advantages.items.security.desc,
    },
    {
      icon: <Wifi size={32} className="text-brand-blue" />,
      title: dict.advantages.items.wifi.title,
      desc: dict.advantages.items.wifi.desc,
    }
  ];

  return (
    <section id="diferenciais" className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight"
          >
            {dict.advantages.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg"
          >
            {dict.advantages.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv, index) => {
              const isLastCol = index === advantages.length - 1;
              const isFirstRow = index < 2;
              // On md (2-col): right column items (odd index) have no right border; bottom row has no bottom border
              // On lg (4-col): last item has no right border; no bottom borders needed
              const borderClasses = [
                // Mobile: horizontal dividers between items (all except last get bottom border)
                isLastCol ? "" : "border-b border-slate-100",
                // md 2-col: vertical divider on left column items, bottom divider on top row
                "md:border-b-0",
                index % 2 === 0 ? "md:border-r md:border-slate-100" : "md:border-r-0",
                isFirstRow ? "md:border-b md:border-b-slate-100" : "",
                // lg 4-col: every item except last gets right border, no bottom borders
                "lg:border-b-0",
                isLastCol ? "lg:border-r-0" : "lg:border-r lg:border-r-slate-100",
              ].join(" ");

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ease: "easeOut", duration: 0.5 }}
                  whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
                  className={`p-8 group transition-colors ${borderClasses}`}
                >
                  <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                    {adv.icon}
                  </div>
                  <h3 className="font-bold text-lg text-brand-navy mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {adv.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
