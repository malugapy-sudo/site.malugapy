"use client";

import Link from "next/link";
import { Home, WifiOff } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-navy relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 max-w-2xl text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-xl text-brand-orange">
            <WifiOff size={48} />
          </div>

          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 drop-shadow-lg">
            404
          </h1>
          
          <h2 className="text-3xl font-bold text-white mb-6">
            Página no encontrada
          </h2>
          
          <p className="text-slate-400 text-lg mb-12">
            La página que estás buscando puede haber sido eliminada, cambió de nombre o está temporalmente no disponible.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white rounded-full font-extrabold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <Home size={20} className="mr-3" />
            Volver al Inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
