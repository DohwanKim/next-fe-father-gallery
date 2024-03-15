import { Metadata } from 'next';
import { Suspense } from 'react';

import PostItemSkeleton from '@/components/user/organism/PostItemSkeleton';
import Posts from '@/components/user/organism/Posts';

export const metadata: Metadata = {
  title: 'Gallery',
};

const GallerySuspense = () => {
  return (
    <div className={'relative container mx-auto'}>
      <div className={'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'}>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default function Gallery() {
  return (
    <Suspense fallback={<GallerySuspense />}>
      <Posts />
    </Suspense>
  );
}
