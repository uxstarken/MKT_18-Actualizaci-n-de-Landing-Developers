import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Calculator,
  Search,
  Truck,
  RotateCcw,
  ArrowRight,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  MapPin
} from 'lucide-react';

const CotizacionIcon = ({ className = "w-5 h-5 text-starken-green" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="10" x2="12" y2="18" />
    <path d="M14 12.2a2 2 0 0 0-4 0c0 1.8 4 1.2 4 3.6a2 2 0 0 1-4 0" />
  </svg>
);

const ServicesSection = ({ onSelectServiceForContact, isLoggedIn = false, onToggleAuth }) => {
  const services = [
    {
      id: 'creaTuEnvio',
      name: 'Crea tu envío',
      icon: Send,
      badge: 'Emisión rápida',
      title: '¡Que no se acumulen tus envíos!',
      description: 'Genera órdenes individuales o emite de manera masiva con integración directa a tus plataformas. Obtén números de seguimiento y etiquetas listas para despachar en segundos.',
      features: [
        'Generación de etiquetas con código de barra estándar y QR.',
        'Emisión masiva de órdenes mediante API o archivos CSV.',
        'Soporte para envíos a domicilio y retiros en agencias de todo Chile.',
        'Asignación automática de centro de distribución óptimo.'
      ],
      ctaText: 'Integrar Emisión de Envíos',
      stats: 'Hasta 5.000 órdenes/min vía API'
    },
    {
      id: 'cotiza',
      name: 'Cotiza tus envíos',
      icon: CotizacionIcon,
      badge: 'Tarificación dinámica',
      title: '¿Cómo cotizar mis envíos?',
      description: 'Con nuestra API de cotización en línea, simplificamos el proceso de envío para que puedas obtener rápidamente un presupuesto personalizado adaptado a tus necesidades específicas.',
      features: [
        'Cálculo automático de peso físico y volumétrico.',
        'Acceso a tarifas diferenciadas (Clientes Empresa / Somos Partner).',
        'Visualización de tiempos estimados de tránsito.',
        'Opciones de pago en origen o destino (Por pagar).'
      ],
      ctaText: 'Integrar Motor de Cotización',
      stats: 'Tiempos de respuesta < 60ms'
    },
    {
      id: 'seguimiento',
      name: 'Opciones de seguimiento',
      icon: Search,
      badge: 'Tracking en tiempo real',
      title: '¡Encomiendas en tiempo real!',
      description: 'Redefine la experiencia de enviar y recibir encomiendas. Con nuestra avanzada plataforma de seguimiento, te brindamos la capacidad de monitorear cada paso de tu paquete con precisión y en tiempo real.',
      features: [
        'Te ofrecemos tranquilidad.',
        'Confía en nosotros para una transparencia total en tus envíos.',
        'Envía con confianza.'
      ],
      ctaText: 'Integrar API de Tracking',
      stats: '99.9% disponibilidad de servicio'
    },
    {
      id: 'retiros',
      name: 'Retiros',
      icon: Truck,
      badge: 'Logística en origen',
      title: 'Gestiona tus solicitudes de retiro a domicilio',
      description: 'Ofrecemos la opción de gestionar directamente las solicitudes de retiro desde sus dependencias, asegurando control y trazabilidad en cada etapa del proceso.',
      features: [
        'Programación periódica o bajo demanda según volumen de ventas.',
        'Manifiesto de carga digital para entrega rápida a conductores.',
        'Confirmación y geolocalización del móvil en ruta.',
        'Capacidad para bultos pequeños, medianos y carga consolidada.'
      ],
      ctaText: 'Solicitar Servicio de Retiros',
      stats: 'Flota dedicada a nivel nacional'
    },
    {
      id: 'logisticaInversa',
      name: 'Logística inversa',
      icon: RotateCcw,
      badge: 'Devoluciones y cambios',
      title: 'Simplificamos las devoluciones y retornos',
      description: 'Ofrecemos soluciones de Logística Inversa diseñadas para facilitar la gestión de devoluciones de productos de manera eficiente y estructurada. Este proceso permite a los clientes finales devolver productos no deseados o defectuosos, asegurando que estos sean transportados de regreso a la empresa mandante o a un destino específico.',
      features: [
        'Retiro a domicilio: Servicio en el domicilio del cliente.',
        'DropOff: Entrega directa en sucursales Starken.',
        'Garantía de flexibilidad y adaptabilidad operativa.'
      ],
      ctaText: 'Integrar Logística Inversa',
      stats: 'Reduce hasta un 40% el tiempo de cambio'
    }
  ];

  const [activeTab, setActiveTab] = useState('creaTuEnvio');
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const handleSelectTab = (id, index) => {
    isProgrammaticScroll.current = true;
    setActiveTab(id);
    setActiveDotIndex(index);

    if (tabRefs.current[index] && tabsContainerRef.current) {
      tabRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  };

  const handleTabsScroll = () => {
    if (isProgrammaticScroll.current || !tabsContainerRef.current) return;
    const container = tabsContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    if (container.scrollLeft <= 20) {
      setActiveDotIndex(0);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (!isProgrammaticScroll.current) {
          setActiveTab(services[0].id);
        }
      }, 150);
      return;
    }

    if (container.scrollLeft >= maxScroll - 20) {
      setActiveDotIndex(services.length - 1);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (!isProgrammaticScroll.current) {
          setActiveTab(services[services.length - 1].id);
        }
      }, 150);
      return;
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    tabRefs.current.forEach((tabEl, index) => {
      if (!tabEl) return;
      const tabCenter = tabEl.offsetLeft + tabEl.offsetWidth / 2;
      const diff = Math.abs(containerCenter - tabCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setActiveDotIndex(closestIndex);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      if (!isProgrammaticScroll.current && services[closestIndex]) {
        setActiveTab(services[closestIndex].id);
      }
    }, 150);
  };

  useEffect(() => {
    const idx = services.findIndex(s => s.id === activeTab);
    if (idx !== -1) {
      setActiveDotIndex(idx);
    }
  }, [activeTab]);

  const currentService = services.find(s => s.id === activeTab) || services[0];
  const IconComponent = currentService.icon;

  return (
    <section id="servicios" className="pt-10 md:pt-12 pb-16 md:pb-20 bg-white">
      <div className="container-starken">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
          <h2 className="text-[28px] font-bold font-title text-[#303030] mb-4 leading-tight">
            Nuestros <span className="text-starken-green">servicios</span>
          </h2>
          <p className="font-body text-[14px] md:text-[16px] text-[#505050] leading-relaxed whitespace-normal lg:whitespace-nowrap">
            Descubre las soluciones logísticas integrables diseñadas para automatizar y escalar la operación de tu&nbsp;negocio.
          </p>
        </div>

        {/* Main Interactive Box */}
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Left Tabs Navigation */}
            <div className="w-full md:w-64 bg-slate-50/80 p-3 md:p-4 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between">
              
              {/* Scrollable Tabs */}
              <div
                ref={tabsContainerRef}
                onScroll={handleTabsScroll}
                className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar pb-1 md:pb-0 scroll-smooth snap-x snap-mandatory"
              >
                {services.map((item, idx) => {
                  const ItemIcon = item.icon;
                  const isActive = item.id === activeTab;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => (tabRefs.current[idx] = el)}
                      onClick={() => handleSelectTab(item.id, idx)}
                      className={`flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl text-left font-bold transition-all whitespace-nowrap md:whitespace-normal flex-shrink-0 w-auto min-w-[145px] md:w-full snap-start group ${isActive
                        ? 'bg-white text-starken-green shadow-sm border border-slate-200/80'
                        : 'text-[#303030] hover:bg-slate-100 hover:text-[#303030]'
                        }`}
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-starken-green-light text-starken-green' : 'bg-slate-200/60 text-[#303030] group-hover:bg-white'
                          }`}
                      >
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[14px] font-bold">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Swipe / Pagination Dots Indicator */}
              <div className="flex md:hidden items-center justify-center gap-1.5 pt-3 pb-1">
                {services.map((item, idx) => {
                  const isBar = idx === activeDotIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id, idx)}
                      className={`transition-all duration-300 rounded-full focus:outline-none ${
                        isBar
                          ? 'w-6 h-1.5 bg-starken-green shadow-sm'
                          : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Ver servicio ${item.name}`}
                    />
                  );
                })}
              </div>

            </div>

            {/* Right Tab Content Panel */}
            <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between">
              {activeTab === 'creaTuEnvio' ? (
                /* Contenido oficial sin contenedor de tarjeta interno */
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      {/* Etiqueta superior */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-starken-green-light text-starken-green">
                          <Send className="w-3.5 h-3.5" />
                          Emisión rápida
                        </span>
                      </div>

                      <h3 className="text-[18px] sm:text-2xl font-bold text-[#303030] tracking-tight mb-4">
                        ¡Optimiza tus envíos con los servicios de emisión de Starken!
                      </h3>

                      <div className="space-y-4 text-[#505050] text-sm sm:text-base leading-relaxed font-normal">
                        <p>
                          En Starken, estamos comprometidos con la excelencia en el servicio, la eficiencia operativa y la innovación continua. Es un placer presentarte nuestro Web Service EMISION Host 2 Host (Servicio REST), la puerta de entrada a una logística de última generación.
                        </p>
                        <p>
                          Este servicio se puede utilizar para emitir Ordenes de flete (OF) en el sistema de Starken y posteriormente realizar la impresión a través del módulo de Emisión Web, utilizando la funcionalidad de reimpresión (unitaria o masiva) que permite imprimir en etiquetadoras (zebra) o bien en formato PDF (laser).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón alineado a la derecha */}
                  <div className="w-full flex md:justify-end pt-4">
                    {!isLoggedIn ? (
                      <a
                        href="https://developers.starken.cl/login?redirect=%2FcreaTuEnvio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        Ingresa o regístrate
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectServiceForContact('Crea tu envío')}
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        <span>Crear envío</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : activeTab === 'cotiza' ? (
                /* Contenido oficial Cotiza tus envíos - misma estructura que crea tu envío */
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      {/* Etiqueta superior */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-starken-green-light text-starken-green">
                          <CotizacionIcon className="w-3.5 h-3.5" />
                          Tarificación dinámica
                        </span>
                      </div>

                      <h3 className="text-[18px] sm:text-2xl font-bold text-[#303030] tracking-tight mb-4">
                        ¿Cómo cotizar mis envíos?
                      </h3>

                      <div className="space-y-4 text-[#505050] text-sm sm:text-base leading-relaxed font-normal">
                        <p>
                          Con nuestra API de cotización en línea, simplificamos el proceso de envío para que puedas obtener rápidamente un presupuesto personalizado adaptado a tus necesidades específicas.
                        </p>
                        <p>
                          Solo tienes que ingresar los detalles de tu encomienda, como el origen, destino, peso y dimensiones, y nuestro sistema te proporcionará instantáneamente opciones de envío con tarifas competitivas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón alineado a la derecha */}
                  <div className="w-full flex md:justify-end pt-4">
                    {!isLoggedIn ? (
                      <a
                        href="https://developers.starken.cl/login?redirect=%2FcreaTuEnvio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        Ingresa o regístrate
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectServiceForContact('Cotiza tus envíos')}
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        <span>Cotizar envíos</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : activeTab === 'seguimiento' ? (
                /* Contenido oficial Opciones de seguimiento */
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      {/* Etiqueta superior */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-starken-green-light text-starken-green">
                          <Search className="w-3.5 h-3.5" />
                          Tracking en tiempo real
                        </span>
                      </div>

                      <h3 className="text-[18px] sm:text-2xl font-bold text-[#303030] tracking-tight mb-4">
                        ¡Encomiendas en tiempo real!
                      </h3>

                      <div className="space-y-4 text-[#505050] text-sm sm:text-base leading-relaxed font-normal">
                        <p>
                          Redefine la experiencia de enviar y recibir encomiendas. Con nuestra avanzada plataforma de seguimiento, te brindamos la capacidad de monitorear cada paso de tu paquete con precisión y en tiempo real.
                        </p>
                        <p>
                          Con nuestros servicios de seguimiento, te ofrecemos más que una simple entrega:
                        </p>
                        <ul className="space-y-2.5 pt-1 pl-1">
                          <li className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-starken-green flex-shrink-0" />
                            <span>Te ofrecemos tranquilidad.</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-starken-green flex-shrink-0" />
                            <span>Confía en nosotros para una transparencia total en tus envíos.</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-starken-green flex-shrink-0" />
                            <span>Envía con confianza.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Botón alineado a la derecha */}
                  <div className="w-full flex md:justify-end pt-4">
                    {!isLoggedIn ? (
                      <a
                        href="https://developers.starken.cl/login?redirect=%2FcreaTuEnvio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        Ingresa o regístrate
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectServiceForContact('Opciones de seguimiento')}
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        <span>Integrar Tracking</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : activeTab === 'retiros' ? (
                /* Contenido oficial Retiros */
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      {/* Etiqueta superior */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-starken-green-light text-starken-green">
                          <Truck className="w-3.5 h-3.5" />
                          Logística en origen
                        </span>
                      </div>

                      <h3 className="text-[18px] sm:text-2xl font-bold text-[#303030] tracking-tight mb-4">
                        Gestiona tus solicitudes de retiro a domicilio
                      </h3>

                      <div className="space-y-4 text-[#505050] text-sm sm:text-base leading-relaxed font-normal">
                        <p>
                          Ofrecemos la opción de gestionar directamente las solicitudes de retiro desde sus dependencias, asegurando control y trazabilidad en cada etapa del proceso.
                        </p>
                        <p>
                          Esta sección describe los requisitos, validaciones y configuraciones necesarias para habilitar este flujo. Incluye lineamientos operativos y consideraciones técnicas para una integración consistente.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón alineado a la derecha */}
                  <div className="w-full flex md:justify-end pt-4">
                    {!isLoggedIn ? (
                      <a
                        href="https://developers.starken.cl/login?redirect=%2FcreaTuEnvio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        Ingresa o regístrate
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectServiceForContact('Retiros')}
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        <span>Solicitar Retiros</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Contenido oficial Logística Inversa */
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      {/* Etiqueta superior */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-starken-green-light text-starken-green">
                          <RotateCcw className="w-3.5 h-3.5" />
                          Devoluciones y cambios
                        </span>
                      </div>

                      <h3 className="text-[18px] sm:text-2xl font-bold text-[#303030] tracking-tight mb-4">
                        Simplificamos las devoluciones y retornos
                      </h3>

                      <div className="space-y-4 text-[#505050] text-sm sm:text-base leading-relaxed font-normal">
                        <p>
                          Ofrecemos soluciones de Logística Inversa diseñadas para facilitar la gestión de devoluciones de productos de manera eficiente y estructurada. Este proceso permite a los clientes finales devolver productos no deseados o defectuosos, asegurando que estos sean transportados de regreso a la empresa mandante o a un destino específico.
                        </p>
                        <p>
                          Nuestras principales opciones incluyen:
                        </p>
                        <ul className="space-y-3 pt-1 pl-1">
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-starken-green mt-2 flex-shrink-0" />
                            <span>
                              <strong className="text-[#303030] font-bold">Retiro a domicilio:</strong> El servicio de “Retiro a domicilio” consiste, básicamente, en que nos dirigimos al domicilio de su cliente a buscar el producto indicado. El flujo funciona de la siguiente manera:
                            </span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-starken-green mt-2 flex-shrink-0" />
                            <span>
                              <strong className="text-[#303030] font-bold">DropOff:</strong> Los clientes tienen la opción de llevar los productos a una sucursal Starken, siempre y cuando el envío haya sido previamente registrado en nuestro sistema.
                            </span>
                          </li>
                        </ul>
                        <p className="pt-1">
                          A través de estas alternativas, garantizamos flexibilidad y adaptabilidad para cubrir diversas necesidades operativas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón alineado a la derecha */}
                  <div className="w-full flex md:justify-end pt-4">
                    {!isLoggedIn ? (
                      <a
                        href="https://developers.starken.cl/login?redirect=%2FcreaTuEnvio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        Ingresa o regístrate
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectServiceForContact('Logística inversa')}
                        className="btn-starken-primary w-full md:w-auto text-[14px] px-6 py-2.5 flex items-center justify-center gap-2 rounded-full md:rounded-[7px]"
                      >
                        <span>Integrar Logística Inversa</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
