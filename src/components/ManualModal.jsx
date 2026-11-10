import React from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

const ManualModal = ({ isOpen, onClose, platform, pdfUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-starken-green-light flex items-center justify-center text-starken-green">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-starken-text-dark">
                Manual de Integración {platform}
              </h3>
              <span className="text-xs text-starken-text-muted">Documento Técnico Oficial Starken</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-starken-green hover:bg-slate-200 rounded-[7px] transition-colors"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-[7px] transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Viewer */}
        <div className="flex-1 p-4 bg-slate-100 overflow-hidden min-h-[400px]">
          <iframe
            src={pdfUrl}
            title={`Manual ${platform}`}
            className="w-full h-full rounded-xl border border-slate-200 min-h-[450px]"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">¿Dudas con la instalación? Contáctanos a integraciones@starken.cl</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-starken-primary w-full sm:w-auto text-xs py-2 px-4 flex items-center justify-center gap-1.5 rounded-full md:rounded-[7px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ManualModal;
