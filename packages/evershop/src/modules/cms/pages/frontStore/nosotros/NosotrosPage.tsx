import React from 'react';
import SafeStepDesign, {
  img,
  SS,
  Eyebrow,
  CropCorners
} from '../safestepShared/SafeStepDesign.js';

const VALUES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Calidad Certificada',
    desc: 'Cada producto cumple con normas NOM-STPS e ISO aplicables. No vendemos lo que no podemos respaldar.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Servicio al Cliente',
    desc: 'Atención personalizada para ferreterías, distribuidores y empresas. Tu proveedor de confianza.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Entrega Rápida',
    desc: 'Logística eficiente a todo el país y América Latina. Pedidos procesados en 24 horas hábiles.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Precios Competitivos',
    desc: 'Descuentos por volumen para mayoristas y distribuidores. Cotizaciones en menos de 24 horas.'
  }
];

const CERTS = [
  { label: 'NOM-113-STPS-2009', desc: 'Calzado de protección' },
  { label: 'ISO 20345:2011', desc: 'Calzado de seguridad' },
  { label: 'EN 388', desc: 'Guantes de protección mecánica' },
  { label: 'ANSI/ISEA 105', desc: 'Guantes industriales' }
];

const STATS = [
  { num: '10+', label: 'Años de experiencia' },
  { num: '500+', label: 'Clientes activos' },
  { num: '15+', label: 'Países atendidos' },
  { num: '98%', label: 'Satisfacción de clientes' }
];

export default function NosotrosPage() {
  return (
    <div className="ss bg-white">
      <SafeStepDesign />

      {/* Hero */}
      <section className="ss-grain relative overflow-hidden" style={{ backgroundColor: SS.ink }}>
        <img
          src={img('/media/safestep/fondo-ferreteria-1.webp', 1600, 80)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="ss-grid absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="ss-rise" style={{ animationDelay: '40ms' }}>
            <Eyebrow color={SS.amber}>Quiénes Somos</Eyebrow>
          </div>
          <h1
            className="ss-display ss-rise text-white mt-6 mb-6 max-w-3xl"
            style={{ animationDelay: '120ms', fontSize: 'clamp(2.6rem,5.5vw,5rem)', fontWeight: 700 }}
          >
            Más de una década protegiendo a quienes trabajan
          </h1>
          <p
            className="ss-rise text-lg max-w-2xl leading-relaxed"
            style={{ animationDelay: '200ms', color: 'rgba(233,246,244,.75)' }}
          >
            SafeStep Corp es un proveedor especializado en equipamiento de
            seguridad industrial. Desde Doral, Florida, suministramos calzado de
            seguridad, guantes, mangueras, discos de corte y EPP certificado a
            ferreterías, constructoras y distribuidores en todo el continente.
          </p>
        </div>
        <div className="ss-hazard h-2 w-full" />
      </section>

      {/* Misión / Visión */}
      <section style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-8">
          {[
            {
              t: 'Misión',
              icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              p: 'Proveer equipamiento de seguridad industrial de alta calidad que proteja la integridad de los trabajadores, respaldado por certificaciones internacionales, un servicio ágil y precios competitivos que fortalezcan la cadena de suministro de nuestros clientes.'
            },
            {
              t: 'Visión',
              icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
              p: 'Ser el proveedor de referencia en equipamiento de protección personal para ferreterías y distribuidores industriales en América Latina, reconocidos por la confiabilidad de nuestros productos, la agilidad de nuestra logística y el respaldo técnico que ofrecemos a cada cliente.'
            }
          ].map((b, i) => (
            <div
              key={b.t}
              className="ss-card ss-crop relative p-10 rounded-2xl"
              style={{ backgroundColor: SS.paper, border: `1px solid ${SS.mint}` }}
            >
              <CropCorners />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: SS.teal }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon} />
                  </svg>
                </div>
                <span className="ss-label" style={{ color: SS.teal }}>0{i + 1} / Propósito</span>
              </div>
              <h2 className="ss-display text-3xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>{b.t}</h2>
              <p className="text-gray-600 leading-relaxed">{b.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats — banda ink */}
      <section className="ss-grain relative overflow-hidden" style={{ backgroundColor: SS.ink }}>
        <div className="ss-grid absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: 'rgba(233,246,244,.1)' }}>
          {STATS.map((s) => (
            <div key={s.label} className="text-center px-4 py-6" style={{ backgroundColor: SS.ink }}>
              <div className="ss-display" style={{ color: SS.amber, fontSize: 'clamp(2.6rem,5vw,4rem)', fontWeight: 800 }}>{s.num}</div>
              <div className="ss-label mt-2" style={{ color: 'rgba(233,246,244,.6)', fontSize: '.62rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section style={{ backgroundColor: SS.paper, borderBottom: `1px solid ${SS.mint}` }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="text-center mb-14">
            <div className="flex justify-center"><Eyebrow>Lo que nos define</Eyebrow></div>
            <h2 className="ss-display text-gray-900 mt-3" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700 }}>
              Nuestros Valores
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="ss-card relative bg-white rounded-2xl p-8 overflow-hidden"
                style={{ border: `1px solid ${SS.mint}` }}
              >
                <span className="ss-label absolute top-5 right-5" style={{ color: '#cbd5d3', fontSize: '.62rem' }}>0{i + 1}</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: SS.mint, color: SS.teal }}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section style={{ backgroundColor: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="text-center mb-12">
            <div className="flex justify-center"><Eyebrow>Estándares que cumplimos</Eyebrow></div>
            <h2 className="ss-display text-gray-900 mt-3" style={{ fontSize: 'clamp(2rem,3.6vw,3rem)', fontWeight: 700 }}>Certificaciones</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTS.map((c) => (
              <div
                key={c.label}
                className="ss-card relative bg-white rounded-xl px-6 py-6 flex items-start gap-4 overflow-hidden"
                style={{ border: `1px solid ${SS.mint}` }}
              >
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: SS.amber }} />
                <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center mt-0.5" style={{ backgroundColor: SS.teal }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="ss-mono font-bold text-gray-900 text-sm">{c.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación + CTA */}
      <section className="ss-grain relative overflow-hidden text-white" style={{ backgroundColor: SS.ink }}>
        <div className="ss-grid absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow color={SS.amber}>Encuéntranos</Eyebrow>
            <h2 className="ss-display mt-3 mb-6" style={{ fontSize: 'clamp(2rem,3.6vw,3rem)', fontWeight: 700 }}>Nuestra Oficina</h2>
            <div className="space-y-4" style={{ color: 'rgba(233,246,244,.8)' }}>
              {[
                { d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', t: '8603 NW 54th Street, Doral FL 33166, USA' },
                { d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', t: 'contacto@aresafestep.com' },
                { d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', t: 'Lun – Vie: 9:00 AM – 6:00 PM EST' }
              ].map((row) => (
                <div key={row.t} className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: SS.amber }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={row.d} />
                  </svg>
                  <span>{row.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="md:text-right max-w-sm" style={{ color: 'rgba(233,246,244,.8)' }}>
              ¿Quieres conocer más sobre nuestros productos o necesitas una cotización para tu negocio?
            </p>
            <div className="flex gap-3 flex-wrap md:justify-end">
              <a href="/contacto" className="ss-btn ss-btn-amber inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold text-sm">
                Contáctanos
              </a>
              <a
                href="/catalog"
                className="ss-btn inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm border text-gray-200"
                style={{ borderColor: 'rgba(233,246,244,.3)' }}
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
