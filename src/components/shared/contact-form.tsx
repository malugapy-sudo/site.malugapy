"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ContactFormProps {
  compact?: boolean;
  dict?: any;
}

export function ContactForm({ compact = false, dict }: ContactFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsPending(true);

    trackEvent('enviou_formulario_contato');

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const interest = formData.get("interest") as string;

    // Validação básica
    if (!name || name.length < 2) {
      setErrorMessage("El nombre debe tener al menos 2 caracteres");
      setIsPending(false);
      return;
    }
    if (!whatsapp || whatsapp.length < 8) {
      setErrorMessage("El número de WhatsApp no es válido");
      setIsPending(false);
      return;
    }
    if (!interest) {
      setErrorMessage("Debes seleccionar un interés");
      setIsPending(false);
      return;
    }

    try {
      // Enviar para API usando URL relativa (igual ao chatbot)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: whatsapp,
          service: interest,
          type: "formulario",
        }),
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      trackEvent('formulario_contato_sucesso');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      setErrorMessage("Error al enviar el mensaje. Por favor, intenta de nuevo.");
    } finally {
      setIsPending(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-extrabold text-brand-blue-dark mb-2">{dict?.contactForm?.successTitle || '¡Mensaje enviado!'}</h3>
        <p className="text-slate-600 font-medium">{dict?.contactForm?.successDesc || 'Nuestro equipo te contactará en breve por WhatsApp.'}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${compact ? "max-w-md" : "max-w-lg"}`}>
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center text-sm font-medium border border-red-100">
          <AlertCircle size={18} className="mr-2 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-bold text-slate-700 mb-2">
          {dict?.contactForm?.nameLabel || 'Nombre Completo'}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder={dict?.contactForm?.namePlaceholder || 'Tu nombre'}
          className="w-full px-5 py-4 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all"
        />
      </div>

      <div>
        <label htmlFor="contact-whatsapp" className="block text-sm font-bold text-slate-700 mb-2">
          {dict?.contactForm?.whatsappLabel || 'WhatsApp'}
        </label>
        <input
          id="contact-whatsapp"
          name="whatsapp"
          type="tel"
          required
          placeholder={dict?.contactForm?.whatsappPlaceholder || '(0XXX) XXX-XXX'}
          className="w-full px-5 py-4 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all"
        />
      </div>

      <div>
        <label htmlFor="contact-interest" className="block text-sm font-bold text-slate-700 mb-2">
          {dict?.contactForm?.interestLabel || 'Interés'}
        </label>
        <select
          id="contact-interest"
          name="interest"
          required
          defaultValue=""
          className="w-full px-5 py-4 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all appearance-none"
        >
          <option value="" disabled>{dict?.contactForm?.selectOption || 'Seleccioná una opción'}</option>
          <option value="basico">{dict?.contactForm?.optionBasic || 'Plan Básico — 300 MEGAS'}</option>
          <option value="familiar">{dict?.contactForm?.optionFamily || 'Plan Familiar — 500 MEGAS'}</option>
          <option value="gamer">{dict?.contactForm?.optionGamer || 'Plan Gamer — 800 MEGAS'}</option>
          <option value="empresarial">{dict?.contactForm?.optionBusiness || 'Plan Empresarial'}</option>
          <option value="otro">{dict?.contactForm?.optionOther || 'Otra consulta'}</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white rounded-lg font-bold uppercase tracking-widest text-sm shadow-lg shadow-orange-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isPending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            {dict?.contactForm?.submitBtn || 'Enviar Mensaje'} <Send size={16} className="ml-2" />
          </>
        )}
      </button>
    </form>
  );
}
