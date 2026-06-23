import Area from '@components/common/Area.js';
import {
  CategoryData,
  CategoryProvider
} from '@components/frontStore/catalog/CategoryContext.js';
import { CategoryProducts } from '@components/frontStore/catalog/CategoryProducts.js';
import { CategoryProductsFilter } from '@components/frontStore/catalog/CategoryProductsFilter.js';
import { CategoryProductsPagination } from '@components/frontStore/catalog/CategoryProductsPagination.js';
import { ProductSorting } from '@components/frontStore/catalog/ProductSorting.js';
import React from 'react';

interface CategoryViewProps {
  category: CategoryData;
}

export default function CategoryView({ category }: CategoryViewProps) {
  return (
    <CategoryProvider category={category}>
      <Area id="categoryPageTop" className="category__page__top" />

      {/* Category header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
              {category.description}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-3">
            {category.products.total} producto{category.products.total !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Main grid: sidebar + products */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10">

          {/* Sidebar filters */}
          <aside className="w-full md:w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                Filtrar
              </p>
              <Area
                id="categoryLeftColumn"
                coreComponents={[
                  {
                    component: { default: <CategoryProductsFilter /> },
                    sortOrder: 10,
                    id: 'productFilter'
                  }
                ]}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                {category.products.total} resultado{category.products.total !== 1 ? 's' : ''}
              </p>
              <Area
                id="categoryRightColumn"
                coreComponents={[
                  {
                    component: {
                      default: (
                        <ProductSorting
                          className="flex justify-end"
                          count={category.products.total}
                        />
                      )
                    },
                    sortOrder: 10,
                    id: 'categoryProductsSorting'
                  }
                ]}
              />
            </div>

            <Area
              id="categoryProducts"
              coreComponents={[
                {
                  component: { default: <CategoryProducts /> },
                  sortOrder: 20,
                  id: 'categoryProducts'
                },
                {
                  component: { default: <CategoryProductsPagination /> },
                  sortOrder: 30,
                  id: 'categoryProductsPagination'
                }
              ]}
            />
          </div>
        </div>
      </div>

      <Area id="categoryPageBottom" className="category__page__bottom" />
    </CategoryProvider>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    category: currentCategory {
      showProducts
      name
      uuid
      description
      image { alt url }
      products {
        items {
          ...Product
        }
        currentFilters { key operation value }
        total
      }
      availableAttributes {
        attributeCode
        attributeName
        options { optionId optionText }
      }
      priceRange { min max minText maxText }
      children { categoryId name uuid }
    }
}`;

export const fragments = `
  fragment Product on Product {
    productId
    name
    sku
    price {
      regular { value text }
      special { value text }
    }
    inventory { isInStock }
    image { alt url }
    url
  }
`;
