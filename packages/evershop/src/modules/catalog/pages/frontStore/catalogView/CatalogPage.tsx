import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

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
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col">
      {/* Image */}
      <a
        href={product.url}
        className="block relative bg-gray-50 overflow-hidden"
        style={{ aspectRatio: '1 / 1' }}
      >
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            width={480}
            height={480}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <ProductNoThumbnail width={480} height={480} />
        )}
        {hasSpecial && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Oferta
          </span>
        )}
        {!product.inventory.isInStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Sin stock
            </span>
          </div>
        )}
      </a>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <a href={product.url} className="block mb-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-teal-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </a>
        <p className="text-xs text-gray-400 mb-4">SKU: {product.sku}</p>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            {hasSpecial ? (
              <>
                <span
                  className="text-xl font-bold block leading-none mb-0.5"
                  style={{ color: '#187772' }}
                >
                  {product.price.special!.text}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {product.price.regular.text}
                </span>
              </>
            ) : (
              <span
                className="text-xl font-bold"
                style={{ color: '#187772' }}
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
                  className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-40"
                  style={{ backgroundColor: '#187772', color: 'white' }}
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
        style={{ backgroundColor: '#e8f5f4' }}
      >
        <svg className="w-8 h-8" style={{ color: '#187772' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Pronto habrá productos disponibles
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Estamos preparando nuestro catálogo. Vuelve pronto o contáctanos para más información.
      </p>
      <a
        href="/page/contacto"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#187772' }}
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
  { label: 'Nombre A–Z', value: 'name_asc' },
];

export default function CatalogPage({ products }: CatalogPageProps) {
  const [sort, setSort] = useState('newest');

  const items = products?.items ?? [];
  const total = products?.total ?? 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-2">
            <a href="/" className="hover:text-gray-600 transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-gray-700">Catálogo</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Catálogo de Productos
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Calzado de seguridad industrial certificado para cada industria
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Toolbar */}
        {total > 0 && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">{total}</span>{' '}
              producto{total !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Ordenar:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#187772' } as React.CSSProperties}
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
          <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🛡️', title: 'Punta de Acero', desc: 'Certificada 200 J' },
              { icon: '🔩', title: 'Anti-Deslizante', desc: 'ISO 20345:2011' },
              { icon: '💧', title: 'Resistente al Agua', desc: 'Membrana hidrofugante' },
              { icon: '↩️', title: 'Garantía 6 meses', desc: 'Defectos de fabricación' },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{b.title}</p>
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
