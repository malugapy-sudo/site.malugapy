/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Download, Smartphone, Zap, WifiOff } from "lucide-react";
import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDeviceDetect";
import { trackEvent } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PwaInstallBannerProps {
  dict: any;
}

export function PwaInstallBanner({ dict }: PwaInstallBannerProps) {
  const { isMobile, isPWA } = useDevice();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Checa se já está instalado (real ou simulado)
    if (isPWA || isMobile || window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isPWA, isMobile]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    trackEvent('clicou_instalar_app_banner');
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  // Não mostra se já instalou
  if (isInstalled) return null;

  const t = dict.pwaInstall || {
    title: "Instale o App Maluga",
    subtitle: "Acesso rápido direto da tela inicial do seu celular. Sem precisar abrir o navegador.",
    btn: "Instalar Agora",
    feat1: "Acesso rápido",
    feat2: "Funciona offline",
    feat3: "Leve e rápido",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#001f52] via-[#003da3] to-[#004ecd] rounded-2xl p-8 md:p-12 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff6a00]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#004ecd]/30 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 flex items-center gap-6 md:gap-8">
        {/* Icon */}
        <div className="flex-shrink-0 hidden md:block">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl p-2">
            <Image
              src="/LogoMaluga.png"
              alt="Maluga Telecom App"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg md:text-2xl font-extrabold text-white mb-1.5">
            {t.title}
          </h3>
          <p className="text-blue-200 text-sm mb-4 max-w-lg">
            {t.subtitle}
          </p>

          {/* Mini features */}
          <div className="flex flex-wrap gap-4 mb-5">
            <span className="flex items-center gap-1.5 text-xs text-blue-100 font-medium">
              <Smartphone size={14} className="text-[#ff6a00]" />
              {t.feat1}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-blue-100 font-medium">
              <WifiOff size={14} className="text-[#ff6a00]" />
              {t.feat2}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-blue-100 font-medium">
              <Zap size={14} className="text-[#ff6a00]" />
              {t.feat3}
            </span>
          </div>

          {/* Install button — laranja sólido para contrastar com fundo azul */}
          {deferredPrompt ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleInstall}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#ff6a00] text-white font-bold rounded-xl uppercase tracking-wider text-sm shadow-lg shadow-orange-500/30 hover:bg-[#e55f00] transition-all"
            >
              <Download size={18} strokeWidth={2.5} />
              {t.btn}
            </motion.button>
          ) : (
            <p className="text-blue-300/60 text-xs font-medium">
              {t.browserHint || "Abra no navegador do celular para instalar"}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
