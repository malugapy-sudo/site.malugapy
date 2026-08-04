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
  const [cpf, setCpf] = useState("")
  const [phoneClient, setPhoneClient] = useState("")
  const [carteira, setCarteira] = useState("")

  const chatRef = useRef<HTMLDivElement>(null)

  const phone = "5527999999999"

  const texts = {
  pt: {
    welcome: "Olá! Bem-vindo à Maluga SA!",
    askName: "Qual é o seu nome?",
    niceToMeet: (name: string) => `Prazer, ${name}! 😊`,
    askChoice: "Você deseja contratar nossos serviços?",
    askCompanyPhone: "Agora me informe o telefone da empresa com DDD 📱",
    invalidPhone: "Número inválido. Digite um telefone com DDD válido.",
    askService: "Qual serviço você precisa?",
    invalidCpf: "CPF inválido. Por favor, digite um CPF válido.",
    askClientPhone: "Agora me informe seu telefone com DDD 📱",
    sending: "Perfeito! Estou enviando seus dados para nosso time...",
    soon: "Em breve nossa equipe entrará em contato 😉",
    contact: "Se preferir, pode entrar em contato conosco pelo Tel: 0800 000 0000",
    company: "Empresa",
    companyName: "Perfeito! Qual o nome da sua empresa?",
    person: "Pessoa Física",
    needData: "Certo! Agora preciso de alguns dados para te ajudar melhor 😊",
    askCpf: "Digite seu CPF",
    whatsapp: "Agora vou te direcionar para nosso atendimento no WhatsApp 🚀",
  },

  es: {
    welcome: "¡Hola! ¡Bienvenido a Maluga SA!",
    askName: "¿Cuál es su nombre?",
    niceToMeet: (name: string) => `Mucho gusto, ${name}! 😊`,
    askChoice: "¿Desea contratar nuestros servicios?",
    askCompanyPhone: "Ahora indíqueme el teléfono de la empresa con código de área 📱",
    invalidPhone: "Número inválido. Introduzca un teléfono válido.",
    askService: "¿Qué servicio necesita?",
    invalidCpf: "Documento inválido.",
    askClientPhone: "Ahora indíqueme su teléfono con código de área 📱",
    sending: "Perfecto. Estoy enviando sus datos a nuestro equipo...",
    soon: "Nuestro equipo se pondrá en contacto con usted 😉",
    contact: "Si lo prefiere, puede llamarnos al Tel: 0800 000 0000",
    company: "Empresa",
    companyName: "Perfecto. ¿Cuál es el nombre de su empresa?",
    person: "Persona Física",
    needData: "Perfecto. Necesito algunos datos 😊",
    askCpf: "Introduzca su documento",
    whatsapp: "Ahora lo dirigiré a nuestro WhatsApp 🚀",
  },

  en: {
    welcome: "Hello! Welcome to Maluga SA!",
    askName: "What is your name?",
    niceToMeet: (name: string) => `Nice to meet you, ${name}! 😊`,
    askChoice: "Would you like to hire our services?",
    askCompanyPhone: "Please enter your company's phone number with area code 📱",
    invalidPhone: "Invalid phone number.",
    askService: "Which service do you need?",
    invalidCpf: "Invalid document.",
    askClientPhone: "Please enter your phone number with area code 📱",
    sending: "Perfect! I'm sending your information to our team...",
    soon: "Our team will contact you shortly 😉",
    contact: "If you prefer, call us at: 0800 000 000",
    company: "Company",
    companyName: "Great! What is your company name?",
    person: "Individual",
    needData: "Great! I need a few details 😊",
    askCpf: "Enter your document number",
    whatsapp: "I'll redirect you to WhatsApp now 🚀",
  },
} as const;

const t = texts[lang];

  const isValidCPF = (cpf: string) => {
    const cleanCpf = cpf.replace(/\D/g, "")

    if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) return false

    let sum = 0
    let rest

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i)
    }

    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0
    if (rest !== parseInt(cleanCpf.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i)
    }

    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0

    return rest === parseInt(cleanCpf.substring(10, 11))
  }

  const isValidPhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    return cleanPhone.length >= 10 && cleanPhone.length <= 11
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

  const sendEmail = async (payload: any) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.log("Erro ao enviar e-mail", err)
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
      if (!isValidCPF(input)) {
        simulateBot(t.invalidCpf)
        setInput("")
        return
      }

      setCpf(input)
      simulateBot(t.askClientPhone)
      setStep(12)
    }

    else if (step === 12) {
      if (!isValidPhone(input)) {
        simulateBot(t.invalidPhone)
        setInput("")
        return
      }

      setPhoneClient(input)

      simulateBot(t.sending)

      sendEmail({
        type: "cliente",
        name,
        cpf,
        phone: input,
      })

      setTimeout(() => {
        simulateBot(t.soon)
      }, 1000)

      setTimeout(() => {
        simulateBot(t.contact)
      }, 1600)

      setTimeout(() => setStep(99), 2500)
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
        simulateBot(t.askCpf)
      }, 800)

      setStep(11)
    }
  }

  const handleService = (value: string) => {
    setService(value)
    addUserMessage(value)

    simulateBot(t.sending)

    sendEmail({
      type: "empresa",
      name,
      company,
      phone: companyPhone,
      service: value,
    })

    setTimeout(() => {
      simulateBot(t.whatsapp)
    }, 1200)

    setTimeout(() => {
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(
        `Nome: ${name}\nEmpresa: ${company}\nTelefone: ${companyPhone}\nServiço: ${value}`
      )}`
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
    setCpf("")
    setPhoneClient("")
    setCarteira("")
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
    resetChat
  }
}