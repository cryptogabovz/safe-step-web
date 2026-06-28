import React from 'react';

interface LogoProps {
  dashboardUrl: string;
}
export default function Logo({ dashboardUrl }: LogoProps) {
  return (
    <div className="logo flex items-center">
      <a href={dashboardUrl} className="flex items-center">
        <img
          src="/assets/safestep/logo-safestep.png"
          alt="Safe Step"
          style={{ height: '32px', width: 'auto' }}
        />
      </a>
    </div>
  );
}

export const layout = {
  areaId: 'header',
  sortOrder: 10
};

export const query = `
  query query {
    dashboardUrl: url(routeId:"dashboard")
  }
`;
