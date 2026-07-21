"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeading({ title, subtitle, badge, align = "center", light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-16 lg:mb-20 ${align === "center" ? "text-center" : "text-left"}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-block py-1.5 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-4 ${
            light
              ? "bg-white/10 text-blue-200 border border-white/20"
              : "bg-brand-orange/10 text-brand-orange border border-brand-orange/20"
          }`}
        >
          {badge}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${
          light ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </motion.h2>

      {/* Gradient accent line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className={`h-0.5 w-16 rounded-full bg-gradient-to-r from-[#004ecd] to-[#ff6a00] mb-5 ${align === "center" ? "mx-auto" : ""}`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-base md:text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""} ${
            light ? "text-white/80" : "text-slate-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
