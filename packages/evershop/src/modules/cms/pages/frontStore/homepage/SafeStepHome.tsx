import React, { useState } from 'react';
import SafeStepDesign, {
  img,
  SS,
  Eyebrow,
  CropCorners
} from '../safestepShared/SafeStepDesign.js';

// ─── Hero boot image (estática, vista frontal) ───────────────────────────────

function HeroBootImage() {
  return (
    <div className="ss-rise ss-crop relative p-6" style={{ animationDelay: '180ms' }}>
      <CropCorners />
      <div
        className="absolute inset-8 rounded-full opacity-30"
        style={{ background: `radial-gradient(circle, ${SS.teal}, transparent 70%)` }}
      />
      <img
        src={img('/media/safestep/bota-frente.png', 760, 90)}
        alt="Bota de seguridad SafeStep — vista frontal"
        width={560}
        height={560}
        className="ss-scan relative z-10 object-contain mx-auto drop-shadow-2xl"
        style={{ maxHeight: '520px', height: 'auto' }}
      />
      <span
        className="ss-label absolute z-20 top-2 right-2 px-2 py-1 rounded"
        style={{ backgroundColor: SS.amber, color: SS.ink, fontSize: '.6rem' }}
      >
        200 J · S3
      </span>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="ss-grain relative overflow-hidden"
      style={{ backgroundColor: SS.ink }}
    >
      <div className="ss-grid absolute inset-0" />
      {/* halo teal */}
      <div
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(24,119,114,.35), transparent 70%)' }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <div className="ss-rise" style={{ animationDelay: '40ms' }}>
            <Eyebrow color={SS.amber}>EPP Certificado // Industrial</Eyebrow>
          </div>
          <h1
            className="ss-display ss-rise text-white mt-6 mb-6"
            style={{ animationDelay: '120ms', fontSize: 'clamp(2.8rem,6vw,5.4rem)', fontWeight: 700 }}
          >
            Todo lo que tu operación
            <span style={{ color: SS.teal300 }}> necesita para estar protegida</span>
          </h1>
          <p
            className="ss-rise text-base md:text-lg mb-8 max-w-lg leading-relaxed"
            style={{ animationDelay: '200ms', color: 'rgba(233,246,244,.72)' }}
          >
            Calzado de seguridad, guantes industriales, mangueras de alta
            presión, discos de corte y EPP certificado. Proveedor confiable para
            ferreterías, constructoras y distribuidores.
          </p>
          <div className="ss-rise flex flex-wrap gap-4" style={{ animationDelay: '280ms' }}>
            <a
              href="/catalog"
              className="ss-btn ss-btn-amber inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-bold text-sm"
            >
              Ver Catálogo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contacto"
              className="ss-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-sm border text-white"
              style={{ borderColor: 'rgba(233,246,244,.3)' }}
            >
              Cotizar Ahora
            </a>
          </div>
          {/* Spec readout */}
          <div
            className="ss-rise mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-md"
            style={{ animationDelay: '360ms', backgroundColor: 'rgba(233,246,244,.12)', border: '1px solid rgba(233,246,244,.12)' }}
          >
            {[
              { v: '10+', l: 'AÑOS EXP.' },
              { v: 'ISO', l: '20345:2011' },
              { v: 'NOM', l: '113-STPS' }
            ].map((s) => (
              <div key={s.l} className="px-5 py-4 text-center" style={{ backgroundColor: SS.ink }}>
                <div className="ss-display text-2xl md:text-3xl text-white" style={{ fontWeight: 700 }}>{s.v}</div>
                <div className="ss-label mt-1" style={{ color: SS.teal300, fontSize: '.6rem' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Boot image — estática, vista frontal */}
        <div className="order-1 md:order-2 relative flex justify-center">
          <HeroBootImage />
        </div>
      </div>
      <div className="ss-hazard h-2 w-full" />
    </section>
  );
}

// ─── Trust Strip ─────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'EPP Certificado',
    desc: 'Normas ISO y NOM-STPS'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: 'Catálogo Completo',
    desc: 'Guantes, botas, mangueras y más'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Herramientas Pro',
    desc: 'Discos de corte y abrasivos'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1h-3m3 0h2m-2-8h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
      </svg>
    ),
    title: 'Envíos Nacionales',
    desc: 'Entrega rápida a todo el país'
  }
];

