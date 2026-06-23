import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { Button } from '@components/common/ui/Button.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { ProductData } from '@components/frontStore/catalog/ProductContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

export const ProductListItemRender = ({
  product,
  imageWidth,
  imageHeight,
  layout = 'grid',
  showAddToCart = false,
  customAddToCartRenderer
}: {
  product: ProductData;
  imageWidth?: number;
  imageHeight?: number;
  layout?: 'grid' | 'list';
  showAddToCart?: boolean;
  customAddToCartRenderer?: (product: ProductData) => ReactNode;
}) => {
  const hasSpecial =
    product.price.special &&
    product.price.special.value < product.price.regular.value;

  if (layout === 'list') {
    return (
      <div className="group flex gap-5 bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all">
        <a href={product.url} className="shrink-0 rounded-lg overflow-hidden bg-gray-50" style={{ width: 120, height: 120 }}>
          {product.image ? (
            <Image
              src={product.image.url}
              alt={product.image.alt || product.name}
              width={120} height={120}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <ProductNoThumbnail width={120} height={120} />
          )}
        </a>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <a href={product.url}>
              <h3 className="font-medium text-gray-900 text-sm hover:text-teal-700 transition-colors line-clamp-2">{product.name}</h3>
            </a>
            <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              {hasSpecial ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-gray-900">{product.price.special.text}</span>
                  <span className="text-xs text-gray-400 line-through">{product.price.regular.text}</span>
                </div>
              ) : (
                <span className="text-base font-bold text-gray-900">{product.price.regular.text}</span>
              )}
              <span className={`text-xs mt-0.5 block ${product.inventory.isInStock ? 'text-emerald-600' : 'text-red-500'}`}>
                {product.inventory.isInStock ? 'En stock' : 'Sin stock'}
              </span>
            </div>
            {showAddToCart && (
              <div>
                {customAddToCartRenderer ? customAddToCartRenderer(product) : (
                  <AddToCart
                    product={{ sku: product.sku, isInStock: product.inventory.isInStock }}
                    qty={1}
                    onError={(error) => toast.error(error)}
                  >
                    {(state, actions) => (
                      <Button
                        disabled={!state.canAddToCart || state.isLoading}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); actions.addToCart(); }}
                        className="text-xs py-2 px-4"
                      >
                        {state.isLoading ? 'Agregando...' : 'Agregar'}
                      </Button>
                    )}
                  </AddToCart>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid card
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300">
      <a href={product.url} className="block relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1 / 1' }}>
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            width={imageWidth || 400}
            height={imageHeight || 400}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <ProductNoThumbnail width={imageWidth} height={imageHeight} />
        )}
        {hasSpecial && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Oferta
          </span>
        )}
        {!product.inventory.isInStock && (
          <span className="absolute top-3 right-3 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">
            Sin stock
          </span>
        )}
      </a>

      <div className="p-4">
        <a href={product.url}>
          <h3 className="font-medium text-gray-900 text-sm leading-snug hover:text-teal-700 transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </a>
        <p className="text-xs text-gray-400 mb-3">SKU: {product.sku}</p>

        <div className="flex items-end justify-between">
          <div>
            {hasSpecial ? (
              <>
                <span className="text-lg font-bold text-gray-900 block leading-none">{product.price.special.text}</span>
                <span className="text-xs text-gray-400 line-through">{product.price.regular.text}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{product.price.regular.text}</span>
            )}
          </div>

          {showAddToCart && product.inventory.isInStock && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              {customAddToCartRenderer ? customAddToCartRenderer(product) : (
                <AddToCart
                  product={{ sku: product.sku, isInStock: product.inventory.isInStock }}
                  qty={1}
                  onError={(error) => toast.error(error)}
                >
                  {(state, actions) => (
                    <button
                      disabled={!state.canAddToCart || state.isLoading}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); actions.addToCart(); }}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: '#187772', color: 'white' }}
                      aria-label="Agregar al carrito"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  )}
                </AddToCart>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
