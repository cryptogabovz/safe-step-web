import React, { useState } from 'react';
import SafeStepDesign, {
  img,
  SS,
  Eyebrow,
  CropCorners
} from '../safestepShared/SafeStepDesign.js';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const INTERESTS = [
  'Calzado de seguridad',
  'Guantes industriales',
  'Mangueras de alta presión',
  'Discos de corte y abrasivos',
  'Cotización empresarial',
  'Otro'
];

function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', interest: '', message: ''
  });
  const [honeypot, setHoneypot] = useState('');

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    setErrorMsg('');
    if (honeypot) {
      setState('success');
      return;
    }
    try {
      const res = await fetch('/contactForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
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
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: SS.amber }}>
          <svg className="w-8 h-8" style={{ color: SS.ink }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="ss-display text-2xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>¡Mensaje enviado!</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Recibimos tu consulta. Te contactaremos a <strong>{form.email}</strong> en las próximas 24 horas hábiles.
        </p>
        <button
          onClick={() => { setState('idle'); setForm({ name: '', email: '', phone: '', company: '', interest: '', message: '' }); }}
          className="ss-label mt-6 transition-colors hover:opacity-80"
          style={{ color: SS.teal }}
        >
          Enviar otro mensaje →
        </button>
      </div>
    );
  }

  const inputClass = 'ss-input w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white';
  const inputStyle = { borderColor: SS.mint } as React.CSSProperties;

  return (
    <form onSubmit={submit} className="space-y-5" style={{ position: 'relative' }}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="ss-label block mb-1.5" style={{ color: '#6b7280', fontSize: '.62rem' }}>Nombre completo *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Tu nombre" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="ss-label block mb-1.5" style={{ color: '#6b7280', fontSize: '.62rem' }}>Correo electrónico *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="tu@empresa.com" className={inputClass} style={inputStyle} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="ss-label block mb-1.5" style={{ color: '#6b7280', fontSize: '.62rem' }}>Teléfono / WhatsApp</label>
          <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+52 55 1234 5678" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className="ss-label block mb-1.5" style={{ color: '#6b7280', fontSize: '.62rem' }}>Empresa</label>
          <input value={form.company} onChange={set('company')} placeholder="Nombre de tu empresa" className={inputClass} style={inputStyle} />
        </div>
      </div>
      <div>
        <label className="ss-label block mb-1.5" style={{ color: '#6b7280', fontSize: '.62rem' }}>¿En qué producto estás interesado?</label>
        <select value={form.interest} onChange={set('interest')} className={inputClass} style={inputStyle}>
          <option value="">Selecciona una opción</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <label className="ss-label block mb-1.5" style={{ color: '#6b7280', fontSize: '.62rem' }}>Mensaje *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder="Cuéntanos qué necesitas: volumen estimado, industria, fechas de entrega..."
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>
      {/* honeypot — invisible to humans, bots fill it and get silently ignored */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
        <label htmlFor="hp_website">Website</label>
        <input
          id="hp_website"
          name="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {state === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="ss-btn ss-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-bold text-sm disabled:opacity-60"
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
    href: 'mailto:contacto@aresafestep.com'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Oficina',
    value: '8603 NW 54th Street, Doral FL 33166, USA',
    href: null
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Horario',
    value: 'Lun – Vie: 9:00 AM – 6:00 PM EST',
    href: null
  }
];

export default function ContactoPage() {
  return (
    <div className="ss min-h-screen bg-white">
      <SafeStepDesign />

      {/* Header */}
      <div className="ss-grain relative overflow-hidden" style={{ backgroundColor: SS.ink }}>
        <img
          src={img('/media/safestep/fondo-ferreteria-1.webp', 1600, 75)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2 }}
        />
        <div className="ss-grid absolute inset-0" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(24,119,114,0.5) 0%, rgba(6,24,22,0.78) 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="ss-rise" style={{ animationDelay: '40ms' }}>
            <Eyebrow color={SS.amber}>Hablemos</Eyebrow>
          </div>
          <h1
            className="ss-display ss-rise text-white mt-6 mb-3"
            style={{ animationDelay: '120ms', fontSize: 'clamp(2.4rem,5vw,4.4rem)', fontWeight: 700 }}
          >
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="ss-rise max-w-xl leading-relaxed text-base" style={{ animationDelay: '200ms', color: 'rgba(233,246,244,.78)' }}>
            Cotizaciones empresariales, consultas técnicas o información de
            productos. Respondemos en menos de 24 horas hábiles.
          </p>
        </div>
        <div className="ss-hazard h-2 w-full" />
      </div>

      {/* Content */}
      <div style={{ backgroundColor: SS.paper }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid lg:grid-cols-5 gap-14">

            {/* Left — Info */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-6">
                {INFO_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: SS.mint, color: SS.teal }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="ss-label mb-0.5" style={{ color: '#9ca3af', fontSize: '.6rem' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-gray-800 hover:opacity-70 transition-opacity font-semibold">{item.value}</a>
                      ) : (
                        <span className="text-sm text-gray-800 font-semibold">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cotización info */}
              <div className="ss-crop relative rounded-2xl p-7" style={{ backgroundColor: SS.ink }}>
                <CropCorners />
                <span className="ss-label" style={{ color: SS.amber, fontSize: '.62rem' }}>Mayoreo</span>
                <h3 className="ss-display text-2xl text-white mt-2 mb-2" style={{ fontWeight: 700 }}>Cotizaciones Empresariales</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(233,246,244,.75)' }}>
                  Para pedidos al mayoreo, distribución o contratos corporativos,
                  envíanos tu solicitud con volumen estimado y te preparamos una
                  propuesta personalizada.
                </p>
                <div className="ss-label inline-flex items-center gap-2" style={{ color: SS.teal300, fontSize: '.62rem' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: SS.amber }} />
                  Respuesta en 24 hrs hábiles
                </div>
              </div>

              {/* Garantías */}
              <div className="space-y-3">
                {[
                  'Garantía de 6 meses en calzado de seguridad',
                  'Productos certificados NOM-STPS e ISO',
                  'Envíos a toda América Latina'
                ].map((g) => (
                  <div key={g} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="shrink-0 mt-0.5 w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: SS.amber }}>
                      <svg className="w-3 h-3" style={{ color: SS.ink }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {g}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="ss-card bg-white border rounded-2xl p-8 shadow-sm" style={{ borderColor: SS.mint }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="ss-label" style={{ color: SS.teal }}>Formulario</span>
                  <span className="flex-1 h-px" style={{ backgroundColor: SS.mint }} />
                </div>
                <h2 className="ss-display text-2xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>Envíanos un mensaje</h2>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
