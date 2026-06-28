import React from 'react';

/**
 * SafeStep — Sistema de diseño compartido (home / nosotros / contacto).
 *
 * Dirección estética: "industrial spec-sheet / editorial".
 *  - Display condensado (Saira Condensed) + cuerpo Archivo + mono técnico (Space Mono).
 *  - Marca teal #187772 dominante, acento alta-visibilidad ámbar #FFB627.
 *  - Texturas: rejilla blueprint, grano sutil, franja hazard, marcas de recorte.
 *  - Movimiento: reveals escalonados al cargar, hover con elevación. Respeta reduced-motion.
 *
 * Cada página es una ruta independiente (MPA) → solo un <SafeStepDesign/> se
 * renderiza por respuesta, sin duplicar <style>/<link>.
 *
 * Esta carpeta no es 'all' ni un route.id, por lo que el scanner de componentes
 * (scanForComponents) no la registra: es solo un módulo importable.
 */

// Helper de imágenes — pasa por el optimizador de EverShop.
export function img(src: string, w: number, q = 80): string {
  return `/images?src=${encodeURIComponent(src)}&w=${w}&q=${q}`;
}

// Tokens de marca reutilizables en estilos inline.
export const SS = {
  ink: '#08201E',
  ink2: '#0E2E2B',
  teal: '#187772',
  teal700: '#115E5A',
  teal300: '#4DD6CF',
  mint: '#E9F6F4',
  amber: '#FFB627',
  amberDeep: '#F59E0B',
  paper: '#FAFBFB',
} as const;

// Badges de confianza de la TIENDA (no específicos de calzado) — reutilizados
// en catálogo y página de producto. SafeStep es distribuidor de ferretería/EPP.
// Iconos SVG (sin emojis).
const iconLock = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const iconCard = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const iconTruck = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1h-3m3 0h2m-2-8h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
  </svg>
);
const iconReturn = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export const STORE_TRUST = [
  { icon: iconLock, title: 'Compra Segura', desc: 'Sitio cifrado con certificado SSL' },
  { icon: iconCard, title: 'Pagos Protegidos', desc: 'Tarjeta, transferencia y PayPal' },
  { icon: iconTruck, title: 'Envíos a Todo el País', desc: 'Entrega en 3–7 días hábiles' },
  { icon: iconReturn, title: 'Devoluciones y Soporte', desc: 'Atención posventa garantizada' }
];

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Saira+Condensed:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap';

