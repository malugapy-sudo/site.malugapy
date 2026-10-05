export interface PlanData {
  id: number
  type: string
  megas: string
  uploadMbps: string
  price: string
  features: string[]
  popular?: boolean
  whatsappLink?: string
  ctaLabel: string
}

export interface PlanCardDictionary {
  planCard?: {
    popular?: string
    pricePrefix?: string
    currency?: string
    perMonth?: string
    downloadLabel?: string
    uploadLabel?: string
  }
}

export interface PlanCardProps {
  plan: PlanData
  index?: number
  compact?: boolean
  dict?: PlanCardDictionary
}

export interface PlanCardViewProps {
  plan: PlanData
  index: number
  compact: boolean
  dict?: PlanCardDictionary
  whatsappLink: string
  onHire: () => void
}

export interface ContactFormDictionary {
  contactForm?: Record<string, string>
}

export interface ContactFormProps {
  compact?: boolean
  dict?: ContactFormDictionary
}

export interface PlanCalculatorDictionary {
  planCalculator?: Record<string, string>
}
