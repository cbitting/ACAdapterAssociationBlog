import React, { lazy, Suspense } from 'react';

const LazyTopNavMenu = lazy(() => import('./TopNavMenu'));

const TopNavMenu = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTopNavMenu {...props} />
  </Suspense>
);

export default TopNavMenu;
