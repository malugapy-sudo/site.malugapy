/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowDown, Rocket, Headset, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function Hero({ dict }: { dict: any }) {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-brand-blue-dark">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: "url('/capa-maluga.jpeg')" }}
      />
      
      {/* Dynamic Animated Background Mesh - Subtle overlay over image */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-blue-light/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-orange/40 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Gradient Overlay to ensure text readability - Pure Dark Blue for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/80 to-brand-navy/50 z-10" />

      {/* Bottom Gradient Border Separator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#004ecd] via-[#ff6a00] to-[#004ecd] z-20" />

      <div className="container mx-auto px-6 z-20 text-center relative mt-16 max-w-5xl">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 leading-[1.1] text-white drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          dangerouslySetInnerHTML={{ __html: dict.hero.title }}
        />

        <motion.p 
          className="text-lg mb-12 max-w-3xl mx-auto text-white/80 leading-relaxed drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="#planos" onClick={() => trackEvent('clicou_cta_ver_planos_hero')} className="group relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#ff6a00] to-[#004ecd] text-white font-bold rounded-lg text-lg uppercase tracking-widest overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <span className="relative z-10 flex items-center">
              {dict.hero.cta_primary} <ArrowDown className="ml-3 group-hover:animate-bounce" size={20} />
            </span>
          </Link>
          <Link href="#diferenciais" onClick={() => trackEvent('clicou_cta_diferenciais_hero')} className="w-full sm:w-auto px-8 py-5 rounded-lg font-bold text-white border border-white/50 hover:bg-white/20 hover:border-white backdrop-blur-md transition-all text-lg uppercase tracking-wider shadow-lg">
            {dict.hero.cta_secondary}
          </Link>
        </motion.div>

        {/* Premium Features Badges */}
        <motion.div 
          className="mt-20 flex flex-wrap justify-center gap-6 text-sm md:text-base font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center bg-brand-navy/60 px-6 py-4 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all cursor-default shadow-2xl">
            <Rocket className="text-brand-orange mr-3" size={22} /> {dict.hero.feature1}
          </div>
          <div className="flex items-center bg-brand-navy/60 px-6 py-4 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all cursor-default shadow-2xl">
            <Headset className="text-brand-orange mr-3" size={22} /> {dict.hero.feature2}
          </div>
          <div className="flex items-center bg-brand-navy/60 px-6 py-4 rounded-lg backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all cursor-default shadow-2xl">
            <Gamepad2 className="text-brand-orange mr-3" size={22} /> {dict.hero.feature3}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
