import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SafeStepDesign, {
  img,
  SS,
  Eyebrow,
  STORE_TRUST
} from '../../../../cms/pages/frontStore/safestepShared/SafeStepDesign.js';

interface Price {
  value: number;
  text: string;
}

interface Product {
  productId: number;
  name: string;
  sku: string;
  url: string;
  price: { regular: Price; special: Price | null };
  inventory: { isInStock: boolean };
  image: { alt: string; url: string } | null;
}

interface CatalogPageProps {
  products: {
    items: Product[];
    total: number;
  };
}

function ProductCard({ product }: { product: Product }) {
  const hasSpecial =
    product.price.special != null &&
    product.price.special.value < product.price.regular.value;

  return (
    <div
      className="ss-card group bg-white rounded-xl overflow-hidden flex flex-col"
      style={{ border: `1px solid ${SS.mint}` }}
    >
      {/* Image */}
      <a
        href={product.url}
        className="ss-tile block relative overflow-hidden"
        style={{ aspectRatio: '1 / 1', backgroundColor: SS.mint }}
      >
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            width={480}
            height={480}
            className="ss-tile-img w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <ProductNoThumbnail width={480} height={480} />
        )}
        {hasSpecial && (
          <span
            className="ss-label absolute top-3 left-3 px-2.5 py-1 rounded"
            style={{ backgroundColor: SS.amber, color: SS.ink, fontSize: '.58rem' }}
          >
            Oferta
          </span>
        )}
        {!product.inventory.isInStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span
              className="ss-label px-3 py-1.5 rounded text-white"
              style={{ backgroundColor: SS.ink, fontSize: '.58rem' }}
            >
              Sin stock
            </span>
          </div>
        )}
      </a>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <a href={product.url} className="block mb-1">
          <h3
            className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 transition-colors"
            style={{ minHeight: '2.5em' }}
          >
            {product.name}
          </h3>
        </a>
        <p className="ss-label mb-4" style={{ color: '#9ca3af', fontSize: '.58rem' }}>
          SKU · {product.sku}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            {hasSpecial ? (
              <>
                <span
                  className="ss-display block leading-none mb-0.5"
                  style={{ color: SS.teal, fontSize: '1.6rem', fontWeight: 700 }}
                >
                  {product.price.special!.text}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {product.price.regular.text}
                </span>
              </>
            ) : (
              <span
                className="ss-display"
                style={{ color: SS.teal, fontSize: '1.6rem', fontWeight: 700 }}
              >
                {product.price.regular.text}
              </span>
            )}
          </div>

          {product.inventory.isInStock && (
            <AddToCart
              product={{ sku: product.sku, isInStock: product.inventory.isInStock }}
              qty={1}
              onError={(err) => toast.error(err)}
            >
              {(state, actions) => (
                <button
                  disabled={!state.canAddToCart || state.isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    actions.addToCart();
                  }}
                  className="ss-btn opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-md flex items-center justify-center shrink-0 disabled:opacity-40"
                  style={{ backgroundColor: SS.amber, color: SS.ink }}
                  aria-label="Agregar al carrito"
                >
                  {state.isLoading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                </button>
              )}
            </AddToCart>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ backgroundColor: SS.mint }}
      >
        <svg className="w-8 h-8" style={{ color: SS.teal }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="ss-display text-2xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>
        Pronto habrá productos disponibles
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Estamos preparando nuestro catálogo. Vuelve pronto o contáctanos para más información.
      </p>
      <a
        href="/contacto"
        className="ss-btn ss-btn-primary mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold"
      >
        Contactar
      </a>
    </div>
  );
}

const SORT_OPTIONS = [
  { label: 'Más recientes', value: 'newest' },
  { label: 'Precio: menor a mayor', value: 'price_asc' },
  { label: 'Precio: mayor a menor', value: 'price_desc' },
  { label: 'Nombre A–Z', value: 'name_asc' }
];

export default function CatalogPage({ products }: CatalogPageProps) {
  const [sort, setSort] = useState('newest');

  const items = products?.items ?? [];
  const total = products?.total ?? 0;

  return (
    <div className="ss" style={{ backgroundColor: SS.paper }}>
      <SafeStepDesign />

      {/* Header */}
      <div className="ss-grain relative overflow-hidden" style={{ backgroundColor: SS.ink }}>
        <img
          src={img('/media/safestep/fondo-ferreteria-2.webp', 1600, 75)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18 }}
        />
        <div className="ss-grid absolute inset-0" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(24,119,114,0.45) 0%, rgba(6,24,22,0.78) 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="ss-rise" style={{ animationDelay: '40ms' }}>
            <Eyebrow color={SS.amber}>Nuestro Catálogo</Eyebrow>
          </div>
          <h1
            className="ss-display ss-rise text-white mt-6 mb-3"
            style={{ animationDelay: '120ms', fontSize: 'clamp(2.4rem,5vw,4.4rem)', fontWeight: 700 }}
          >
            Catálogo de Productos
          </h1>
          <p className="ss-rise max-w-xl leading-relaxed text-base" style={{ animationDelay: '200ms', color: 'rgba(233,246,244,.78)' }}>
            Equipamiento de seguridad industrial certificado: calzado, guantes,
            mangueras, discos y EPP para cada industria.
          </p>
        </div>
        <div className="ss-hazard h-2 w-full" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {/* Toolbar */}
        {total > 0 && (
          <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: `1px solid ${SS.mint}` }}>
            <p className="ss-label" style={{ color: SS.teal, fontSize: '.66rem' }}>
              {total} producto{total !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <label className="ss-label" style={{ color: '#9ca3af', fontSize: '.6rem' }}>Ordenar</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ss-input text-sm rounded-md px-3 py-1.5 bg-white text-gray-700"
                style={{ border: `1px solid ${SS.mint}` }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.length > 0 ? (
            items.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Trust strip */}
        {total > 0 && (
          <div className="mt-20 pt-10 grid grid-cols-2 md:grid-cols-4" style={{ borderTop: `1px solid ${SS.mint}` }}>
            {STORE_TRUST.map((b, i) => (
              <div
                key={b.title}
                className="flex items-start gap-4 px-2 md:px-6 py-3"
                style={{ borderLeft: i === 0 ? 'none' : `1px solid ${SS.mint}` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: SS.mint, color: SS.teal }}
                >
                  {b.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{b.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    products(filters: [{ key: "status", operation: eq, value: "1" }]) {
      items {
        productId
        name
        sku
        url
        price {
          regular { value text }
          special { value text }
        }
        inventory { isInStock }
        image { alt url }
      }
      total
    }
  }
`;
