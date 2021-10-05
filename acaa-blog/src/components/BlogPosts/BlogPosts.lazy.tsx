import React, { lazy, Suspense } from 'react';

const LazyBlogPosts = lazy(() => import('./BlogPosts'));

const BlogPosts = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBlogPosts {...props} />
  </Suspense>
);

export default BlogPosts;
