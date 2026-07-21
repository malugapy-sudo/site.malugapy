"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

interface DeviceInfo {
  isAndroid: boolean;
  isIOS: boolean;
  isDesktop: boolean;
  isPWA: boolean;
  isMobile: boolean;
  /** Whether PWA mode was manually overridden by the user */
  isManualOverride: boolean;
  /** Toggle PWA mode manually. Overrides automatic detection. */
  toggleForceMobile: () => void;
}

const DeviceContext = createContext<DeviceInfo>({
  isAndroid: false,
  isIOS: false,
  isDesktop: true,
  isPWA: false,
  isMobile: false,
  isManualOverride: false,
  toggleForceMobile: () => {},
});

export function useDevice() {
  return useContext(DeviceContext);
}

// null = no override (use auto), true = force mobile, false = force desktop
type OverrideState = null | boolean;

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [realDevice, setRealDevice] = useState({
    isAndroid: false,
    isIOS: false,
    isDesktop: true,
    isPWA: false,
    isMobile: false,
  });

  // null means "use automatic detection", true/false means manual override
  const [override, setOverride] = useState<OverrideState>(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isMobile = isAndroid || isIOS || /Mobile/i.test(ua);
    const isDesktop = !isMobile;
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setRealDevice({ isAndroid, isIOS, isDesktop, isPWA, isMobile });

    // Restore manual override from sessionStorage
    try {
      const saved = sessionStorage.getItem("dev-pwa-override");
      if (saved === "true") setOverride(true);
      else if (saved === "false") setOverride(false);
      // if null or missing, keep null (auto mode)
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const toggleForceMobile = useCallback(() => {
    setOverride((prev) => {
      // Determine current effective mobile state
      const currentlyMobile = prev !== null ? prev : realDevice.isMobile;
      // Toggle to the opposite
      const next = !currentlyMobile;
      try {
        sessionStorage.setItem("dev-pwa-override", String(next));
      } catch {
        // sessionStorage unavailable
      }
      return next;
    });
  }, [realDevice.isMobile]);

  // Effective mobile state: manual override takes priority, otherwise auto
  const effectiveMobile = override !== null ? override : realDevice.isMobile;

  const device: DeviceInfo = {
    isAndroid: effectiveMobile ? (realDevice.isAndroid || override === true) : false,
    isIOS: effectiveMobile ? realDevice.isIOS : false,
    isDesktop: !effectiveMobile,
    isPWA: effectiveMobile ? (realDevice.isPWA || override === true) : false,
    isMobile: effectiveMobile,
    isManualOverride: override !== null,
    toggleForceMobile,
  };

  return (
    <DeviceContext.Provider value={device}>
      {children}
    </DeviceContext.Provider>
  );
}
