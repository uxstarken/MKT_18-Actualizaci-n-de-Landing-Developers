import React, { useState } from 'react';
import { 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  Download, 
  BookOpen, 
  Coins,
  Smartphone,
  MapPin,
  Key,
  Banknote,
  CheckCircle2
} from 'lucide-react';

const ResourcesSection = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [resourceTab, setResourceTab] = useState('faq'); // 'faq' | 'informacion'

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: '¿Qué es un plugin y para qué sirve?',
      a: 'Un plugin es un fragmento o componente de código hecho para ampliar las funciones de un programa. En el ámbito de E-commerce (tienda online), se usa con mucha frecuencia en entornos como WordPress (sistema para publicar contenido en la web de forma sencilla), ya sea para tener una tienda online, para mejorar el rendimiento del sitio o para crear widgets.'
    },
    {
      q: '¿Qué es un plugin de integración de Starken?',
      a: 'Es una extensión de software oficial que conecta directamente el carrito de compras y checkout de tu tienda online con el sistema logístico de Starken. Permite cotizar fletes en tiempo real, generar órdenes de despacho, imprimir etiquetas con código de barra e informar el número de seguimiento a tus clientes de manera 100% automatizada.'
    },
    {
      q: '¿Qué requisitos necesito para operar con los plugins?',
      a: 'Solo requieres contar con una cuenta activa en Starken (como cliente Somos Partner, Empresa o StarkenPro) para obtener tu Token de Integración (API Key) desde el portal StarkenPro. Con ese Token podrás autenticar tu tienda y comenzar a cotizar y emitir.'
    },
    {
      q: '¿Puedo ofrecer envíos a domicilio y retiros en agencia Starken?',
      a: 'Sí, los plugins de Starken permiten habilitar ambas modalidades: entrega directa a la dirección de tu cliente a lo largo de todo Chile o retiro en cualquiera de nuestros Puntos Red y sucursales Starken.'
    },
    {
      q: '¿Cómo se calculan los costos de envío para mis clientes?',
      a: 'El plugin envía el peso físico y dimensiones (largo, ancho, alto) de los productos del carrito a nuestra API de tarificación, la cual calcula el costo exacto según el origen de tu bodega y la comuna de destino del comprador.'
    },
    {
      q: '¿Cómo imprimo las etiquetas de mis encomiendas?',
      a: 'Desde el panel de administración de tu tienda (WooCommerce, Shopify, PrestaShop o Magento) podrás generar e imprimir las etiquetas oficiales en formato PDF o formato estándar para impresoras térmicas (Zebra/térmica continua).'
    },
    {
      q: '¿Tiene algún costo utilizar los plugins de Starken?',
      a: 'No, la descarga y uso de los plugins y módulos oficiales de Starken es 100% gratuita para clientes que operan con nuestros servicios de despacho.'
    },
    {
      q: '¿Dónde puedo solicitar asistencia técnica o soporte de integración?',
      a: 'Nuestro equipo especializado de integraciones está disponible a través de nuestro formulario de contacto en esta página o directamente escribiéndonos a integraciones@starken.cl.'
    }
  ];

  return (
    <section id="documentacion" className="py-20 bg-white border-b border-starken-border/60">
      <div className="container-starken">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-[28px] font-bold font-title text-[#303030] mb-4 leading-tight">
            Recursos y <span className="text-starken-green">recomendaciones</span>
          </h2>
          <p className="font-body text-[14px] md:text-[16px] text-[#505050] leading-relaxed whitespace-normal lg:whitespace-nowrap">
            Guías detalladas, tutoriales en video y respuestas a preguntas frecuentes para facilitar tu proceso de&nbsp;integración.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setResourceTab('faq')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                resourceTab === 'faq' ? 'bg-white text-starken-green shadow-sm' : 'text-[#505050] hover:text-[#303030]'
              }`}
            >
              Preguntas Frecuentes (FAQ)
            </button>
            <button
              onClick={() => setResourceTab('informacion')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                resourceTab === 'informacion' ? 'bg-white text-starken-green shadow-sm' : 'text-[#505050] hover:text-[#303030]'
              }`}
            >
              Más información
            </button>
          </div>
        </div>

        {/* View: Información */}
        {resourceTab === 'informacion' && (
          <div className="w-full space-y-12">
            {/* 1. ¿Qué funciones tiene un plugin? */}
            <div>
              <h4 className="text-[18px] md:text-[20px] font-title font-bold text-[#303030] mb-5">
                ¿Qué funciones tiene un plugin?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* Tarificación */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-5.5 shadow-sm hover:border-slate-300 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-base font-bold text-starken-text-dark mb-1">
                      Tarificación
                    </h5>
                    <p className="text-[14px] text-[#505050] leading-relaxed font-normal">
                      Cálculo de tarifa de envío, en tiempo real, con base en peso, volumen, origen y destino. Ofreciendo simultáneo el valor para las modalidades de envío disponibles entre ese origen y destino.
                    </p>
                  </div>
                </div>

                {/* Emisión */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-5.5 shadow-sm hover:border-slate-300 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-base font-bold text-starken-text-dark mb-1">
                      Emisión
                    </h5>
                    <p className="text-[14px] text-[#505050] leading-relaxed font-normal">
                      Generación online de OF con la modalidad seleccionada por el cliente al momento de la tarificación.
                    </p>
                  </div>
                </div>

                {/* Generación de etiqueta */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-5.5 shadow-sm hover:border-slate-300 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-base font-bold text-starken-text-dark mb-1">
                      Generación de etiqueta
                    </h5>
                    <p className="text-[14px] text-[#505050] leading-relaxed font-normal">
                      Obtención de la etiqueta asociada al envío, lista para imprimir y adherir al paquete/bulto.
                    </p>
                  </div>
                </div>

                {/* Seguimiento */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-5.5 shadow-sm hover:border-slate-300 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-base font-bold text-starken-text-dark mb-1">
                      Seguimiento
                    </h5>
                    <p className="text-[14px] text-[#505050] leading-relaxed font-normal">
                      Consulta online del estado del envío para compras realizadas a través de la plataforma E-Commerce, disponible en los detalles del pedido.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Debes contar con alguna de las siguientes plataformas */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h5 className="text-sm sm:text-base font-bold text-starken-text-dark mb-6">
                Debes contar con alguna de las siguientes plataformas:
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center py-2">
                <img 
                  src="/logos/prestashop.png" 
                  alt="PrestaShop" 
                  className="h-7 sm:h-8 max-w-[140px] object-contain hover:scale-105 transition-transform" 
                />
                <img 
                  src="/logos/woocommerce.png" 
                  alt="WooCommerce" 
                  className="h-7 sm:h-8 max-w-[140px] object-contain hover:scale-105 transition-transform" 
                />
                <img 
                  src="/logos/shopify.svg" 
                  alt="Shopify" 
                  className="h-9 sm:h-11 max-w-[130px] object-contain hover:scale-105 transition-transform" 
                />
                <img 
                  src="/logos/magento.svg" 
                  alt="Magento" 
                  className="h-9 sm:h-11 max-w-[130px] object-contain hover:scale-105 transition-transform" 
                />
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-6 pt-5 border-t border-slate-100 text-justify font-normal">
                *Para las cuentas con Shopify, es necesario contar con el plan anual o Advance. Como se detalla en el siguiente enlace, la funcionalidad de 'Tarifas de envío calculadas por empresas de transporte externas' requiere contar con la funcionalidad llamada CCS (Carrier Calculated Shipping), la cual está incluida en el plan 'Advanced Shopify', pero se puede solicitar como adición en los planes 'Basic Shopify' y 'Shopify' sin costo cuando estos se contratan anualmente, de lo contrario tiene un costo adicional. Para solicitarlo se debe hacer desde la zona de administración ya sea por live chat, a través del 'Centro de Ayuda' (Shopify Help Center) o por mail.
              </p>
            </div>

            {/* 4. Sigue y corrobora los siguientes puntos */}
            <div>
              <h4 className="text-[18px] md:text-[20px] font-title font-bold text-[#303030] mb-8">
                Sigue y corrobora los siguientes puntos:
              </h4>
              <div className="space-y-10">
                {/* Punto 1: Solicitar token */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-starken-green-light text-starken-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-starken-text-dark">
                      Solicitar token:
                    </h5>
                    <p className="font-body text-[14px] md:text-[16px] text-[#505050] mt-2 font-normal leading-relaxed">
                      Ingresa a tu cuenta de Starken Pro y completa el formulario 'Solicitud Plugins'.
                    </p>
                  </div>
                </div>

                {/* Punto 2: Opciones de pago */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-starken-green-light text-starken-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm sm:text-base font-bold text-starken-text-dark">
                      Opciones de pago:
                    </h5>
                    <p className="font-body text-[14px] md:text-[16px] text-[#505050] mt-2 mb-5 font-normal leading-relaxed">
                      Para hacer efectiva la integración, debes tener en cuenta que las opciones de pago dependen directamente del tipo de cliente que selecciones al momento de solicitar el token. Actualmente contamos con los siguientes tipos:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-white shadow-sm">
                        <span className="font-title text-[14px] md:text-[16px] font-bold text-starken-text-dark block mb-2">
                          Personas naturales o Somos partner:
                        </span>
                        <p className="font-body text-[14px] md:text-[16px] text-[#505050] leading-relaxed font-normal">
                          Poseen despacho por pagar en destino (El destinatario es quien paga el valor del despacho al momento de recibir el envío).
                        </p>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-white shadow-sm">
                        <span className="font-title text-[14px] md:text-[16px] font-bold text-starken-text-dark block mb-2">
                          Cuenta corriente Starken:
                        </span>
                        <p className="font-body text-[14px] md:text-[16px] text-[#505050] leading-relaxed font-normal">
                          Poseen despacho pago en línea, el costo del envío se paga junto con la compra realizada. Solicítala en <a href="https://starken.cl/empresas" target="_blank" rel="noopener noreferrer" className="text-starken-green font-semibold hover:underline">starken.cl/empresas</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Punto 3: Descargar plugin */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-starken-green-light text-starken-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-starken-text-dark">
                      Descargar plugin:
                    </h5>
                    <p className="font-body text-[14px] md:text-[16px] text-[#505050] mt-2 font-normal leading-relaxed">
                      Descarga de Plugin oficial (Disponible en la sección Links de descarga)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Recomendaciones importantes */}
            <div className="pt-6 sm:pt-8">
              <h4 className="text-[18px] md:text-[20px] font-title font-bold text-[#303030] mb-5">
                Recomendaciones importantes:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* Columna 1 (3 recomendaciones) */}
                <div className="space-y-3">
                  {[
                    'Contar con un especialista para la correcta instalación.',
                    'Recomendamos contar con un ambiente para poder realizar las pruebas de implementación e integración, para lograr el correcto funcionamiento del plugin.',
                    'Tener claro pesos y dimensiones por cada uno de tus productos embalados, para poder tarificar y que el valor sea el mismo que se aplicará al momento de recepcionar los paquetes en Starken.'
                  ].map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-starken-green flex-shrink-0 mt-0.5" />
                      <p className="font-body text-[14px] md:text-[16px] text-[#505050] leading-relaxed font-normal">
                        {rec}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Columna 2 (2 recomendaciones) */}
                <div className="space-y-3">
                  {[
                    'En caso de pesos o dimensiones diferentes el costo podría variar respecto a lo tarificado online al momento de la compra. (Recuerda que al momento de recepcionar las ofs rectificamos medidas y peso)',
                    'Evita plugins que modifiquen el check out, ya que pueden generar errores de funcionamiento en nuestro plugin.'
                  ].map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-starken-green flex-shrink-0 mt-0.5" />
                      <p className="font-body text-[14px] md:text-[16px] text-[#505050] leading-relaxed font-normal">
                        {rec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* View: FAQs */}
        {resourceTab === 'faq' && (
          <div id="faq" className="w-full space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-starken-green bg-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-starken-green' : 'text-starken-text-dark'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-starken-green-light text-starken-green' : 'bg-slate-100 text-slate-500'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-[14px] md:text-[16px] text-[#505050] leading-relaxed border-t border-slate-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default ResourcesSection;
