/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Download } from "lucide-react";
import { useDevice } from "@/hooks/useDeviceDetect";
import { trackEvent } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function FooterInstallLink({ dict }: { dict: any }) {
  const { isMobile, isPWA } = useDevice();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isPWA || isMobile || window.matchMedia("(display-mode: standalone)").matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isPWA, isMobile]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    trackEvent('clicou_instalar_app_footer');
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  // Só mostra se o app NÃO está instalado e o prompt está disponível
  if (!deferredPrompt) return null;

  const label = dict?.pwaInstall?.btn || "Instalar App";

  return (
    <button
      onClick={handleInstall}
      className="text-blue-200 hover:text-white transition-colors font-medium text-sm flex items-center gap-1.5"
    >
      <Download size={14} className="text-brand-orange" />
      {label}
    </button>
  );
}
