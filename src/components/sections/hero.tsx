/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Hero({ dict }: { dict: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    dict.newLayout.banner1,
    dict.newLayout.banner2,
    dict.newLayout.banner3
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-brand-blue-dark group pt-[60px] lg:pt-0">
      <div className="relative w-full h-full">
        <AnimatePresence initial={false}>
          {banners.map((banner, idx) => (
            idx === currentIndex && (
              <motion.img
                key={banner}
                src={banner}
                alt={`Banner ${idx + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover z-10"
                fetchPriority={idx === 0 ? "high" : "auto"}
              />
            )
          ))}
        </AnimatePresence>
        
        {/* Render a hidden static image to give the container its dimensions */}
        <img src={banners[0]} alt="Spacer" className="w-full h-auto invisible pointer-events-none relative z-0" />
      </div>
      
      {/* Bottom Gradient Border Separator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#004ecd] via-[#ff6a00] to-[#004ecd] z-20" />

      {/* Navigation dots */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all shadow-lg ${
              idx === currentIndex 
                ? 'bg-white scale-125 ring-2 ring-white/50' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir para a imagem ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
