import React, { lazy, Suspense } from 'react';

const LazyAdminMenu = lazy(() => import('./AdminMenu'));

const AdminMenu = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminMenu {...props} />
  </Suspense>
);

export default AdminMenu;
