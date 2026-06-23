import Area from '@components/common/Area.js';
import React from 'react';

export function Header() {
  return (
    <header className="header">
      <Area
        id="headerTop"
        className="header__top"
        isGlobal
        editableInPageBuilder
      />
      <div className="header__middle flex items-center gap-6 px-6 py-3">
        <Area
          id="headerMiddleLeft"
          className="header__middle__left flex-shrink-0 flex items-center"
          isGlobal
          editableInPageBuilder
        />
        <Area
          id="headerMiddleCenter"
          className="header__middle__center flex-1 flex items-center"
          isGlobal
          editableInPageBuilder
        />
        <Area
          id="headerMiddleRight"
          className="header__middle__right flex items-center gap-3 ml-auto"
          isGlobal
          editableInPageBuilder
        />
      </div>
      <Area
        id="headerBottom"
        className="header__bottom"
        isGlobal
        editableInPageBuilder
      />
    </header>
  );
}
