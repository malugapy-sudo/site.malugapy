"use client";

import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppConfirmContextType {
  confirmWhatsApp: (url: string) => void;
}

const WhatsAppConfirmContext = createContext<WhatsAppConfirmContextType>({
  confirmWhatsApp: () => {},
});

export function useWhatsAppConfirm() {
  return useContext(WhatsAppConfirmContext);
}

const chatTexts: Record<string, any> = {
  es: {
    greeting: "¡Hola! 👋",
    question: "¿Desea salir del sitio e iniciar una conversación en WhatsApp?",
    cta: "Sí, ir a WhatsApp",
    cancel: "No, quedarme aquí",
    online: "En línea",
  },
  pt: {
    greeting: "Olá! 👋",
    question: "Deseja sair do site e iniciar uma conversa no WhatsApp?",
    cta: "Sim, ir para o WhatsApp",
    cancel: "Não, ficar aqui",
    online: "Online",
  },
  en: {
    greeting: "Hi there! 👋",
    question: "Would you like to leave the site and start a chat on WhatsApp?",
    cta: "Yes, go to WhatsApp",
    cancel: "No, stay here",
    online: "Online",
  },
};

export function WhatsAppConfirmProvider({ lang, children }: { lang: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");

  const text = chatTexts[lang] || chatTexts.es;

  const confirmWhatsApp = useCallback((url: string) => {
    setTargetUrl(url);
    setIsOpen(true);
  }, []);

  // Intercept ALL clicks on wa.me links globally
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href*='wa.me']") as HTMLAnchorElement | null;
      if (!anchor) return;

      e.preventDefault();
      e.stopPropagation();
      setTargetUrl(anchor.href);
      setIsOpen(true);
    };

    document.addEventListener("click", handler, true); // capture phase
    return () => document.removeEventListener("click", handler, true);
  }, []);

  const handleConfirm = () => {
    trackEvent('confirmou_ir_whatsapp');
    setIsOpen(false);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <WhatsAppConfirmContext.Provider value={{ confirmWhatsApp }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-[2px]"
              onClick={handleClose}
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              {/* Chat Header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075E54]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">Maluga Telecom</p>
                  <p className="text-green-200 text-xs">{text.online}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/70 hover:text-white transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Body */}
              <div
                className="px-4 py-5 min-h-[110px] flex flex-col gap-2"
                style={{
                  backgroundColor: "#ECE5DD",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c7bfb0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="max-w-[85%] self-start"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
                    <p className="text-[15px] text-slate-800 font-medium leading-snug">
                      {text.greeting}
                    </p>
                    <span className="text-[10px] text-slate-400 float-right mt-1 ml-3">{timeStr}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-[85%] self-start"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
                    <p className="text-[15px] text-slate-800 leading-snug">
                      {text.question}
                    </p>
                    <span className="text-[10px] text-slate-400 float-right mt-1 ml-3">{timeStr}</span>
                  </div>
                </motion.div>
              </div>

              {/* CTA Footer */}
              <div className="bg-white px-3 py-3 flex flex-col gap-2">
                <button
                  onClick={handleConfirm}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-sm rounded-xl shadow-md shadow-green-500/20 transition-all active:scale-[0.97]"
                >
                  <Send size={16} strokeWidth={2.5} className="-rotate-45" />
                  {text.cta}
                </button>
                <button
                  onClick={() => { trackEvent('cancelou_ir_whatsapp'); handleClose(); }}
                  className="w-full py-2.5 text-slate-400 hover:text-slate-600 font-medium text-xs rounded-xl transition-colors"
                >
                  {text.cancel}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </WhatsAppConfirmContext.Provider>
  );
}