function TrustStrip() {
  return (
    <section className="ss-grid-ink" style={{ backgroundColor: SS.paper, borderBottom: `1px solid ${SS.mint}` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4">
        {TRUST_ITEMS.map((item, i) => (
          <div
            key={item.title}
            className="flex items-start gap-4 px-2 md:px-6 py-3"
            style={{ borderLeft: i === 0 ? 'none' : `1px solid ${SS.mint}` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: SS.mint, color: SS.teal }}
            >
              {item.icon}
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">{item.title}</div>
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
  src,
  heading,
  subText,
  eyebrow,
  cta,
  ctaHref,
  flip = false
}: {
  src: string;
  heading: string;
  subText: string;
  eyebrow: string;
  cta: string;
  ctaHref: string;
  flip?: boolean;
}) {
  return (
    <section
      className="ss-grain relative overflow-hidden"
      style={{
        backgroundImage: `url(${img(src, 1600, 85)})`,
        backgroundSize: 'cover',
        backgroundPosition: flip ? 'center right' : 'center left',
        minHeight: '480px'
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(6,24,22,0.6)' }} />
      <div
        className="absolute inset-0"
        style={{
          background: flip
            ? 'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(8,32,30,0.72) 55%)'
            : 'linear-gradient(to right, rgba(8,32,30,0.72) 45%, rgba(0,0,0,0) 100%)'
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 flex items-center" style={{ minHeight: '480px' }}>
        <div className={`max-w-xl ${flip ? 'ml-auto text-right' : ''}`}>
          <div className={flip ? 'flex justify-end' : ''}>
            <Eyebrow color={SS.amber}>{eyebrow}</Eyebrow>
          </div>
          <h2 className="ss-display text-white leading-tight mt-4 mb-5" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700 }}>
            {heading}
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(233,246,244,.8)' }}>{subText}</p>
          <a
            href={ctaHref}
            className="ss-btn ss-btn-amber inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-bold text-sm"
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

// ─── Categories Grid ─────────────────────────────────────────────────────────

function CategoriesGrid() {
  return (
    <section style={{ backgroundColor: SS.paper }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <Eyebrow>Nuestro Catálogo</Eyebrow>
            <h2 className="ss-display text-gray-900 mt-3" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700 }}>
              Equipamiento completo para ferreterías e industria
            </h2>
          </div>
          <a href="/catalog" className="ss-label ss-link-underline pb-1" style={{ color: SS.teal }}>
            Ver todo →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Big card */}
          <a
            href="/catalog"
            className="ss-tile ss-crop md:row-span-2 group relative overflow-hidden rounded-xl"
            style={{ backgroundColor: SS.teal700, minHeight: '460px' }}
          >
            <CropCorners />
            <img
              src={img('/media/safestep/bota-hero.png', 560, 90)}
              alt="Botas punta de acero"
              className="ss-tile-img absolute inset-0 w-full h-full object-contain object-bottom opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="ss-label" style={{ color: SS.amber, fontSize: '.6rem' }}>Más vendido</span>
              <h3 className="ss-display text-2xl text-white mt-1" style={{ fontWeight: 700 }}>Botas con Punta de Acero</h3>
              <span className="ss-link-underline text-sm text-gray-200 mt-1 inline-block">Ver modelos →</span>
            </div>
          </a>
          {/* Suela */}
          <a
            href="/catalog"
            className="ss-tile group relative overflow-hidden rounded-xl"
            style={{ backgroundColor: SS.ink2, minHeight: '210px' }}
          >
            <img
              src={img('/media/safestep/suela.png', 420, 85)}
              alt="Suela anti-deslizante"
              className="ss-tile-img absolute inset-0 w-full h-full object-contain object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="font-bold text-white">Suela Anti-Deslizante</h3>
              <span className="ss-label text-gray-300" style={{ fontSize: '.58rem' }}>Certificada · Ver más →</span>
            </div>
          </a>
          {/* Cotización — acento ámbar */}
          <a
            href="/contacto"
            className="ss-tile group relative overflow-hidden rounded-xl"
            style={{ backgroundColor: SS.amber, minHeight: '210px' }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <span className="ss-label" style={{ color: SS.ink, fontSize: '.58rem' }}>Mayoreo</span>
              <h3 className="ss-display text-2xl mt-1 mb-2" style={{ color: SS.ink, fontWeight: 700 }}>Cotización Empresarial</h3>
              <p className="text-sm mb-3" style={{ color: 'rgba(8,32,30,.7)' }}>Precios especiales para pedidos al mayoreo.</p>
              <span className="ss-link-underline text-sm font-bold inline-block" style={{ color: SS.ink }}>Solicitar ahora →</span>
            </div>
          </a>
          {/* Guantes */}
          <a
            href="/catalog"
            className="ss-tile group relative overflow-hidden rounded-xl"
            style={{ backgroundColor: SS.ink, minHeight: '210px' }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h3 className="font-bold text-white mb-1">Guantes Industriales</h3>
              <p className="text-gray-400 text-xs mb-3">Corte · Calor · Químicos · Mecánicos</p>
              <span className="ss-label text-gray-400" style={{ fontSize: '.58rem' }}>Ver modelos →</span>
            </div>
          </a>
          {/* Discos */}
          <a
            href="/catalog"
            className="ss-tile group relative overflow-hidden rounded-xl"
            style={{ backgroundColor: SS.teal, minHeight: '210px' }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h3 className="font-bold text-white mb-1">Discos y Abrasivos</h3>
              <p className="text-xs mb-3" style={{ color: 'rgba(233,246,244,.75)' }}>Corte · Desbaste · Pulido · Lijado</p>
              <span className="ss-label" style={{ color: SS.teal300, fontSize: '.58rem' }}>Ver catálogo →</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Feature Split ────────────────────────────────────────────────────────────

function FeatureSplit() {
  const feats = [
    'Calzado de seguridad con punta de acero certificada 200 J',
    'Guantes industriales: corte, calor, químicos y mecánicos',
    'Mangueras de alta presión para aire, agua y fluidos',
    'Discos de corte, desbaste y abrasivos profesionales'
  ];
  return (
    <section style={{ backgroundColor: '#fff' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="ss-crop relative p-6" style={{ backgroundColor: SS.mint, borderRadius: '1rem' }}>
          <CropCorners />
          <img
            src={img('/media/safestep/bota-lateral.png', 620, 90)}
            alt="Bota SafeStep vista lateral"
            width={560}
            height={560}
            className="relative z-10 object-contain mx-auto drop-shadow-xl"
            style={{ maxHeight: '500px', height: 'auto' }}
          />
        </div>
        {/* Copy */}
        <div>
          <Eyebrow>Calidad en Cada Producto</Eyebrow>
          <h2 className="ss-display text-gray-900 mt-3 mb-6" style={{ fontSize: 'clamp(2rem,3.6vw,3rem)', fontWeight: 700 }}>
            Línea completa de equipos de protección personal
          </h2>
          <p className="text-gray-500 mb-5 leading-relaxed">
            Cumplimos con los más altos estándares de calidad para garantizar la
            seguridad de tus trabajadores. Desde la cabeza hasta los pies,
            tenemos el equipo que necesitas.
          </p>
          <ul className="space-y-3 mb-8">
            {feats.map((feat) => (
              <li key={feat} className="flex items-start gap-3 text-sm text-gray-700">
                <span
                  className="shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center"
                  style={{ backgroundColor: SS.amber }}
                >
                  <svg className="w-3.5 h-3.5" style={{ color: SS.ink }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {feat}
              </li>
            ))}
          </ul>
          <a
            href="/catalog"
            className="ss-btn ss-btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-sm"
          >
            Ver Catálogo Completo
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  { q: '¿Qué tipo de productos maneja SafeStep?', a: 'Somos proveedores de equipamiento de seguridad industrial completo: calzado con punta de acero, guantes industriales (corte, calor, químicos), mangueras de alta presión, discos de corte y abrasivos, y EPP en general para ferreterías, constructoras y empresas manufactureras.' },
  { q: '¿Qué normas de seguridad certifican sus productos?', a: 'Nuestros productos cumplen con las Normas Oficiales Mexicanas NOM-STPS y estándares internacionales como ISO 20345:2011 para calzado, EN 388 para guantes de protección mecánica, y las normas aplicables a cada categoría de producto.' },
  { q: '¿Ofrecen precios especiales para compras por volumen?', a: 'Sí, contamos con precios especiales para ferreterías, empresas y distribuidores. Contáctanos para recibir una cotización personalizada según tu volumen y frecuencia de compra.' },
  { q: '¿Cuáles son los métodos de pago?', a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia bancaria y PayPal.' },
  { q: '¿Realizan envíos a todo el país?', a: 'Sí, enviamos a toda la república y a varios países de América Latina. Los pedidos mayores a $75 USD tienen envío gratuito. El tiempo de entrega es de 3 a 5 días hábiles.' }
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ backgroundColor: SS.paper }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <div className="flex justify-center">
            <Eyebrow>Soporte</Eyebrow>
          </div>
          <h2 className="ss-display text-gray-900 mt-3" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700 }}>
            Preguntas Frecuentes
          </h2>
        </div>
        <div>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="ss-card mb-3 rounded-lg overflow-hidden"
                style={{ border: `1px solid ${isOpen ? SS.teal : SS.mint}`, backgroundColor: '#fff' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center gap-4 py-5 px-5 text-left"
                >
                  <span className="ss-label" style={{ color: isOpen ? SS.teal : '#9ca3af', fontSize: '.7rem' }}>
                    0{idx + 1}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm md:text-base flex-1">{item.q}</span>
                  <svg
                    className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                    style={{ color: isOpen ? SS.teal : '#9ca3af' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 pl-14 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function SafeStepHome() {
  return (
    <div className="ss safestep-home">
      <SafeStepDesign />
      <Hero />
      <TrustStrip />
      <IndustrialBanner
        src="/media/safestep/fondo-ferreteria-1.webp"
        eyebrow="Catálogo Completo"
        heading="Todo lo que tu ferretería necesita en un solo lugar"
        subText="Desde botas con punta de acero y guantes industriales, hasta mangueras de alta presión, discos de corte y abrasivos. El proveedor que tu negocio necesita."
        cta="Ver Catálogo"
        ctaHref="/catalog"
      />
      <CategoriesGrid />
      <FeatureSplit />
      <IndustrialBanner
        src="/media/safestep/fondo-ferreteria-2.webp"
        eyebrow="Cotización Empresarial"
        heading="Precios especiales para empresas y distribuidores"
        subText="Pedidos al mayoreo, entregas personalizadas y soporte técnico especializado. Contáctanos hoy y recibe tu cotización en 24 horas."
        cta="Solicitar Cotización"
        ctaHref="/contacto"
        flip
      />
      <FaqSection />
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
