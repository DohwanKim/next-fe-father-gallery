import { Metadata } from 'next';
import { Suspense } from 'react';

import Posts from '@/components/user/organism/Posts';

export const metadata: Metadata = {
  title: '갤러리',
};
export default function Gallery() {
  return (
    <Suspense>
      <Posts />
    </Suspense>
  );
}
