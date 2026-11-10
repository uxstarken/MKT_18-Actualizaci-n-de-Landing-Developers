import React from 'react';
import { Package, Truck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero = ({ onNavigateToContact, onNavigateToPlugins, onNavigateToDocs }) => {
  const activeStep = 2; // 0: Recibido, 1: En Bodega, 2: En Ruta, 3: Entregado

  const trackingSteps = [
    { label: 'Recibido', desc: 'Centro Distribución Santiago', date: '14:30 hrs' },
    { label: 'En Bodega', desc: 'Clasificación automatizada', date: '18:15 hrs' },
    { label: 'En Ruta', desc: 'Móvil #342 hacia destino', date: '09:00 hrs' },
    { label: 'Entregado', desc: 'Recepción confirmada con firma', date: 'Pendiente' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F4FAF6] py-6 md:py-8 border-b border-starken-border/60">
      {/* Background Radial Pattern & Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 12px 12px, rgba(0, 157, 78, 0.2) 2px, transparent 2.5px)',
          backgroundSize: '28px 28px'
        }}
      />
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-starken-green/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 bottom-0 w-80 h-80 rounded-full bg-starken-orange/10 blur-3xl pointer-events-none" />

      <div className="container-starken relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-starken-orange font-bold text-sm sm:text-base tracking-wide block mb-2">
                Seguimiento en tiempo real
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#303030] tracking-tight leading-[1.15]">
                Cada envío,<br />
                <span className="text-starken-green">visible al segundo.</span>
              </h1>
            </div>

            <p className="text-[14px] sm:text-base md:text-lg text-[#505050] max-w-2xl leading-relaxed font-normal">
              Integra el tracking de Starken en tu tienda y muestra a tus clientes exactamente dónde está su pedido, sin que te pregunten.
            </p>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="https://developers.starken.cl/register"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-starken-orange w-full sm:w-auto text-center justify-center text-sm md:text-base py-3.5 px-8 shadow-lg shadow-starken-orange/20 !rounded-full"
              >
                Regístrate
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Right Column: Live Tracking & Integration Simulator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-starken-border shadow-xl p-6 sm:p-7 relative overflow-hidden">

              {/* Header of Simulated Card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-starken-green-light flex items-center justify-center text-starken-green">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-mono font-bold text-[#303030] block">STK-94827103-CL</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-starken-orange border border-orange-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-starken-orange animate-ping mr-1.5" />
                  En Tránsito
                </span>
              </div>

              {/* Progress Bar (Visual Mockup) */}
              <div className="pt-6 pb-2">
                <div className="relative grid grid-cols-4">
                  {/* Background Track Line */}
                  <div className="absolute top-4 left-[12.5%] right-[12.5%] h-1 bg-slate-100 -translate-y-1/2 z-0" />
                  {/* Active Progress Line */}
                  <div
                    className="absolute top-4 left-[12.5%] h-1 bg-starken-green -translate-y-1/2 z-0"
                    style={{ width: `${(activeStep / (trackingSteps.length - 1)) * 75}%` }}
                  />

                  {trackingSteps.map((step, idx) => {
                    const isDone = idx <= activeStep;
                    const isCurrent = idx === activeStep;
                    return (
                      <div
                        key={step.label}
                        className="relative z-10 flex flex-col items-center text-center select-none"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${isCurrent
                              ? 'bg-starken-green text-white ring-4 ring-starken-green/20 scale-110'
                              : isDone
                                ? 'bg-starken-green text-white'
                                : 'bg-white text-slate-400 border border-slate-200'
                            }`}
                        >
                          {idx === 0 ? <Package className="w-3.5 h-3.5" /> :
                            idx === 1 ? <Clock className="w-3.5 h-3.5" /> :
                              idx === 2 ? <Truck className="w-3.5 h-3.5" /> :
                                <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-[12px] mt-2 font-bold truncate max-w-full px-1 ${isDone ? 'text-[#303030]' : 'text-slate-400'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
