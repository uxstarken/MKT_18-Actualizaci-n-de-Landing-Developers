import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  ArrowRight,
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  User, 
  ShieldCheck,
  Eye,
  EyeOff,
  Search,
  Lock,
  MapPin,
  Phone,
  Building2,
  ChevronDown
} from 'lucide-react';
import { validateChileanRut, formatChileanRut, submitIntegrationLead } from '../services/leadService';

const ContactForm = ({ preselectedService, preselectedPlatform }) => {
  const [formData, setFormData] = useState({
    rut: '',
    name: '',
    lastName: '',
    email: '',
    address: '',
    comuna: '',
    sucursal: '',
    phone: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    platform: 'WooCommerce',
    serviceType: 'Emisión de Envíos y Plugins'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [sucursalOpen, setSucursalOpen] = useState(false);
  const sucursalRef = useRef(null);
  const [comunaOpen, setComunaOpen] = useState(false);
  const comunaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sucursalRef.current && !sucursalRef.current.contains(event.target)) {
        setSucursalOpen(false);
      }
      if (comunaRef.current && !comunaRef.current.contains(event.target)) {
        setComunaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSucursal = (suc) => {
    setFormData(prev => ({ ...prev, sucursal: suc }));
    setTouched(prev => ({ ...prev, sucursal: true }));
    const error = validateField('sucursal', suc);
    setErrors(prev => ({ ...prev, sucursal: error }));
    setSucursalOpen(false);
  };

  const handleSelectComuna = (com) => {
    setFormData(prev => ({ ...prev, comuna: com }));
    setTouched(prev => ({ ...prev, comuna: true }));
    const error = validateField('comuna', com);
    setErrors(prev => ({ ...prev, comuna: error }));
    setComunaOpen(false);
  };

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceType: preselectedService }));
    }
    if (preselectedPlatform) {
      setFormData(prev => ({ ...prev, platform: preselectedPlatform }));
    }
  }, [preselectedService, preselectedPlatform]);

  const comunasChile = [
    'Arica', 'Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Antofagasta', 'Calama', 'Tocopilla',
    'Copiapó', 'Vallenar', 'Caldera', 'La Serena', 'Coquimbo', 'Ovalle', 'Illapel',
    'Valparaíso', 'Viña del Mar', 'Concón', 'Quilpué', 'Villa Alemana', 'Quillota', 'San Antonio',
    'Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Vitacura', 'Lo Barnechea', 'La Florida',
    'Maipú', 'Puente Alto', 'San Miguel', 'San Bernardo', 'Peñalolén', 'Macul', 'Estación Central',
    'Huechuraba', 'Quilicura', 'Pudahuel', 'Recoleta', 'Independencia', 'Colina', 'Lampa',
    'Rancagua', 'Machalí', 'San Fernando', 'Rengo', 'Curicó', 'Talca', 'Linares', 'Constitución',
    'Chillán', 'Chillán Viejo', 'San Carlos', 'Concepción', 'Talcahuano', 'San Pedro de la Paz',
    'Chiguayante', 'Coronel', 'Los Ángeles', 'Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón',
    'Valdivia', 'La Unión', 'Osorno', 'Puerto Montt', 'Puerto Varas', 'Castro', 'Ancud',
    'Coyhaique', 'Puerto Aysén', 'Punta Arenas', 'Puerto Natales'
  ];

  const sucursalesStarken = [
    'Starken Santiago Centro (San Pablo)',
    'Starken Providencia (Av. Providencia)',
    'Starken Las Condes (Apoquindo)',
    'Starken Las Condes (Cantagallo)',
    'Starken Vitacura',
    'Starken Maipú (Av. Pajaritos)',
    'Starken La Florida (Vicente Valdés)',
    'Starken Puente Alto (Concha y Toro)',
    'Starken San Bernardo',
    'Starken Huechuraba (Mall Plaza Norte)',
    'Starken Quilicura',
    'Starken Viña del Mar (Arlegui)',
    'Starken Valparaíso (Brasil)',
    'Starken Quilpué',
    'Starken Concón',
    'Starken Rancagua (O\'Carrol)',
    'Starken Talca (1 Sur)',
    'Starken Curicó',
    'Starken Chillán (Constitución)',
    'Starken Concepción (Paicaví)',
    'Starken Concepción (O\'Higgins)',
    'Starken Talcahuano',
    'Starken Los Ángeles',
    'Starken Temuco (Caupolicán)',
    'Starken Valdivia (Picarte)',
    'Starken Osorno (Mackenna)',
    'Starken Puerto Montt (Urmeneta)',
    'Starken Puerto Varas',
    'Starken La Serena (El Santo)',
    'Starken Coquimbo',
    'Starken Antofagasta (Balmaceda)',
    'Starken Calama',
    'Starken Iquique (Tarapacá)',
    'Starken Arica (General Velásquez)',
    'Starken Copiapó',
    'Starken Punta Arenas'
  ];

  const displayedSucursales = (!formData.sucursal || sucursalesStarken.includes(formData.sucursal))
    ? sucursalesStarken
    : sucursalesStarken.filter(s => s.toLowerCase().includes(formData.sucursal.toLowerCase()));

  const displayedComunas = (!formData.comuna || comunasChile.includes(formData.comuna))
    ? comunasChile
    : comunasChile.filter(c => c.toLowerCase().includes(formData.comuna.toLowerCase()));

  const validateField = (name, value, currentFormData = formData) => {
    let error = '';
    switch (name) {
      case 'rut':
        if (!value.trim()) {
          error = 'Ingresa el RUT personal o de empresa';
        } else if (!validateChileanRut(value)) {
          error = 'RUT inválido (ej: 12.345.678-9)';
        }
        break;
      case 'name':
        if (!value.trim()) error = 'Ingresa tu nombre personal o empresa';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Ingresa tu e-mail';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Formato de e-mail no válido';
        }
        break;
      case 'address':
        if (!value.trim()) error = 'Ingresa tu dirección';
        break;
      case 'comuna':
        if (!value.trim()) error = 'Selecciona o escribe tu comuna';
        break;
      case 'sucursal':
        if (!value.trim()) error = 'Selecciona tu sucursal frecuente';
        break;
      case 'mobile':
        if (!value.trim()) {
          error = 'Ingresa tu número móvil';
        } else if (value.replace(/\D/g, '').length < 8) {
          error = 'Móvil incompleto (mínimo 8 dígitos)';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Ingresa tu contraseña';
        } else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
          error = 'La contraseña debe incluir mayúscula, minúscula y número';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Confirma tu contraseña';
        } else if (value !== currentFormData.password) {
          error = 'Las contraseñas no coinciden';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'rut') {
      formattedValue = formatChileanRut(value);
    } else if (name === 'mobile' || name === 'phone') {
      formattedValue = value.replace(/[^\d+ ]/g, '');
    }

    const updatedFormData = { ...formData, [name]: formattedValue };
    setFormData(updatedFormData);

    if (touched[name]) {
      const error = validateField(name, formattedValue, updatedFormData);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword, updatedFormData);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos obligatorios
    const requiredFields = ['rut', 'name', 'email', 'address', 'comuna', 'sucursal', 'mobile', 'password', 'confirmPassword'];
    const newTouched = {};
    const newErrors = {};
    let hasError = false;

    requiredFields.forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    });

    setTouched(prev => ({ ...prev, ...newTouched }));
    setErrors(newErrors);

    if (hasError) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await submitIntegrationLead(formData);
      setSubmitResult({
        success: true,
        leadId: res.leadId,
        message: '¡Registro completado con éxito! Tu cuenta ha sido creada y nuestro equipo te contactará para apoyarte en la integración.'
      });
    } catch (err) {
      setSubmitResult({
        success: false,
        message: 'Ocurrió un error al procesar el registro. Por favor intenta nuevamente o contáctanos a integraciones@starken.cl.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      rut: '',
      name: '',
      lastName: '',
      email: '',
      address: '',
      comuna: '',
      sucursal: '',
      phone: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      platform: 'WooCommerce',
      serviceType: 'Emisión de Envíos y Plugins'
    });
    setTouched({});
    setErrors({});
    setSubmitResult(null);
  };

  const password = formData.password || '';
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <section id="contacto" className="py-20 bg-[#F8FAFC]">
      <div className="container-starken">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[28px] font-bold font-title text-[#303030] mb-4 leading-tight">
            Registro y <span className="text-starken-green">solicitud de contacto</span>
          </h2>
          <p className="font-body text-[14px] md:text-[16px] text-[#505050] leading-relaxed">
            Regístrate para habilitar tu cuenta comercial, solicitar credenciales de API o recibir asistencia de nuestro personal de integración.
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Top Green Accent Bar */}
          <div className="h-2.5 bg-gradient-to-r from-starken-green via-emerald-500 to-starken-green-dark" />

          <div className="p-6 sm:p-10 lg:p-12">
            
            {submitResult && submitResult.success ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 rounded-full bg-starken-green-light text-starken-green flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-starken-green tracking-wide">
                    Código de registro: {submitResult.leadId}
                  </span>
                  <h3 className="text-2xl font-bold text-starken-text-dark">
                    ¡Registro completado con éxito!
                  </h3>
                  <p className="text-sm sm:text-base text-starken-text-muted max-w-lg mx-auto leading-relaxed">
                    {submitResult.message}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-xs text-slate-600 space-y-1 text-left">
                  <div className="flex items-center gap-2 text-starken-green font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Registro corporativo confirmado</span>
                  </div>
                  <p>Notificación enviada a: <strong>fernanda.osorio@starken.cl</strong> / <strong>integraciones@starken.cl</strong></p>
                  <p>Base de datos: <strong>Oracle DB Starken (IC-617)</strong></p>
                </div>

                <button
                  onClick={handleReset}
                  className="btn-starken-outline w-full sm:w-auto text-xs px-6 py-2.5 rounded-full md:rounded-[7px]"
                >
                  Registrar otra cuenta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                
                {/* 1. TUS DATOS */}
                <div>
                  <div className="flex items-center gap-2.5 mb-6">
                    <User className="w-5 h-5 text-starken-green" />
                    <h4 className="font-title font-bold text-[16px] md:text-[18px] text-[#303030]">
                      Tus datos
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* RUT personal o empresa */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Rut personal o empresa <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="rut"
                        maxLength={12}
                        value={formData.rut}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingresa tu RUT personal o empresa *"
                        className={`w-full px-4 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] ${
                          touched.rut && errors.rut
                            ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                            : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                        }`}
                      />
                      {touched.rut && errors.rut && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.rut}
                        </p>
                      )}
                    </div>

                    {/* Nombre personal o empresa */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Nombre personal o empresa <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingresa tu nombre personal o empresa *"
                        className={`w-full px-4 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] ${
                          touched.name && errors.name
                            ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                            : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Apellido (si es que aplica) */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Apellido <span className="text-[#505050] font-normal">(si es que aplica)</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Ingresa tu apellido (si es que aplica)"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-starken-green focus:ring-2 focus:ring-starken-green/20 font-body text-[14px] font-medium text-[#303030] placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] focus:outline-none"
                      />
                    </div>

                    {/* E-mail */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Correo electrónico / e-mail <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingresa tu e-mail *"
                        className={`w-full px-4 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] ${
                          touched.email && errors.email
                            ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                            : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* 2. DATOS DE DIRECCIÓN */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2.5 mb-6">
                    <MapPin className="w-5 h-5 text-starken-green" />
                    <h4 className="font-title font-bold text-[16px] md:text-[18px] text-[#303030]">
                      Datos de dirección
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Dirección */}
                    <div className="md:col-span-2">
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Dirección <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingresa tu dirección *"
                        className={`w-full px-4 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] ${
                          touched.address && errors.address
                            ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                            : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                        }`}
                      />
                      {touched.address && errors.address && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Comuna */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Ingresa tu comuna <span className="text-rose-500">*</span>
                      </label>
                      <div ref={comunaRef} className="relative">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Search className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="comuna"
                            autoComplete="off"
                            value={formData.comuna}
                            onChange={(e) => {
                              handleChange(e);
                              setComunaOpen(true);
                            }}
                            onClick={() => setComunaOpen(true)}
                            onFocus={() => setComunaOpen(true)}
                            placeholder="Escribe para buscar tu comuna"
                            className={`w-full pl-10 pr-10 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 bg-white placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] cursor-pointer ${
                              touched.comuna && errors.comuna
                                ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                                : comunaOpen
                                ? 'border-starken-green ring-2 ring-starken-green/20 text-[#303030]'
                                : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setComunaOpen(prev => !prev)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-starken-green focus:outline-none cursor-pointer"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${comunaOpen ? 'rotate-180 text-starken-green' : 'text-slate-400'}`} />
                          </button>
                        </div>

                        {comunaOpen && (
                          <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 max-h-60 overflow-y-auto sucursal-scrollbar py-1">
                            {displayedComunas.map((com) => {
                              const isSelected = formData.comuna === com;
                              return (
                                <div
                                  key={com}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleSelectComuna(com);
                                  }}
                                  className={`px-4 py-2.5 text-[14px] font-body cursor-pointer transition-colors duration-150 ${
                                    isSelected
                                      ? 'bg-[#009D4E] text-white font-semibold'
                                      : 'text-[#303030] hover:bg-[#009D4E] hover:text-white'
                                  }`}
                                >
                                  {com}
                                </div>
                              );
                            })}
                            {displayedComunas.length === 0 && (
                              <div className="px-4 py-3 text-[14px] font-body text-slate-400 text-center">
                                No se encontraron comunas
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {touched.comuna && errors.comuna && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.comuna}
                        </p>
                      )}
                    </div>

                    {/* Sucursal frecuente */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Sucursal frecuente <span className="text-rose-500">*</span>
                      </label>
                      <div ref={sucursalRef} className="relative">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Search className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="sucursal"
                            autoComplete="off"
                            value={formData.sucursal}
                            onChange={(e) => {
                              handleChange(e);
                              setSucursalOpen(true);
                            }}
                            onClick={() => setSucursalOpen(true)}
                            onFocus={() => setSucursalOpen(true)}
                            placeholder="Escribe para buscar tu sucursal"
                            className={`w-full pl-10 pr-10 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 bg-white placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] cursor-pointer ${
                              touched.sucursal && errors.sucursal
                                ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                                : sucursalOpen
                                ? 'border-starken-green ring-2 ring-starken-green/20 text-[#303030]'
                                : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setSucursalOpen(prev => !prev)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-starken-green focus:outline-none cursor-pointer"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${sucursalOpen ? 'rotate-180 text-starken-green' : 'text-slate-400'}`} />
                          </button>
                        </div>

                        {sucursalOpen && (
                          <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 max-h-60 overflow-y-auto sucursal-scrollbar py-1">
                            <div
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelectSucursal('');
                              }}
                              className={`px-4 py-2.5 text-[14px] font-body cursor-pointer transition-colors duration-150 ${
                                !formData.sucursal
                                  ? 'bg-[#009D4E] text-white font-semibold'
                                  : 'text-[#303030] hover:bg-[#009D4E] hover:text-white'
                              }`}
                            >
                              Escribe para buscar tu sucursal
                            </div>
                            {displayedSucursales.map((suc) => {
                              const isSelected = formData.sucursal === suc;
                              return (
                                <div
                                  key={suc}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleSelectSucursal(suc);
                                  }}
                                  className={`px-4 py-2.5 text-[14px] font-body cursor-pointer transition-colors duration-150 ${
                                    isSelected
                                      ? 'bg-[#009D4E] text-white font-semibold'
                                      : 'text-[#303030] hover:bg-[#009D4E] hover:text-white'
                                  }`}
                                >
                                  {suc}
                                </div>
                              );
                            })}
                            {displayedSucursales.length === 0 && (
                              <div className="px-4 py-3 text-[14px] font-body text-slate-400 text-center">
                                No se encontraron sucursales
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {touched.sucursal && errors.sucursal && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.sucursal}
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* 3. CONTACTO Y ACCESO */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2.5 mb-6">
                    <Lock className="w-5 h-5 text-starken-green" />
                    <h4 className="font-title font-bold text-[16px] md:text-[18px] text-[#303030]">
                      Contacto y acceso
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    
                    {/* Teléfono */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Ingresa tu teléfono <span className="text-[#505050] font-normal">(opcional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ingresa tu teléfono"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-starken-green focus:ring-2 focus:ring-starken-green/20 font-body text-[14px] font-medium text-[#303030] placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] focus:outline-none"
                      />
                    </div>

                    {/* Móvil */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Ingresa tu móvil <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none font-body text-[14px] font-bold text-slate-500">
                          +56
                        </div>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Ej: 987654321"
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] ${
                            touched.mobile && errors.mobile
                              ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                              : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                          }`}
                        />
                      </div>
                      {touched.mobile && errors.mobile && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* Ingresa tu contraseña */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Ingresa tu contraseña <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Ingresa tu contraseña *"
                          className={`w-full pl-4 pr-11 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] ${
                            touched.password && errors.password
                              ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                              : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {touched.password && errors.password && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.password}
                        </p>
                      )}

                      {/* Checklist de requisitos de contraseña */}
                      <div className="mt-2.5 space-y-2 pl-1">
                        <div className={`flex items-center gap-2 text-[14px] transition-colors ${hasUpper ? 'text-starken-green font-semibold' : 'text-[#505050]'}`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${hasUpper ? 'bg-starken-green text-white' : 'border border-slate-300 text-[#505050]'}`}>
                            {hasUpper ? '✓' : '!'}
                          </span>
                          <span>Una letra mayúscula</span>
                        </div>
                        <div className={`flex items-center gap-2 text-[14px] transition-colors ${hasLower ? 'text-starken-green font-semibold' : 'text-[#505050]'}`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${hasLower ? 'bg-starken-green text-white' : 'border border-slate-300 text-[#505050]'}`}>
                            {hasLower ? '✓' : '!'}
                          </span>
                          <span>Una letra minúscula</span>
                        </div>
                        <div className={`flex items-center gap-2 text-[14px] transition-colors ${hasNumber ? 'text-starken-green font-semibold' : 'text-[#505050]'}`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${hasNumber ? 'bg-starken-green text-white' : 'border border-slate-300 text-[#505050]'}`}>
                            {hasNumber ? '✓' : '!'}
                          </span>
                          <span>Un dígito numérico</span>
                        </div>
                      </div>
                    </div>

                    {/* Confirma tu contraseña */}
                    <div>
                      <label className="block font-body text-[14px] font-bold text-[#303030] mb-1.5">
                        Confirma tu contraseña <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Confirma tu contraseña *"
                          className={`w-full pl-4 pr-11 py-3 rounded-xl border font-body text-[14px] font-medium transition-all focus:outline-none focus:ring-2 placeholder:font-body placeholder:text-[14px] placeholder:text-[#94A3B8] ${
                            touched.confirmPassword && errors.confirmPassword
                              ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200 text-rose-900'
                              : 'border-slate-200 focus:border-starken-green focus:ring-starken-green/20 text-[#303030]'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {submitResult && !submitResult.success && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{submitResult.message}</span>
                  </div>
                )}

                {/* Submit button & Privacy info */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 text-[14px] text-[#505050] text-center sm:text-left max-w-sm sm:max-w-lg">
                    <ShieldCheck className="w-4 h-4 text-starken-green flex-shrink-0" />
                    <span>Tus datos serán almacenados de forma segura según la normativa de privacidad de Starken.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-starken-orange w-full sm:w-auto text-sm px-8 py-3 flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0 font-body font-bold shadow-md shadow-starken-orange/20 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed rounded-full md:rounded-[7px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <span>Registrar</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
