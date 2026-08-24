"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Smartphone, Tv, Gamepad2, Briefcase, Download, Home, RotateCcw, ArrowRight, CheckCircle2, Wifi, Activity, Building, Building2 } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Step = 1 | 2 | 3 | 4 | 5;

export function PlanCalculator({ dict }: { dict?: any }) {
  const [step, setStep] = useState<Step>(1);
  
  const [propertyType, setPropertyType] = useState<'apt' | 'house1' | 'house2' | null>(null);
  const [people, setPeople] = useState<number>(2);
  const [devices, setDevices] = useState<number>(4);
  const [activities, setActivities] = useState<{ [key: string]: boolean }>({
    streaming: false,
    gaming: false,
    wfh: false,
    downloads: false,
    smarthome: false,
  });

  const [analysisText, setAnalysisText] = useState(dict?.planCalculator?.scanningProfile || "Escaneando el perfil de red...");
  const [progress, setProgress] = useState(0);

  const toggleActivity = (key: string) => {
    setActivities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateBandwidth = () => {
    let mbps = people * 15 + devices * 5;
    if (activities.streaming) mbps += people * 30;
    if (activities.gaming) mbps += 60; 
    if (activities.wfh) mbps += people * 25;
    if (activities.downloads) mbps += 120;
    if (activities.smarthome) mbps += 40;
    
    if (propertyType === 'house2') mbps += 50; 

    return mbps;
  };

  const startAnalysis = () => {
    trackEvent('clicou_iniciar_diagnostico');
    setStep(4);
    setProgress(0);
    setAnalysisText(dict?.planCalculator?.scanningProfile || "Escaneando el perfil de red...");

    setTimeout(() => {
      setProgress(40);
      setAnalysisText(dict?.planCalculator?.calculatingUsage || "Calculando consumo simultáneo...");
    }, 1500);

    setTimeout(() => {
      setProgress(80);
      setAnalysisText(dict?.planCalculator?.determiningPlan || "Determinando el plan ideal...");
    }, 3000);

    setTimeout(() => {
      setProgress(100);
      setTimeout(() => setStep(5), 500);
    }, 4500);
  };

  const estimatedMbps = calculateBandwidth();

  const getRecommendedPlan = (mbps: number) => {
    if (mbps <= 250) return { type: dict?.planCalculator?.planBasic || "Plan Básico", megas: "300", link: "https://wa.me/+595991554700?text=Hola,%20hice%20el%20diagnóstico%20técnico%20y%20quiero%20el%20plan%20Básico%20de%20300MB" };
    if (mbps <= 450) return { type: dict?.planCalculator?.planFamily || "Plan Familiar", megas: "500", link: "https://wa.me/+595991554700?text=Hola,%20hice%20el%20diagnóstico%20técnico%20y%20quiero%20el%20plan%20Familiar%20de%20500MB" };
    return { type: dict?.planCalculator?.planGamer || "Plan Gamer", megas: "800", link: "https://wa.me/+595991554700?text=Hola,%20hice%20el%20diagnóstico%20técnico%20y%20quiero%20el%20plan%20Gamer%20de%20800MB" };
  };

  const plan = getRecommendedPlan(estimatedMbps);
  const needsMesh = propertyType === 'house2';

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200" id="calculadora">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Sleek Dashboard Container */}
        <div className="bg-[#0f172a] rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-800 text-white">
          
          {/* Left Side: Info */}
          <div className="lg:w-1/3 bg-gradient-to-br from-brand-blue-dark to-[#0f172a] p-8 md:p-10 flex flex-col relative overflow-hidden border-r border-white/5">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex-1 flex flex-col">
              
              <div className="flex items-center mb-10">
                <div className="bg-brand-orange/20 w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-sm border border-brand-orange/30">
                  <Activity size={24} className="text-brand-orange" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-extrabold leading-tight text-white">{dict?.planCalculator?.title || 'Calculadora de Planes'}</h2>
                  <div className="flex items-center mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                    <span className="text-xs font-mono text-slate-400">{dict?.planCalculator?.systemOnline || 'Sistema Online'}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 flex-1">
                {dict?.planCalculator?.description || 'Descubrí qué velocidad de internet necesitás realmente respondiendo estas preguntas rápidas. Nuestro sistema evaluará tu perfil para recomendarte la mejor opción.'}
              </p>

              {/* Steps indicators */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= 1 ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-700 text-slate-500'}`}>1</div>
                  <span className={`ml-3 text-sm font-semibold transition-colors ${step >= 1 ? 'text-white' : 'text-slate-500'}`}>{dict?.planCalculator?.step1Label || 'Tu Residencia'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= 2 ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-700 text-slate-500'}`}>2</div>
                  <span className={`ml-3 text-sm font-semibold transition-colors ${step >= 2 ? 'text-white' : 'text-slate-500'}`}>{dict?.planCalculator?.step2Label || 'Conexiones Simultáneas'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= 3 ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-700 text-slate-500'}`}>3</div>
                  <span className={`ml-3 text-sm font-semibold transition-colors ${step >= 3 ? 'text-white' : 'text-slate-500'}`}>{dict?.planCalculator?.step3Label || 'Perfil de Uso'}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= 4 ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-700 text-slate-500'}`}>4</div>
                  <span className={`ml-3 text-sm font-semibold transition-colors ${step >= 4 ? 'text-white' : 'text-slate-500'}`}>{dict?.planCalculator?.step4Label || 'Diagnóstico Final'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Content */}
          <div className="lg:w-2/3 p-6 md:p-10 flex flex-col justify-center min-h-[420px] relative bg-[#1e293b]">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Property */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-lg mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Building className="mr-3 text-brand-orange" /> {dict?.planCalculator?.whereUseInternet || '¿Dónde vas a usar el internet?'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <button 
                      onClick={() => setPropertyType('apt')} 
                      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${propertyType === 'apt' ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}
                    >
                      <Building2 size={40} className={`mb-3 ${propertyType === 'apt' ? 'text-brand-orange' : 'text-slate-400'}`} />
                      <span className={`font-semibold text-sm text-center ${propertyType === 'apt' ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.apartment || 'Departamento'}</span>
                    </button>

                    <button 
                      onClick={() => setPropertyType('house1')} 
                      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${propertyType === 'house1' ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}
                    >
                      <Home size={40} className={`mb-3 ${propertyType === 'house1' ? 'text-brand-orange' : 'text-slate-400'}`} />
                      <span className={`font-semibold text-sm text-center ${propertyType === 'house1' ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.house1Floor || 'Casa (1 Planta)'}</span>
                    </button>

                    <button 
                      onClick={() => setPropertyType('house2')} 
                      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${propertyType === 'house2' ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}
                    >
                      <Building size={40} className={`mb-3 ${propertyType === 'house2' ? 'text-brand-orange' : 'text-slate-400'}`} />
                      <span className={`font-semibold text-sm text-center ${propertyType === 'house2' ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.house2Floors || 'Casa (2+ Plantas)'}</span>
                    </button>
                  </div>

                  <button 
                    disabled={!propertyType}
                    onClick={() => { trackEvent('calculadora_avancou_passo', { passo: 2 }); setStep(2); }} 
                    className={`w-full py-4 rounded-lg font-bold transition-all flex justify-center items-center shadow-lg ${propertyType ? 'bg-brand-blue text-white hover:bg-brand-blue-dark' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                  >
                    {dict?.planCalculator?.next || 'Siguiente'} <ArrowRight className="ml-2" size={18} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Users and Devices */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-lg mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    
                    {/* People */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col items-center">
                      <div className="flex items-center text-slate-300 mb-4 font-semibold">
                        <Users className="mr-2" size={20} /> {dict?.planCalculator?.howManyPeople || '¿Cuántas personas?'}
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-10 h-10 rounded-full border-2 border-brand-orange text-brand-orange text-xl font-bold hover:bg-brand-orange/10 transition-colors flex items-center justify-center">-</button>
                        <span className="text-4xl font-extrabold text-white">{people}</span>
                        <button onClick={() => setPeople(Math.min(15, people + 1))} className="w-10 h-10 rounded-full border-2 border-brand-orange bg-brand-orange text-white text-xl font-bold hover:bg-brand-orange-dark hover:border-brand-orange-dark transition-colors flex items-center justify-center">+</button>
                      </div>
                    </div>

                    {/* Devices */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col items-center">
                      <div className="flex items-center text-slate-300 mb-4 font-semibold">
                        <Smartphone className="mr-2" size={20} /> {dict?.planCalculator?.howManyDevices || '¿Cuántos dispositivos?'}
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <button onClick={() => setDevices(Math.max(1, devices - 1))} className="w-10 h-10 rounded-full border-2 border-brand-orange text-brand-orange text-xl font-bold hover:bg-brand-orange/10 transition-colors flex items-center justify-center">-</button>
                        <span className="text-4xl font-extrabold text-white">{devices}</span>
                        <button onClick={() => setDevices(Math.min(50, devices + 1))} className="w-10 h-10 rounded-full border-2 border-brand-orange bg-brand-orange text-white text-xl font-bold hover:bg-brand-orange-dark hover:border-brand-orange-dark transition-colors flex items-center justify-center">+</button>
                      </div>
                    </div>

                  </div>

                  <div className="flex space-x-3">
                    <button onClick={() => { trackEvent('calculadora_voltou_passo', { passo: 1 }); setStep(1); }} className="w-1/3 py-4 border-2 border-slate-600 text-slate-300 rounded-lg font-bold hover:bg-slate-700 hover:text-white transition-colors">{dict?.planCalculator?.back || 'Volver'}</button>
                    <button onClick={() => { trackEvent('calculadora_avancou_passo', { passo: 3 }); setStep(3); }} className="w-2/3 py-4 bg-brand-blue text-white rounded-lg font-bold hover:bg-brand-blue-dark transition-all flex justify-center items-center shadow-lg">
                      {dict?.planCalculator?.next || 'Siguiente'} <ArrowRight className="ml-2" size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Activities */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Activity className="mr-3 text-brand-orange" /> {dict?.planCalculator?.whatActivities || '¿Para qué más usarán internet?'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <button onClick={() => toggleActivity('streaming')} className={`flex items-center p-4 border rounded-lg transition-all ${activities.streaming ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}>
                      <div className={`w-5 h-5 rounded border mr-3 flex-shrink-0 flex items-center justify-center ${activities.streaming ? 'bg-brand-orange border-brand-orange' : 'border-slate-500'}`}>
                        {activities.streaming && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <Tv className={`mr-2 flex-shrink-0 ${activities.streaming ? 'text-brand-orange' : 'text-slate-400'}`} size={18} />
                      <span className={`text-sm font-semibold text-left ${activities.streaming ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.streaming || 'Ver Series/Películas 4K'}</span>
                    </button>

                    <button onClick={() => toggleActivity('gaming')} className={`flex items-center p-4 border rounded-lg transition-all ${activities.gaming ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}>
                      <div className={`w-5 h-5 rounded border mr-3 flex-shrink-0 flex items-center justify-center ${activities.gaming ? 'bg-brand-orange border-brand-orange' : 'border-slate-500'}`}>
                        {activities.gaming && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <Gamepad2 className={`mr-2 flex-shrink-0 ${activities.gaming ? 'text-brand-orange' : 'text-slate-400'}`} size={18} />
                      <span className={`text-sm font-semibold text-left ${activities.gaming ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.gaming || 'Juegos Online Competitivos'}</span>
                    </button>

                    <button onClick={() => toggleActivity('wfh')} className={`flex items-center p-4 border rounded-lg transition-all ${activities.wfh ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}>
                      <div className={`w-5 h-5 rounded border mr-3 flex-shrink-0 flex items-center justify-center ${activities.wfh ? 'bg-brand-orange border-brand-orange' : 'border-slate-500'}`}>
                        {activities.wfh && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <Briefcase className={`mr-2 flex-shrink-0 ${activities.wfh ? 'text-brand-orange' : 'text-slate-400'}`} size={18} />
                      <span className={`text-sm font-semibold text-left ${activities.wfh ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.homeOffice || 'Home Office / Videollamadas'}</span>
                    </button>

                    <button onClick={() => toggleActivity('downloads')} className={`flex items-center p-4 border rounded-lg transition-all ${activities.downloads ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}>
                      <div className={`w-5 h-5 rounded border mr-3 flex-shrink-0 flex items-center justify-center ${activities.downloads ? 'bg-brand-orange border-brand-orange' : 'border-slate-500'}`}>
                        {activities.downloads && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <Download className={`mr-2 flex-shrink-0 ${activities.downloads ? 'text-brand-orange' : 'text-slate-400'}`} size={18} />
                      <span className={`text-sm font-semibold text-left ${activities.downloads ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.downloads || 'Descargas de Archivos Grandes'}</span>
                    </button>

                    <button onClick={() => toggleActivity('smarthome')} className={`flex items-center p-4 border rounded-lg transition-all sm:col-span-2 ${activities.smarthome ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}>
                      <div className={`w-5 h-5 rounded border mr-3 flex-shrink-0 flex items-center justify-center ${activities.smarthome ? 'bg-brand-orange border-brand-orange' : 'border-slate-500'}`}>
                        {activities.smarthome && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <Home className={`mr-2 flex-shrink-0 ${activities.smarthome ? 'text-brand-orange' : 'text-slate-400'}`} size={18} />
                      <span className={`text-sm font-semibold text-left ${activities.smarthome ? 'text-white' : 'text-slate-300'}`}>{dict?.planCalculator?.smartHome || 'Cámaras de Seguridad o Smart Home'}</span>
                    </button>
                  </div>

                  <div className="flex space-x-3">
                    <button onClick={() => { trackEvent('calculadora_voltou_passo', { passo: 2 }); setStep(2); }} className="w-1/3 py-4 border-2 border-slate-600 text-slate-300 rounded-lg font-bold hover:bg-slate-700 hover:text-white transition-colors">{dict?.planCalculator?.back || 'Volver'}</button>
                    <button onClick={startAnalysis} className="w-2/3 py-4 bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white rounded-lg font-bold hover:shadow-lg transition-all flex justify-center items-center shadow-orange-500/20">
                      {dict?.planCalculator?.startDiagnosis || 'Iniciar Diagnóstico'} <Activity className="ml-2" size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Loading */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center justify-center text-center py-6">
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-20 w-20 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="absolute font-bold text-xl text-white">{progress}%</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{dict?.planCalculator?.diagnosing || 'Diagnosticando...'}</h3>
                  <p className="text-brand-orange text-sm h-5 font-mono">{analysisText}</p>
                </motion.div>
              )}

              {/* Step 5: Result */}
              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-brand-blue/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-blue/30">
                      {dict?.planCalculator?.analysisResult || 'Resultado del Análisis'}
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-6 mb-6 mx-auto border border-slate-700 text-center shadow-inner">
                    <p className="text-slate-400 mb-2 font-medium">{dict?.planCalculator?.idealCapacity || 'Capacidad ideal recomendada para tu hogar:'}</p>
                    <div className="flex justify-center items-baseline">
                      <span className="text-6xl font-extrabold text-white">{estimatedMbps}</span>
                      <span className="text-xl text-brand-orange ml-2 font-bold">Mbps</span>
                    </div>
                    {needsMesh && (
                      <div className="mt-4 bg-slate-900/50 py-2 px-4 rounded-lg inline-flex items-center text-sm font-semibold text-blue-300 border border-slate-700">
                        <Wifi size={16} className="mr-2" /> {dict?.planCalculator?.meshRecommendation || 'Recomendado o uso de Roteadores Mesh para sobrados.'}
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-lg p-6 mb-6 shadow-xl relative overflow-hidden text-center transform hover:scale-[1.02] transition-transform border border-blue-500/30">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Wifi size={100} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-blue-200 text-xs font-bold tracking-widest uppercase mb-2">{dict?.planCalculator?.recommendedPlan || 'Plan Oficial Recomendado'}</p>
                      <h4 className="text-2xl font-extrabold text-white mb-2">{plan.type}</h4>
                      <div className="flex justify-center items-baseline mb-6">
                        <span className="text-5xl font-extrabold text-brand-orange">{plan.megas}</span>
                        <span className="text-lg text-blue-200 ml-1 font-bold">{dict?.planCalculator?.megasLabel || 'Megas'}</span>
                      </div>
                      <Link 
                        href={plan.link}
                        target="_blank"
                        onClick={() => trackEvent('clicou_contratar_plano_calculadora', { plano: plan.type })}
                        className="block w-full py-4 bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white rounded-lg font-bold hover:from-brand-orange-dark hover:to-brand-orange transition-all shadow-lg text-sm uppercase tracking-wider"
                      >
                        {dict?.planCalculator?.hireNow || 'Contratar Ahora'}
                      </Link>
                    </div>
                  </div>
                  
                  <button onClick={() => { trackEvent('clicou_recalcular_calculadora'); setStep(1); setPropertyType(null); setPeople(2); setDevices(4); setActivities({streaming:false, gaming:false, wfh:false, downloads:false, smarthome:false}); }} className="text-sm font-semibold text-slate-500 hover:text-white transition-colors flex items-center justify-center mx-auto">
                    <RotateCcw size={14} className="mr-1.5" /> {dict?.planCalculator?.recalculate || 'Recalcular'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
