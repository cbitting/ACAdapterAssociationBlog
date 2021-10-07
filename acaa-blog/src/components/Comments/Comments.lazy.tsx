import React, { lazy, Suspense } from 'react';

const LazyComments = lazy(() => import('./Comments'));

const Comments = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; postId: string }) => (
  <Suspense fallback={null}>
    <LazyComments {...props} />
  </Suspense>
);

export default Comments;
