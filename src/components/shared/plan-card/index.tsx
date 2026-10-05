"use client"

import type { PlanCardProps } from "@/Typings/interfaces"
import { getPlanWhatsAppLink, trackPlanHire } from "./Controller"
import { PlanCardView } from "./View"

export type { PlanData } from "@/Typings/interfaces"

export function PlanCard({ plan, index = 0, compact = false, dict }: PlanCardProps) {
  const whatsappLink = getPlanWhatsAppLink(plan)

  function onHire() {
    trackPlanHire(plan)
  }

  return (
    <PlanCardView
      plan={plan}
      index={index}
      compact={compact}
      dict={dict}
      whatsappLink={whatsappLink}
      onHire={onHire}
    />
  )
}
