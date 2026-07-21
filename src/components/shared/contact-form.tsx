"use client";

import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/actions/contact";
import { trackEvent } from "@/lib/analytics";

interface ContactFormProps {
  compact?: boolean;
  dict?: any;
}

const initialState = {
  success: false,
  message: "",
};

export function ContactForm({ compact = false, dict }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      trackEvent('formulario_contato_sucesso');
      const timer1 = setTimeout(() => setShowSuccess(true), 0);
      const timer2 = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [state.success, state.message]); // Include state.message to trigger effect on multiple successes

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
    <form action={formAction} onSubmit={() => trackEvent('enviou_formulario_contato')} className={`space-y-5 ${compact ? "max-w-md" : "max-w-lg"}`}>
      {state.message && !state.success && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center text-sm font-medium border border-red-100">
          <AlertCircle size={18} className="mr-2 flex-shrink-0" />
          {state.message}
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
