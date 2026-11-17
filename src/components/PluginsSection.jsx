import React, { useState } from 'react';
import { Download, ExternalLink, Key, CheckCircle, FileText, Video, Sparkles, ArrowUpRight } from 'lucide-react';

const PluginsSection = ({ onSelectPluginForContact, onOpenManual, onOpenVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const plugins = [
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      version: 'v2.4.1',
      compatibility: 'WordPress 5.8+ / Woo 6.0+',
      logo: '/logos/woocommerce.png',
      description: 'El plugin más popular para tiendas WordPress. Integra cotización en tiempo real en carrito/checkout, emisión masiva de etiquetas e impresión directa desde el panel de administración.',
      downloadUrl: 'https://developers.starken.cl/assets/plugins/plugins_woocommerce.zip',
      isAppStore: false,
      features: [
        'Cálculo de tarifas en carrito y checkout',
        'Impresión de etiquetas térmicas y PDF',
        'Sincronización con StarkenPro',
        'Soporte multi-bodega'
      ],
      manualPdf: 'https://developers.starken.cl/assets/manuales/manualWoocommerce.pdf',
      videoTutorial: 'https://www.youtube.com/embed/6AvG6k6Mhms'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      version: 'Oficial App Store',
      compatibility: 'Shopify Plus & Standard',
      logo: '/logos/shopify.svg',
      description: 'App oficial de Starken en la tienda Shopify App Store. Automatiza el cálculo de tarifas Carrier Service, genera números de seguimiento al preparar pedidos y despacha a todo Chile.',
      downloadUrl: 'https://apps.shopify.com/starken-envios-a-todo-chile?locale=es',
      isAppStore: true,
      features: [
        'Carrier Service API en vivo',
        'Fulfillment automático de pedidos',
        'Envío de tracking a clientes por email/SMS',
        'Instalación en 1-click desde App Store'
      ],
      manualPdf: 'https://developers.starken.cl/assets/manuales/manualShopify.pdf',
      videoTutorial: 'https://www.youtube.com/embed/XDQS0upsKkI'
    },
    {
      id: 'prestashop',
      name: 'PrestaShop',
      version: 'v1.8.2',
      compatibility: 'PrestaShop 1.7.x / 8.x',
      logo: '/logos/prestashop.png',
      description: 'Módulo oficial para PrestaShop. Configura reglas de envío por zonas, calcula el costo exacto por transportista y genera los manifiestos de despacho con un solo clic.',
      downloadUrl: 'https://developers.starken.cl/assets/plugins/plugins_prestashop.zip',
      isAppStore: false,
      features: [
        'Integración con transportistas nativos',
        'Generación de etiquetas desde backoffice',
        'Configuración de margen comercial sobre el flete',
        'Soporte para envíos a domicilio o agencia'
      ],
      manualPdf: 'https://developers.starken.cl/assets/manuales/manualPrestashop.pdf',
      videoTutorial: 'https://www.youtube.com/embed/MmFjzGJWlVE'
    },
    {
      id: 'magento',
      name: 'Magento (Adobe)',
      version: 'v2.3.0',
      compatibility: 'Adobe Commerce / Magento 2.4+',
      logo: '/logos/magento.svg',
      description: 'Módulo robusto para plataformas corporativas de alto volumen en Magento 2. Manejo avanzado de inventarios multi-origen y despacho consolidado a nivel nacional.',
      downloadUrl: 'https://developers.starken.cl/assets/plugins/plugins_magento.zip',
      isAppStore: false,
      features: [
        'Arquitectura para alto tráfico y grandes catálogos',
        'Mapeo de comunas y regiones oficiales',
        'Descarga masiva de guías de despacho',
        'Registro de auditoría y logs detallados'
      ],
      manualPdf: 'https://developers.starken.cl/assets/manuales/manualMagento.pdf',
      videoTutorial: 'https://www.youtube.com/embed/_yNIGv6sMNk'
    }
  ];

  return (
    <section id="plugins" className="py-20 bg-gradient-to-b from-starken-green to-starken-green-dark">
      <div className="container-starken">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
          <h2 className="text-[28px] font-bold font-title text-white mb-2.5 leading-tight">
            Nuestros plugins
          </h2>
          <p className="font-body text-[14px] md:text-[16px] text-white/90 leading-relaxed whitespace-normal lg:whitespace-nowrap">
            Simplifica y potencia tu negocio en línea con nuestra solución de integración sencilla y confiable.
          </p>

          {/* Token Banner */}
          <div className="mt-6 inline-flex flex-col md:flex-row items-center justify-center gap-2.5 md:gap-3 p-4 md:p-3 px-5 md:px-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-sm text-white max-w-md md:max-w-none mx-auto">
            {/* Icon + Text horizontally aligned */}
            <div className="flex items-center justify-center gap-2">
              <Key className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span className="text-[14px] font-semibold text-white">
                ¿Necesitas tu Token de API para configurar el plugin?
              </span>
            </div>

            {/* Hyperlink centered below on mobile, inline on desktop */}
            <a
              href="https://starkenpro.cl/login?formPlugin=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-bold text-white underline hover:text-white/80 inline-flex items-center gap-1 justify-center"
            >
              Obtener Token en StarkenPro
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Plugin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {plugins.map((plugin) => (
            <div
              key={plugin.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="h-12 flex items-center">
                    <img
                      src={plugin.logo}
                      alt={`Logo ${plugin.name}`}
                      className="h-9 max-w-[140px] object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span class="font-extrabold text-xl text-starken-text-dark">${plugin.name}</span>`;
                      }}
                    />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-[#505050]">
                    {plugin.version}
                  </span>
                </div>

                <h3 className="text-[16px] md:text-lg font-bold text-[#303030] mb-2">
                  Plugin Starken para {plugin.name}
                </h3>

                <p className="text-[14px] md:text-[16px] text-[#505050] leading-relaxed mb-6 font-normal">
                  {plugin.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 mb-6 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                  <span className="font-title text-[14px] md:text-[16px] font-bold text-[#303030] block mb-2">
                    Características incluidas:
                  </span>
                  {plugin.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-[14px] md:text-[16px] text-[#505050]">
                      <CheckCircle className="w-4 h-4 text-starken-green flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenManual(plugin.name, plugin.manualPdf)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full md:rounded-[7px] bg-slate-100 hover:bg-slate-200 text-[#303030] text-[14px] font-bold transition-colors"
                    title="Ver Manual PDF"
                  >
                    <FileText className="w-4 h-4 text-starken-green" />
                    <span>Manual</span>
                  </button>
                  <button
                    onClick={() => onOpenVideo(plugin.name, plugin.videoTutorial)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full md:rounded-[7px] bg-slate-100 hover:bg-slate-200 text-[#303030] text-[14px] font-bold transition-colors"
                    title="Ver Video Tutorial"
                  >
                    <Video className="w-4 h-4 text-starken-orange" />
                    <span>Video</span>
                  </button>
                </div>

                <a
                  href={plugin.downloadUrl}
                  target={plugin.isAppStore ? "_blank" : "_self"}
                  rel={plugin.isAppStore ? "noopener noreferrer" : undefined}
                  className="btn-starken-primary w-full sm:w-auto !text-[14px] text-[14px] py-2.5 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full md:rounded-[7px]"
                >
                  {plugin.isAppStore ? (
                    <>
                      <span className="text-[14px]">Ver en Shopify Store</span>
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    </>
                  ) : (
                    <>
                      <span className="text-[14px]">Descargar Plugin</span>
                      <Download className="w-3.5 h-3.5 flex-shrink-0" />
                    </>
                  )}
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PluginsSection;
