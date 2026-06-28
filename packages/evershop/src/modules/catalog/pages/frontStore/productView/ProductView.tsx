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
import SafeStepDesign, {
  SS,
  Eyebrow,
  CropCorners
} from '../../../../cms/pages/frontStore/safestepShared/SafeStepDesign.js';

const TRUST_BADGES = [
  { icon: '🛡️', label: 'Punta de Acero', sub: 'Certificada 200 J' },
  { icon: '💧', label: 'Resistente al Agua', sub: 'Membrana hidrofugante' },
  { icon: '🔩', label: 'Anti-Deslizante', sub: 'ISO 20345:2011' },
  { icon: '↩️', label: 'Garantía 6 meses', sub: 'Defectos de fabricación' }
];

const CERTS = [
  { label: 'NOM-113-STPS', desc: 'Norma Oficial Mexicana' },
  { label: 'ISO 20345:2011', desc: 'Estándar internacional' },
  { label: 'Punta Acero', desc: 'Impacto hasta 200 J' },
  { label: 'Garantía 6m', desc: 'Defectos de fábrica' }
];

export default function ProductView({ product }: ProductData) {
  const simpleDescription =
    typeof product.shortDescription === 'string'
      ? product.shortDescription.trim()
      : '';

  return (
    <ProductProvider product={product}>
      <div className="ss" style={{ backgroundColor: SS.paper }}>
        <SafeStepDesign />
        <Area id="productPageTop" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">

          {/* Breadcrumb */}
          <nav className="ss-label mb-8 flex items-center gap-2" style={{ color: '#9ca3af', fontSize: '.62rem' }}>
            <a href="/" className="transition-colors hover:opacity-70">Inicio</a>
            <span style={{ color: SS.amber }}>/</span>
            <a href="/catalog" className="transition-colors hover:opacity-70">Catálogo</a>
            <span style={{ color: SS.amber }}>/</span>
            <span style={{ color: SS.teal }}>{product.name}</span>
          </nav>

          {/* Product hero: media + form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: image gallery — marco técnico */}
            <div className="md:sticky md:top-24">
              <div className="ss-crop relative p-5 rounded-2xl" style={{ backgroundColor: '#fff', border: `1px solid ${SS.mint}` }}>
                <CropCorners />
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
            </div>

            {/* Right: product info */}
            <div>
              {/* SKU */}
              <div className="mb-3">
                <Eyebrow color={SS.teal}>SKU · {product.sku}</Eyebrow>
              </div>

              {/* Name */}
              <h1 className="ss-display text-gray-900 mb-4" style={{ fontSize: 'clamp(1.9rem,3.4vw,2.8rem)', fontWeight: 700 }}>
                {product.name}
              </h1>

              {/* Stock badge */}
              <div className="flex items-center gap-2 mb-5">
                {product.inventory.isInStock ? (
                  <span
                    className="ss-label inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md"
                    style={{ color: SS.teal, backgroundColor: SS.mint, fontSize: '.6rem' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SS.teal }} />
                    En stock · Envío en 3–5 días hábiles
                  </span>
                ) : (
                  <span className="ss-label inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-red-600 bg-red-50" style={{ fontSize: '.6rem' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Sin stock
                  </span>
                )}
              </div>

              {/* Hazard divider */}
              <div className="ss-hazard h-1 w-24 rounded-full mb-6" />

              {/* Price + form (variant selector, qty, add-to-cart) */}
              <Area
                id="productPageMiddleRight"
                className="product__detail__right"
                coreComponents={[
                  {
                    component: {
                      default: (
                        <div className="mb-4">
                          <div className="ss-display" style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1 }}>
                            {product.price.special && product.price.special.value < product.price.regular.value ? (
                              <div className="flex items-baseline gap-3">
                                <span style={{ color: SS.teal }}>{product.price.special.text}</span>
                                <span className="text-base font-normal text-gray-400 line-through" style={{ fontFamily: 'var(--ss-body)' }}>{product.price.regular.text}</span>
                              </div>
                            ) : (
                              <span style={{ color: SS.teal }}>{product.price.regular.text}</span>
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
              <div className="mt-8 pt-6 grid grid-cols-2 gap-3" style={{ borderTop: `1px solid ${SS.mint}` }}>
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="flex items-start gap-2.5">
                    <span className="text-xl mt-0.5">{b.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{b.label}</p>
                      <p className="text-xs text-gray-400">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping note */}
              <div className="mt-6 rounded-xl p-4 flex gap-3 items-start" style={{ backgroundColor: SS.mint }}>
                <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: SS.teal }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-gray-800">Envío gratis en pedidos +$75 USD</p>
                  <p className="text-xs text-gray-500 mt-0.5">Entrega en 3–7 días hábiles. Cobertura nacional.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción del producto */}
          <div className="mt-20 pt-10" style={{ borderTop: `1px solid ${SS.mint}` }}>
            <Eyebrow color={SS.teal}>Especificaciones</Eyebrow>
            <h2 className="ss-display text-gray-900 mt-3 mb-6" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700 }}>
              Descripción del Producto
            </h2>
            {simpleDescription ? (
              <div
                className="max-w-3xl text-gray-600 leading-relaxed text-base"
                style={{ whiteSpace: 'pre-line' }}
              >
                {simpleDescription}
              </div>
            ) : (
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
            )}
          </div>

          {/* Certificaciones */}
          <div className="ss-grain relative overflow-hidden mt-16 rounded-2xl p-8 md:p-12" style={{ backgroundColor: SS.ink }}>
            <div className="ss-grid absolute inset-0" />
            <div className="ss-crop relative">
              <CropCorners />
              <div className="text-center pt-2">
                <div className="flex justify-center">
                  <Eyebrow color={SS.amber}>Certificaciones</Eyebrow>
                </div>
                <h3 className="ss-display text-white mt-3 mb-10" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700 }}>
                  Calzado que cumple los estándares más exigentes
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-lg" style={{ backgroundColor: 'rgba(233,246,244,.12)' }}>
                {CERTS.map((c) => (
                  <div key={c.label} className="text-center px-4 py-6" style={{ backgroundColor: SS.ink }}>
                    <div className="ss-display text-white" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{c.label}</div>
                    <div className="ss-label mt-2" style={{ color: SS.teal300, fontSize: '.58rem' }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Area id="productPageBottom" />
      </div>
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
    shortDescription
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
