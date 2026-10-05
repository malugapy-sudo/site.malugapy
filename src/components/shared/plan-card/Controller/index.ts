import { trackEvent } from "@/lib/analytics"
import type { PlanData } from "@/Typings/interfaces"
import { planNames } from "../Model"

export function getPlanWhatsAppLink(plan: PlanData): string {
  if (plan.whatsappLink) {
    return plan.whatsappLink
  }

  return getPlanWhatsAppLinkForSpeed(plan.id, plan.megas)
}

export function getPlanWhatsAppLinkForSpeed(planId: number, speedMbps: string): string {
  const planName = planNames[planId]
  const message = `Hola #MALUGAPY, me interesa el plan ${planName} de ${speedMbps} Mbps`

  return `https://wa.me/595991554700?text=${encodeURIComponent(message)}`
}

export function trackPlanHire(plan: PlanData): void {
  trackEvent("clicou_contratar_plano", {
    plano: plan.type,
    megas: plan.megas,
  })
}
