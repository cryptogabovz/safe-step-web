import React, { useState } from 'react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const INTERESTS = [
  'Calzado de seguridad',
  'Guantes industriales',
  'Mangueras de alta presión',
  'Discos de corte y abrasivos',
  'Cotización empresarial',
  'Otro',
];

function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', interest: '', message: ''
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/contactForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Error al enviar. Intenta de nuevo.');
        setState('error');
      } else {
        setState('success');
      }
    } catch {
      setErrorMsg('Error de conexión. Verifica tu internet e intenta de nuevo.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: '#e8f5f4' }}
        >
          <svg className="w-8 h-8" style={{ color: '#187772' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Recibimos tu consulta. Te contactaremos a <strong>{form.email}</strong> en las próximas 24 horas hábiles.
        </p>
        <button
          onClick={() => { setState('idle'); setForm({ name: '', email: '', phone: '', company: '', interest: '', message: '' }); }}
          className="mt-6 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: '#187772' }}
        >
          Enviar otro mensaje →
        </button>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent bg-white transition";
  const ringStyle = { '--tw-ring-color': '#187772' } as React.CSSProperties;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre completo *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Tu nombre" className={inputClass} style={ringStyle} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Correo electrónico *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="tu@empresa.com" className={inputClass} style={ringStyle} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Teléfono / WhatsApp</label>
          <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+52 55 1234 5678" className={inputClass} style={ringStyle} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Empresa</label>
          <input value={form.company} onChange={set('company')} placeholder="Nombre de tu empresa" className={inputClass} style={ringStyle} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">¿En qué producto estás interesado?</label>
        <select value={form.interest} onChange={set('interest')} className={inputClass} style={ringStyle}>
          <option value="">Selecciona una opción</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mensaje *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder="Cuéntanos qué necesitas: volumen estimado, industria, fechas de entrega..."
          className={`${inputClass} resize-none`}
          style={ringStyle}
        />
      </div>
      {state === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: '#187772' }}
      >
        {state === 'sending' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Enviando…
          </>
        ) : (
          <>
            Enviar Mensaje
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

const INFO_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Correo',
    value: 'contacto@aresafestep.com',
    href: 'mailto:contacto@aresafestep.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Oficina',
    value: '8603 NW 54th Street, Doral FL 33166, USA',
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Horario',
    value: 'Lun – Vie: 9:00 AM – 6:00 PM EST',
    href: null,
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-2">
            <a href="/" className="hover:text-gray-600 transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-gray-700">Contacto</span>
          </nav>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#187772' }}>
            Hablemos
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl leading-relaxed">
            Cotizaciones empresariales, consultas técnicas o información de productos.
            Respondemos en menos de 24 horas hábiles.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-5 gap-14">

          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-10">

            <div className="space-y-6">
              {INFO_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#e8f5f4', color: '#187772' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-gray-800 hover:opacity-70 transition-opacity font-medium">{item.value}</a>
                    ) : (
                      <span className="text-sm text-gray-800 font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Cotización info */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#e8f5f4' }}>
              <h3 className="font-bold text-gray-900 mb-2">Cotizaciones Empresariales</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Para pedidos al mayoreo, distribución o contratos corporativos,
                envíanos tu solicitud con volumen estimado y te preparamos una
                propuesta personalizada.
              </p>
              <div className="text-xs font-semibold" style={{ color: '#187772' }}>
                Respuesta garantizada en 24 hrs hábiles
              </div>
            </div>

            {/* Garantías */}
            <div className="space-y-3">
              {[
                'Garantía de 6 meses en calzado de seguridad',
                'Productos certificados NOM-STPS e ISO',
                'Envíos a toda América Latina',
              ].map((g) => (
                <div key={g} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#187772' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {g}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
              <ContactForm />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10,
};
