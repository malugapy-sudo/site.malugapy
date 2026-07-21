/**
 * Analytics — Eventos Personalizados
 * 
 * Utilitário central para rastreamento de eventos.
 * Funciona com Microsoft Clarity e Google Analytics (gtag).
 * 
 * Uso:
 *   import { trackEvent } from "@/lib/analytics";
 *   trackEvent("clicou_whatsapp_flutuante");
 */

// Tipagem global para Clarity e gtag
declare global {
  interface Window {
    clarity?: (method: string, ...args: string[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara um evento personalizado para todas as plataformas de analytics.
 * 
 * @param eventName - Nome do evento em português snake_case (ex: "clicou_cta_hero")
 * @param params - Parâmetros adicionais opcionais (ex: { plano: "500megas" })
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  // Microsoft Clarity
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", eventName);
  }

  // Google Analytics (gtag) — pronto para quando for adicionado
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }

  // Debug em desenvolvimento
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 [Analytics] ${eventName}`, params || "");
  }
}
