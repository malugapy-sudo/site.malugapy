"use client";

import { useEffect } from "react";
import { useDevice } from "@/hooks/useDeviceDetect";

export function ServiceWorkerRegistrar() {
  const { isAndroid } = useDevice();

  useEffect(() => {
    if (isAndroid && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, [isAndroid]);

  return null;
}
