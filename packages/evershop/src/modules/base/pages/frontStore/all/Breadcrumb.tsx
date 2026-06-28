import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@components/common/ui/Breadcrumb.js';
import React from 'react';

interface BreadcrumbProps {
  pageInfo: {
    routeId?: string | null;
    breadcrumbs: Array<{
      title: string;
      url: string;
    }>;
  };
}

// Rutas con su propio encabezado/breadcrumb a medida → ocultamos el breadcrumb
// global por defecto (y su espacio) para que la sección pegue con el header.
const HIDDEN_BREADCRUMB_ROUTES = ['productView', 'nosotros', 'contacto'];

function Breadcrumb({ pageInfo: { routeId, breadcrumbs } }: BreadcrumbProps) {
  if (routeId && HIDDEN_BREADCRUMB_ROUTES.includes(routeId)) {
    return null;
  }
  return breadcrumbs.length ? (
    <div className="page-width">
      <div className="py-5">
        <BreadcrumbRoot>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={breadcrumb.url}>
                      {breadcrumb.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </BreadcrumbRoot>
      </div>
    </div>
  ) : null;
}

export const query = `
  query query {
    pageInfo {
      routeId
      breadcrumbs {
        title
        url
      }
    }
  }
`;

export const layout = {
  areaId: 'content',
  sortOrder: 0
};

export default Breadcrumb;
