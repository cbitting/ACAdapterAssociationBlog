import React, { lazy, Suspense } from 'react';


const LazyCommentAdd = lazy(() => import('./CommentAdd'));

const CommentAdd = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; postId: string }) => (
  <Suspense fallback={null}>
    <LazyCommentAdd {...props} />
  </Suspense>
);

export default CommentAdd;