const CSS = `
.ss{
  --ss-ink:#08201E; --ss-ink-2:#0E2E2B; --ss-teal:#187772; --ss-teal-700:#115E5A;
  --ss-teal-300:#4DD6CF; --ss-mint:#E9F6F4; --ss-amber:#FFB627; --ss-amber-deep:#F59E0B;
  --ss-paper:#FAFBFB; --ss-line:rgba(8,32,30,.10);
  --ss-display:'Saira Condensed','Arial Narrow',sans-serif;
  --ss-body:'Archivo',system-ui,-apple-system,sans-serif;
  --ss-mono:'Space Mono',ui-monospace,SFMono-Regular,monospace;
  font-family:var(--ss-body); color:var(--ss-ink);
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
}
.ss ::selection{ background:var(--ss-amber); color:var(--ss-ink); }
.ss-display{ font-family:var(--ss-display)!important; letter-spacing:-.005em; line-height:.96; }
.ss-mono{ font-family:var(--ss-mono)!important; }
.ss-label{ font-family:var(--ss-mono)!important; font-size:.7rem; letter-spacing:.22em; text-transform:uppercase; }

/* Texturas / atmósfera --------------------------------------------------- */
.ss-grid{ background-image:
  linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),
  linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);
  background-size:48px 48px; }
.ss-grid-ink{ background-image:
  linear-gradient(rgba(8,32,30,.05) 1px,transparent 1px),
  linear-gradient(90deg,rgba(8,32,30,.05) 1px,transparent 1px);
  background-size:48px 48px; }
.ss-grain{ position:relative; }
.ss-grain::after{ content:""; position:absolute; inset:0; pointer-events:none; opacity:.07;
  mix-blend-mode:overlay; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
.ss-hazard{ background:repeating-linear-gradient(45deg,var(--ss-amber) 0 14px,#0a201e 14px 28px); }

/* Eyebrow con tick ámbar -------------------------------------------------- */
.ss-eyebrow{ display:inline-flex; align-items:center; gap:.55rem; }
.ss-eyebrow::before{ content:""; width:18px; height:3px; background:var(--ss-amber); display:inline-block; }

/* Marcas de recorte (esquinas técnicas) ---------------------------------- */
.ss-crop{ position:relative; }
.ss-crop > .ss-c{ position:absolute; width:18px; height:18px; border-color:var(--ss-amber); border-style:solid; border-width:0; }
.ss-crop > .ss-tl{ top:0; left:0; border-top-width:2px; border-left-width:2px; }
.ss-crop > .ss-tr{ top:0; right:0; border-top-width:2px; border-right-width:2px; }
.ss-crop > .ss-bl{ bottom:0; left:0; border-bottom-width:2px; border-left-width:2px; }
.ss-crop > .ss-br{ bottom:0; right:0; border-bottom-width:2px; border-right-width:2px; }

/* Tarjetas ---------------------------------------------------------------- */
.ss-card{ transition:transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s, border-color .4s, background-color .4s; }
.ss-card:hover{ transform:translateY(-5px); box-shadow:0 22px 48px -22px rgba(8,32,30,.55); }
.ss-tile{ transition:transform .55s cubic-bezier(.16,1,.3,1); }
.ss-tile-img{ transition:transform .6s cubic-bezier(.16,1,.3,1), opacity .4s; }
.ss-tile:hover .ss-tile-img{ transform:scale(1.06); }
.ss-link-underline{ background-image:linear-gradient(var(--ss-amber),var(--ss-amber)); background-size:0% 2px;
  background-position:0 100%; background-repeat:no-repeat; transition:background-size .35s ease; }
.ss-tile:hover .ss-link-underline,.ss-link-underline:hover{ background-size:100% 2px; }

/* Botones ----------------------------------------------------------------- */
.ss-btn{ transition:transform .25s ease, box-shadow .25s ease, opacity .25s ease; }
.ss-btn:hover{ transform:translateY(-2px); }
.ss-btn-primary{ background:var(--ss-teal); color:#fff; box-shadow:0 10px 24px -12px rgba(24,119,114,.8); }
.ss-btn-primary:hover{ box-shadow:0 16px 32px -12px rgba(24,119,114,.9); }
.ss-btn-amber{ background:var(--ss-amber); color:var(--ss-ink); box-shadow:0 10px 24px -12px rgba(245,158,11,.8); }

/* Formulario -------------------------------------------------------------- */
.ss-input{ font-family:var(--ss-body); transition:border-color .2s, box-shadow .2s, background-color .2s; }
.ss-input:focus{ outline:none; border-color:var(--ss-teal)!important; box-shadow:0 0 0 3px rgba(24,119,114,.18); background:#fff; }

/* Movimiento -------------------------------------------------------------- */
.ss-rise{ opacity:0; animation:ss-rise .8s cubic-bezier(.16,1,.3,1) forwards; }
@keyframes ss-rise{ from{ opacity:0; transform:translateY(20px); } to{ opacity:1; transform:none; } }
.ss-scan{ animation:ss-scan 4.5s ease-in-out infinite; }
@keyframes ss-scan{ 0%,100%{ transform:translateY(-6px); } 50%{ transform:translateY(6px); } }

@media (prefers-reduced-motion: reduce){
  .ss-rise{ opacity:1!important; animation:none!important; }
  .ss-scan{ animation:none!important; }
  .ss-card:hover,.ss-btn:hover{ transform:none!important; }
  .ss-tile:hover .ss-tile-img{ transform:none!important; }
}
`;

/** Inyecta fuentes + estilos del sistema. Renderizar una vez por página, dentro del root `.ss`. */
export default function SafeStepDesign(): React.ReactElement {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_HREF} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
    </>
  );
}

/** Esquinas de recorte técnicas para enmarcar imágenes/paneles. */
export function CropCorners(): React.ReactElement {
  return (
    <>
      <span className="ss-c ss-tl" />
      <span className="ss-c ss-tr" />
      <span className="ss-c ss-bl" />
      <span className="ss-c ss-br" />
    </>
  );
}

/** Eyebrow mono con tick ámbar. */
export function Eyebrow({
  children,
  color = SS.teal,
  className = ''
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}): React.ReactElement {
  return (
    <span className={`ss-eyebrow ss-label ${className}`} style={{ color }}>
      {children}
    </span>
  );
}
