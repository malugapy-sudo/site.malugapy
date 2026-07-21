/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDevice } from "@/hooks/useDeviceDetect";
import { trackEvent } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed-v2";
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

interface InstallPromptProps {
  dict?: any;
}

export function InstallPrompt({ dict }: InstallPromptProps) {
  const { isMobile, isPWA } = useDevice();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isDismissed = useCallback(() => {
    try {
      const dismissed = localStorage.getItem(DISMISS_KEY);
      if (!dismissed) return false;
      const timestamp = parseInt(dismissed, 10);
      if (Date.now() - timestamp < DISMISS_DURATION) return true;
      localStorage.removeItem(DISMISS_KEY);
      return false;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!isMobile || isPWA || isDismissed()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isMobile, isPWA, isDismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    trackEvent('clicou_instalar_app_prompt');
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    trackEvent('fechou_prompt_instalar_app');
    setIsVisible(false);
    setDeferredPrompt(null);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch {
      // localStorage unavailable
    }
  };

  const installText =
    dict?.pwa?.install || "Instalar Maluga Telecom";
  const installButton = dict?.pwa?.installButton || "Instalar";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed left-3 right-3 top-24 z-50 rounded-2xl bg-white/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-200/60"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {/* App icon */}
            <div className="relative flex-shrink-0 w-10 h-10 rounded-xl overflow-hidden shadow-md ring-1 ring-slate-200/50">
              <Image
                src="/LogoMaluga.png"
                alt="Maluga Telecom"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {installText}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                maluga.com.py
              </p>
            </div>

            {/* Install button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleInstall}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-shadow"
            >
              <Download size={14} strokeWidth={2.5} />
              {installButton}
            </motion.button>

            {/* Dismiss */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleDismiss}
              className="flex-shrink-0 p-1.5 rounded-full text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
