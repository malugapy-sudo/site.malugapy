"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  bgImage?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, subtitle, badge, bgImage, children }: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-brand-navy overflow-hidden">
      {/* Optional Background Image */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
      )}

      {/* Gradient Overlay to ensure text readability - Pure Dark Blue */}
      {bgImage && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/80 to-brand-navy/50" />
      )}

      {/* Defined Geometric Accents (instead of blurred smoky lighting) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Sharp diagonal orange cut */}
        <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[200%] bg-gradient-to-bl from-brand-orange/30 to-brand-orange/5 transform rotate-[25deg] border-l-2 border-brand-orange/40 mix-blend-screen" />
        {/* Sharp diagonal blue cut */}
        <div className="absolute top-[-50%] left-[-20%] w-[50%] h-[200%] bg-gradient-to-br from-brand-blue-light/20 to-transparent transform -rotate-[15deg] border-r border-brand-blue-light/30 mix-blend-screen" />
      </div>

      {/* Bottom Gradient Border Separator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#004ecd] via-[#ff6a00] to-[#004ecd] z-20" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center py-2 px-5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange-light text-sm font-bold tracking-widest mb-6 uppercase backdrop-blur-md"
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>

    </section>
  );
}
