'use client';

import { createContext, useContext, useState } from 'react';

export const BreadcrumbsContext = createContext({
  rightAction: null,
  setRightAction: () => {},
});

export function BreadcrumbsProvider({ children }) {
  const [rightAction, setRightAction] = useState(null);

  return (
    <BreadcrumbsContext.Provider value={{ rightAction, setRightAction }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export function useBreadcrumbs() {
  return useContext(BreadcrumbsContext);
}
