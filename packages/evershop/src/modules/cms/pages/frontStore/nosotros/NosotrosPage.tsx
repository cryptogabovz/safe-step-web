import React from 'react';

function img(src: string, w: number, q = 80): string {
  return `/images?src=${encodeURIComponent(src)}&w=${w}&q=${q}`;
}

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
  },
];

const CERTS = [
  { label: 'NOM-113-STPS-2009', desc: 'Calzado de protección' },
  { label: 'ISO 20345:2011', desc: 'Calzado de seguridad' },
  { label: 'EN 388', desc: 'Guantes de protección mecánica' },
  { label: 'ANSI/ISEA 105', desc: 'Guantes industriales' },
];

export default function NosotrosPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900">
        <img
          src={img('/media/safestep/fondo-ferreteria-1.webp', 1600, 80)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#4dd6cf' }}>
            Quiénes Somos
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Más de una Década Protegiendo a Quienes Trabajan
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            SafeStep Corp es un proveedor especializado en equipamiento de seguridad industrial.
            Desde Doral, Florida, suministramos calzado de seguridad, guantes, mangueras, discos de
            corte y EPP certificado a ferreterías, constructoras y distribuidores en todo el continente.
          </p>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-2xl p-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: '#e8f5f4' }}
            >
              <svg className="w-6 h-6" style={{ color: '#187772' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misión</h2>
            <p className="text-gray-600 leading-relaxed">
              Proveer equipamiento de seguridad industrial de alta calidad que proteja
              la integridad de los trabajadores, respaldado por certificaciones internacionales,
              un servicio ágil y precios competitivos que fortalezcan la cadena de suministro
              de nuestros clientes.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: '#e8f5f4' }}
            >
              <svg className="w-6 h-6" style={{ color: '#187772' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visión</h2>
            <p className="text-gray-600 leading-relaxed">
              Ser el proveedor de referencia en equipamiento de protección personal para
              ferreterías y distribuidores industriales en América Latina, reconocidos por
              la confiabilidad de nuestros productos, la agilidad de nuestra logística y
              el respaldo técnico que ofrecemos a cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#187772' }}>
              Lo que nos define
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#e8f5f4', color: '#187772' }}
                >
                  {v.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '10+', label: 'Años de experiencia' },
            { num: '500+', label: 'Clientes activos' },
            { num: '15+', label: 'Países atendidos' },
            { num: '98%', label: 'Satisfacción de clientes' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#187772' }}>{s.num}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#187772' }}>
              Estándares que cumplimos
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Certificaciones</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTS.map((c) => (
              <div key={c.label} className="bg-white border border-gray-100 rounded-xl px-6 py-5 flex items-start gap-4">
                <div
                  className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: '#187772' }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{c.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación + CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#4dd6cf' }}>
              Encuéntranos
            </span>
            <h2 className="text-3xl font-bold mb-6">Nuestra Oficina</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#4dd6cf' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>8603 NW 54th Street, Doral FL 33166, USA</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#4dd6cf' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contacto@aresafestep.com</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#4dd6cf' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Lun – Vie: 9:00 AM – 6:00 PM EST</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="text-gray-300 md:text-right max-w-sm">
              ¿Quieres conocer más sobre nuestros productos o necesitas una cotización para tu negocio?
            </p>
            <div className="flex gap-3 flex-wrap md:justify-end">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#187772' }}
              >
                Contáctanos
              </a>
              <a
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-gray-600 text-gray-200 hover:border-gray-400 transition-colors"
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
  sortOrder: 10,
};
