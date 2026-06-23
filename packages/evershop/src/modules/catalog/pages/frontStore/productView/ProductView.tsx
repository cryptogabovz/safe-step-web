import Area from '@components/common/Area.js';
import { Media } from '@components/frontStore/catalog/Media.js';
import {
  ProductData,
  ProductProvider
} from '@components/frontStore/catalog/ProductContext.js';
import { ProductSingleAttributes } from '@components/frontStore/catalog/ProductSingleAttributes.js';
import { ProductSingleDescription } from '@components/frontStore/catalog/ProductSingleDescription.js';
import { ProductSingleForm } from '@components/frontStore/catalog/ProductSingleForm.js';
import React from 'react';

const TRUST_BADGES = [
  { icon: '🛡️', label: 'Punta de Acero', sub: 'Certificada 200 J' },
  { icon: '💧', label: 'Resistente al Agua', sub: 'Membrana hidrofugante' },
  { icon: '🔩', label: 'Anti-Deslizante', sub: 'ISO 20345:2011' },
  { icon: '↩️', label: 'Garantía 6 meses', sub: 'Defectos de fabricación' },
];

export default function ProductView({ product }: ProductData) {
  return (
    <ProductProvider product={product}>
      <Area id="productPageTop" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-gray-600 transition-colors">Inicio</a>
          <span>/</span>
          <a href="/catalog" className="hover:text-gray-600 transition-colors">Catálogo</a>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        {/* Product hero: media + form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: image gallery */}
          <div className="sticky top-24">
            <Area
              id="productPageMiddleLeft"
              className="product__detail__left"
              coreComponents={[
                {
                  component: { default: <Media /> },
                  sortOrder: 0,
                  id: 'media'
                }
              ]}
            />
          </div>

          {/* Right: product info */}
          <div>
            {/* SKU */}
            <p className="text-xs text-gray-400 font-mono mb-2 tracking-wider">
              SKU: {product.sku}
            </p>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            {/* Stock badge */}
            <div className="flex items-center gap-2 mb-5">
              {product.inventory.isInStock ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  En stock · Envío en 3–5 días hábiles
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Sin stock
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-6" />

            {/* Price + form (variant selector, qty, add-to-cart) */}
            <Area
              id="productPageMiddleRight"
              className="product__detail__right"
              coreComponents={[
                {
                  component: {
                    default: (
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-gray-900">
                          {product.price.special && product.price.special.value < product.price.regular.value ? (
                            <div className="flex items-baseline gap-3">
                              <span style={{ color: '#187772' }}>{product.price.special.text}</span>
                              <span className="text-base font-normal text-gray-400 line-through">{product.price.regular.text}</span>
                            </div>
                          ) : (
                            <span style={{ color: '#187772' }}>{product.price.regular.text}</span>
                          )}
                        </div>
                      </div>
                    )
                  },
                  sortOrder: 5,
                  id: 'customPrice'
                },
                {
                  component: { default: <ProductSingleAttributes /> },
                  sortOrder: 15,
                  id: 'attributes'
                },
                {
                  component: { default: <ProductSingleForm /> },
                  sortOrder: 20,
                  id: 'productForm'
                }
              ]}
            />

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex items-start gap-2.5">
                  <span className="text-xl mt-0.5">{b.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{b.label}</p>
                    <p className="text-xs text-gray-400">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping note */}
            <div className="mt-6 rounded-xl bg-gray-50 border border-gray-100 p-4 flex gap-3 items-start">
              <svg className="w-5 h-5 mt-0.5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-gray-700">Envío gratis en pedidos +$75 USD</p>
                <p className="text-xs text-gray-400 mt-0.5">Entrega en 3–7 días hábiles. Cobertura nacional.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description tabs */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Descripción del Producto</h2>
          <div className="prose prose-sm max-w-none text-gray-600">
            <Area
              id="productSingleDescription"
              coreComponents={[
                {
                  component: { default: <ProductSingleDescription /> },
                  sortOrder: 10,
                  id: 'productSingleDescription'
                }
              ]}
            />
          </div>
        </div>

        {/* Certifications strip */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-10"
          style={{ backgroundColor: '#187772' }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 text-center"
            style={{ color: '#4dd6cf' }}
          >
            Certificaciones
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
            Calzado que Cumple los Estándares Más Exigentes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'NOM-113-STPS', desc: 'Norma Oficial Mexicana' },
              { label: 'ISO 20345:2011', desc: 'Estándar internacional' },
              { label: 'Punta Acero', desc: 'Impacto hasta 200 J' },
              { label: 'Garantía 6m', desc: 'Defectos de fábrica' },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <div className="text-lg font-bold text-white">{c.label}</div>
                <div className="text-xs mt-1" style={{ color: '#a7e8e5' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Area id="productPageBottom" />
    </ProductProvider>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
query Query {
  product: currentProduct {
    name
    description
    sku
    price {
      regular { value text }
      special { value text }
    }
    inventory { isInStock }
    attributes: attributeIndex {
      attributeName
      attributeCode
      optionText
    }
    image { alt url }
    gallery { alt url }
    variantGroup {
      variantAttributes {
        attributeId
        attributeCode
        attributeName
        options { optionId optionText productId }
      }
      items {
        attributes { attributeCode optionId }
      }
    }
  }
}`;
