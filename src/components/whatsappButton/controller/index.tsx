"use client"

import { useEffect, useRef, useState } from "react"
import { Message } from "../model"

type Lang = "pt" | "es" | "en";

export const useWhatsAppController = (lang: Lang) => {

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [typing, setTyping] = useState(false)
  const [step, setStep] = useState(1)
  const [input, setInput] = useState("")

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [companyPhone, setCompanyPhone] = useState("") 
  const [service, setService] = useState("")
  const [documento, setDocumento] = useState("")
  const [phoneClient, setPhoneClient] = useState("")

  const chatRef = useRef<HTMLDivElement>(null)

  const phone = "595991554700"

  const texts = {
  pt: {
    welcome: "Olá! Bem-vindo à Maluga SA!",
    askName: "Qual é o seu nome?",
    niceToMeet: (name: string) => `Prazer, ${name}! 😊`,
    askChoice: "Você deseja contratar nossos serviços?",
    askCompanyPhone: "Agora me informe o telefone da empresa com DDD 📱",
    invalidPhone: "Número inválido. Digite um telefone com DDD válido (10 ou 11 dígitos).",
    askService: "Qual serviço você precisa?",
    invalidDoc: "CPF inválido. Por favor, digite um CPF válido (11 dígitos).",
    askClientPhone: "Agora me informe seu telefone com DDD 📱",
    sending: "Perfeito! Estou enviando seus dados para nosso time...",
    redirecting: "Agora vou te direcionar para nosso atendimento no WhatsApp 🚀",
    company: "Empresa",
    companyName: "Perfeito! Qual o nome da sua empresa?",
    person: "Pessoa Física",
    needData: "Certo! Agora preciso de alguns dados para te ajudar melhor 😊",
    askDoc: "Digite seu CPF (somente números)",
    docLabel: "CPF",
    services: ["Atendimento", "Cobrança", "Suporte", "Vendas", "Outros"],
    sendBtn: "Enviar",
    restart: "🔄 Voltar ao início",
    typing: "digitando...",
    companyBtn: "Empresa",
    personBtn: "Pessoa Física",
  },

  es: {
    welcome: "¡Hola! ¡Bienvenido a Maluga SA!",
    askName: "¿Cuál es su nombre?",
    niceToMeet: (name: string) => `Mucho gusto, ${name}! 😊`,
    askChoice: "¿Desea contratar nuestros servicios?",
    askCompanyPhone: "Ahora indíqueme el teléfono de la empresa con código de área 📱",
    invalidPhone: "Número inválido. Introduzca un teléfono válido (entre 7 y 15 dígitos).",
    askService: "¿Qué servicio necesita?",
    invalidDoc: "Cédula de Identidad inválida. Ingrese un número de CI válido (entre 5 y 8 dígitos).",
    askClientPhone: "Ahora indíqueme su teléfono con código de área 📱",
    sending: "Perfecto. Estoy enviando sus datos a nuestro equipo...",
    redirecting: "Ahora lo voy a dirigir a nuestro WhatsApp 🚀",
    company: "Empresa",
    companyName: "Perfecto. ¿Cuál es el nombre de su empresa?",
    person: "Persona Física",
    needData: "Perfecto. Necesito algunos datos 😊",
    askDoc: "Ingrese su número de Cédula de Identidad (C.I.)",
    docLabel: "C.I.",
    services: ["Atención al cliente", "Cobranza", "Soporte técnico", "Ventas", "Otros"],
    sendBtn: "Enviar",
    restart: "🔄 Volver al inicio",
    typing: "escribiendo...",
    companyBtn: "Empresa",
    personBtn: "Persona Física",
  },

  en: {
    welcome: "Hello! Welcome to Maluga SA!",
    askName: "What is your name?",
    niceToMeet: (name: string) => `Nice to meet you, ${name}! 😊`,
    askChoice: "Would you like to hire our services?",
    askCompanyPhone: "Please enter your company's phone number with area code 📱",
    invalidPhone: "Invalid phone number. Please enter a valid number.",
    askService: "Which service do you need?",
    invalidDoc: "Invalid document number.",
    askClientPhone: "Please enter your phone number with area code 📱",
    sending: "Perfect! I'm sending your information to our team...",
    redirecting: "I'll redirect you to our WhatsApp now 🚀",
    company: "Company",
    companyName: "Great! What is your company name?",
    person: "Individual",
    needData: "Great! I need a few details 😊",
    askDoc: "Enter your ID document number",
    docLabel: "Document",
    services: ["Customer Service", "Billing", "Tech Support", "Sales", "Other"],
    sendBtn: "Send",
    restart: "🔄 Start over",
    typing: "typing...",
    companyBtn: "Company",
    personBtn: "Individual",
  },
} as const;

const t = texts[lang];

  // Document validation per locale
  const isValidDocument = (doc: string) => {
    const clean = doc.replace(/\D/g, "")

    if (lang === "pt") {
      // CPF brasileiro: 11 dígitos com validação de dígitos verificadores
      if (clean.length !== 11 || /^(\d)\1+$/.test(clean)) return false
      let sum = 0, rest
      for (let i = 1; i <= 9; i++) sum += parseInt(clean.substring(i - 1, i)) * (11 - i)
      rest = (sum * 10) % 11
      if (rest === 10 || rest === 11) rest = 0
      if (rest !== parseInt(clean.substring(9, 10))) return false
      sum = 0
      for (let i = 1; i <= 10; i++) sum += parseInt(clean.substring(i - 1, i)) * (12 - i)
      rest = (sum * 10) % 11
      if (rest === 10 || rest === 11) rest = 0
      return rest === parseInt(clean.substring(10, 11))
    }

    if (lang === "es") {
      // Cédula de Identidad paraguaya: entre 5 e 8 dígitos numéricos
      return clean.length >= 5 && clean.length <= 8
    }

    // English / outros: aceita qualquer documento entre 5 e 20 dígitos
    return clean.length >= 5 && clean.length <= 20
  }

  // Phone validation per locale
  const isValidPhone = (phone: string) => {
    const clean = phone.replace(/\D/g, "")

    if (lang === "pt") {
      // Brasil: 10 ou 11 dígitos (DDD + número)
      return clean.length >= 10 && clean.length <= 11
    }

    if (lang === "es") {
      // Paraguai: entre 7 e 15 dígitos (flexível para incluir código de país)
      return clean.length >= 7 && clean.length <= 15
    }

    // Inglês/outros: entre 7 e 15 dígitos
    return clean.length >= 7 && clean.length <= 15
  }

  // Build WhatsApp redirect URL with all collected data
  const buildWhatsAppUrl = (type: "empresa" | "cliente", extraService?: string) => {
    const docLabel = t.docLabel

    if (type === "empresa") {
      return `https://wa.me/${phone}?text=${encodeURIComponent(
        `*Nuevo contacto desde el sitio web*\n\nNombre: ${name}\nEmpresa: ${company}\nTeléfono: ${companyPhone}\nServicio: ${extraService || service}`
      )}`
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(
      `*Nuevo contacto desde el sitio web*\n\nNombre: ${name}\n${docLabel}: ${documento}\nTeléfono: ${phoneClient}`
    )}`
  }

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, typing])

  useEffect(() => {
    if (open && messages.length === 0) {
      simulateBot(t.welcome)
      setTimeout(() => simulateBot(t.askName), 1200)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const simulateBot = (text: string) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { text, from: "bot" }])
    }, 800 + Math.random() * 800)
  }

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, from: "user" }])
  }

  const sendEmail = async (payload: Record<string, unknown>) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const text = await res.text()
        console.error("Erro API /api/contact:", res.status, text)
      }
    } catch (err) {
      console.error("Erro ao enviar e-mail:", err)
    }
  }

  const handleNext = () => {
    if (!input.trim()) return

    addUserMessage(input)

    if (step === 1) {
      setName(input)
      simulateBot(t.niceToMeet(input))
      setTimeout(() => {
        simulateBot(t.askChoice)
      }, 1000)
      setStep(2)
    }

    else if (step === 3) {
      setCompany(input)
      simulateBot(t.askCompanyPhone)
      setStep(5)
    }

    else if (step === 5) {
      if (!isValidPhone(input)) {
        simulateBot(t.invalidPhone)
        setInput("")
        return
      }

      setCompanyPhone(input)
      simulateBot(t.askService)
      setStep(4)
    }

    else if (step === 11) {
      if (!isValidDocument(input)) {
        simulateBot(t.invalidDoc)
        setInput("")
        return
      }

      setDocumento(input)
      simulateBot(t.askClientPhone)
      setStep(12)
    }

    else if (step === 12) {
      if (!isValidPhone(input)) {
        simulateBot(t.invalidPhone)
        setInput("")
        return
      }

      const clientPhone = input
      setPhoneClient(clientPhone)

      simulateBot(t.sending)

      // Enviar email
      sendEmail({
        type: "cliente",
        name,
        cpf: documento,
        phone: clientPhone,
        lang,
      })

      setTimeout(() => {
        simulateBot(t.redirecting)
      }, 1200)

      // Redirecionar para WhatsApp com os dados coletados
      setTimeout(() => {
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(
          `*Nuevo contacto desde el sitio web*\n\nNombre: ${name}\n${t.docLabel}: ${documento}\nTeléfono: ${clientPhone}`
        )}`
        window.open(url, "_blank")
      }, 2500)

      setTimeout(() => setStep(99), 3000)
    }

    setInput("")
  }

  const handleFlowChoice = (type: "empresa" | "cliente") => {
    if (type === "empresa") {
      addUserMessage(t.company)
      simulateBot(t.companyName)
      setStep(3)
    }

    if (type === "cliente") {
      addUserMessage(t.person)

      simulateBot(t.needData)

      setTimeout(() => {
        simulateBot(t.askDoc)
      }, 800)

      setStep(11)
    }
  }

  const handleService = (value: string) => {
    setService(value)
    addUserMessage(value)

    simulateBot(t.sending)

    // Enviar email
    sendEmail({
      type: "empresa",
      name,
      company,
      phone: companyPhone,
      service: value,
      lang,
    })

    setTimeout(() => {
      simulateBot(t.redirecting)
    }, 1200)

    // Redirecionar para WhatsApp com os dados coletados
    setTimeout(() => {
      const url = buildWhatsAppUrl("empresa", value)
      window.open(url, "_blank")
    }, 2500)

    setTimeout(() => setStep(99), 3000)
  }

  const resetChat = () => {
    setMessages([])
    setStep(1)
    setName("")
    setCompany("")
    setCompanyPhone("")
    setService("")
    setDocumento("")
    setPhoneClient("")
  }

  return {
    open,
    setOpen,
    messages,
    typing,
    step,
    input,
    setInput,
    chatRef,
    handleNext,
    handleFlowChoice,
    handleService,
    resetChat,
    t,
  }
}