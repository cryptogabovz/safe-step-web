import React, { useState } from 'react';

// Image helper — routes through EverShop's image optimizer
function img(src: string, w: number, q = 80): string {
  return `/images?src=${encodeURIComponent(src)}&w=${w}&q=${q}`;
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#187772' }}
          >
            Calzado de Seguridad Industrial
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Protección Certificada para Quienes
            <span style={{ color: '#187772' }}> Trabajan de Verdad</span>
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
            Punta de acero, suela anti-deslizante y resistencia al agua.
            Certificadas bajo NOM-113-STPS-2009 e ISO 20345:2011 para
            construcción, manufactura y minería.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/catalog"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#187772' }}
            >
              Ver Catálogo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: '#187772', color: '#187772' }}
            >
              Cotizar Ahora
            </a>
          </div>
          {/* Social proof */}
          <div className="mt-10 flex items-center gap-6 border-t border-gray-100 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10+</div>
              <div className="text-xs text-gray-400 mt-0.5">Años de experiencia</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">ISO</div>
              <div className="text-xs text-gray-400 mt-0.5">20345:2011</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">NOM</div>
              <div className="text-xs text-gray-400 mt-0.5">113-STPS-2009</div>
            </div>
          </div>
        </div>

        {/* Boot image */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
          <div
            className="absolute inset-0 rounded-3xl opacity-10"
            style={{ backgroundColor: '#187772', transform: 'scale(0.85) translateX(8%)' }}
          />
          <img
            src={img('/media/safestep/bota-hero.png', 700, 90)}
            alt="Bota de seguridad SafeStep"
            width={580}
            height={650}
            className="relative z-10 object-contain drop-shadow-2xl"
            style={{ maxHeight: '560px', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Trust Strip ─────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: '🛡️', title: 'Punta de Acero', desc: 'Impactos hasta 200 J' },
  { icon: '⚡', title: 'Anti-Estático', desc: 'Zonas de riesgo eléctrico' },
  { icon: '💧', title: 'Resistente al Agua', desc: 'Membrana hidrofugante' },
  { icon: '🔩', title: 'Anti-Deslizante', desc: 'Superficies húmedas y secas' },
];

function TrustStrip() {
  return (
    <section className="border-y border-gray-100 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <span className="text-3xl">{item.icon}</span>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Full-width Banner with overlay ──────────────────────────────────────────

function IndustrialBanner({
  src, heading, subText, eyebrow, cta, ctaHref, flip = false
}: {
  src: string; heading: string; subText: string;
  eyebrow: string; cta: string; ctaHref: string; flip?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${img(src, 1600, 85)})`,
        backgroundSize: 'cover',
        backgroundPosition: flip ? 'center right' : 'center left',
        minHeight: '480px',
      }}
    >
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: flip
            ? 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(10,30,30,0.82) 60%)'
            : 'linear-gradient(to right, rgba(10,30,30,0.82) 40%, rgba(0,0,0,0.15) 100%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 flex items-center" style={{ minHeight: '480px' }}>
        <div className={`max-w-xl ${flip ? 'ml-auto text-right' : ''}`}>
          <span className="text-xs font-semibold tracking-widest uppercase mb-3 block" style={{ color: '#4dd6cf' }}>
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
            {heading}
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">{subText}</p>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#187772' }}
          >
            {cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Feature Split ────────────────────────────────────────────────────────────

function FeatureSplit() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <div
            className="absolute -inset-4 rounded-3xl opacity-5"
            style={{ backgroundColor: '#187772' }}
          />
          <img
            src={img('/media/safestep/bota-lateral.png', 600, 90)}
            alt="Bota SafeStep vista lateral"
            width={560}
            height={630}
            className="relative z-10 object-contain mx-auto drop-shadow-xl"
            style={{ maxHeight: '520px', height: 'auto' }}
          />
        </div>
        {/* Copy */}
        <div>
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#187772' }}
          >
            Tecnología de Vanguardia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Diseñada para Resistir las Condiciones Más Extremas
          </h2>
          <p className="text-gray-500 mb-5 leading-relaxed">
            Cuero de alta resistencia, puntera de acero certificada, plantilla
            ergonómica y suela de hule compuesto anti-deslizante.
          </p>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Cada par pasa por pruebas rigurosas de impacto, compresión y
            resistencia a la perforación antes de salir de fábrica.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Cuero split genuino de alta resistencia',
              'Puntera de acero: protección 200 J',
              'Suela resistente a hidrocarburos y aceites',
              'Forro interior antibacterial y transpirable',
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#187772' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feat}
              </li>
            ))}
          </ul>
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#187772' }}
          >
            Ver Todos los Modelos
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Categories Grid ─────────────────────────────────────────────────────────

function CategoriesGrid() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#187772' }}>
            Nuestros Productos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Soluciones para Cada Industria
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Big card */}
          <a
            href="/catalog"
            className="md:row-span-2 group relative overflow-hidden rounded-2xl"
            style={{ backgroundColor: '#187772', minHeight: '440px' }}
          >
            <img
              src={img('/media/safestep/bota-hero.png', 500, 90)}
              alt="Botas punta de acero"
              className="absolute inset-0 w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-xs text-teal-300 font-semibold tracking-widest uppercase">Más vendido</span>
              <h3 className="text-xl font-bold text-white mt-1">Botas con Punta de Acero</h3>
              <span className="text-sm text-gray-300 mt-1 block">Ver modelos →</span>
            </div>
          </a>
          {/* Small cards */}
          <a
            href="/catalog"
            className="group relative overflow-hidden rounded-2xl"
            style={{ backgroundColor: '#374151', minHeight: '200px' }}
          >
            <img
              src={img('/media/safestep/suela.png', 400, 85)}
              alt="Suela anti-deslizante"
              className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="text-base font-bold text-white">Suela Anti-Deslizante</h3>
              <span className="text-xs text-gray-300">Certificada · Ver más →</span>
            </div>
          </a>
          <a
            href="/"
            className="group relative overflow-hidden rounded-2xl bg-red-600"
            style={{ minHeight: '200px' }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h3 className="text-lg font-bold text-white mb-2">Cotización Empresarial</h3>
              <p className="text-red-100 text-sm mb-4">Precios especiales para pedidos al mayoreo.</p>
              <span className="text-sm font-semibold text-white inline-flex items-center gap-1">
                Solicitar ahora →
              </span>
            </div>
          </a>
          <a
            href="/"
            className="group relative overflow-hidden rounded-2xl"
            style={{ backgroundColor: '#1f2937', minHeight: '200px' }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h3 className="text-base font-bold text-white mb-1">Certificaciones</h3>
              <p className="text-gray-400 text-xs mb-3">NOM-113-STPS · ISO 20345:2011</p>
              <span className="text-xs text-gray-400">Ver normas →</span>
            </div>
          </a>
          <a
            href="/"
            className="group relative overflow-hidden rounded-2xl bg-teal-50"
            style={{ minHeight: '200px' }}
          >
            <img
              src={img('/media/safestep/caja-envio.png', 300, 85)}
              alt="Envíos SafeStep"
              className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="text-base font-bold text-white">Envíos Nacionales</h3>
              <span className="text-xs text-teal-100">3–5 días hábiles · Más info →</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  { q: '¿Qué normas certifican el calzado SafeStep?', a: 'Nuestro calzado cumple con la Norma Oficial Mexicana NOM-113-STPS-2009 y la norma internacional ISO 20345:2011, garantizando la máxima protección en entornos industriales.' },
  { q: '¿Ofrecen descuentos para compras por volumen?', a: 'Sí, contamos con precios especiales para empresas y distribuidores. Contáctanos para recibir una cotización personalizada según tu volumen de compra.' },
  { q: '¿Cuánto tiempo dura el calzado SafeStep?', a: 'Con el uso adecuado, nuestras botas tienen una vida útil de 12 a 18 meses. Ofrecemos garantía de 6 meses por defectos de fabricación.' },
  { q: '¿Cuáles son los métodos de pago?', a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia bancaria y PayPal.' },
  { q: '¿Realizan envíos internacionales?', a: 'Sí, enviamos a todo el país y a varios países de América Latina. Los pedidos mayores a $75 USD tienen envío gratuito.' },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#187772' }}>
            Soporte
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Preguntas Frecuentes
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx}>
              <button
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between py-5 text-left gap-6"
              >
                <span className="font-medium text-gray-900 text-sm md:text-base">{item.q}</span>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform ${open === idx ? 'rotate-180' : ''}`}
                  style={{ color: '#187772' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === idx && (
                <p className="pb-5 text-sm text-gray-500 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function SafeStepHome() {
  return (
    <div className="safestep-home">
      <Hero />
      <TrustStrip />
      <IndustrialBanner
        src="/media/safestep/fondo-ferreteria-1.webp"
        eyebrow="Para cada industria"
        heading="Calzado que Aguanta donde Otros Fallan"
        subText="Desde la obra hasta la planta, nuestras botas están diseñadas para las condiciones más exigentes del trabajo industrial."
        cta="Ver Catálogo"
        ctaHref="/catalog"
      />
      <CategoriesGrid />
      <FeatureSplit />
      <IndustrialBanner
        src="/media/safestep/fondo-ferreteria-2.webp"
        eyebrow="Cotización Empresarial"
        heading="Precios Especiales para Empresas y Distribuidores"
        subText="Pedidos al mayoreo, entregas personalizadas y soporte técnico especializado. Contáctanos hoy y recibe tu cotización en 24 horas."
        cta="Solicitar Cotización"
        ctaHref="/"
        flip
      />
      <FaqSection />
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1,
};
