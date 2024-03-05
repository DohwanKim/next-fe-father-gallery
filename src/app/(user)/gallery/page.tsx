import { Metadata } from 'next';

import Posts from '@/components/user/organism/Posts';

export const metadata: Metadata = {
  title: '갤러리',
};
export default function Gallery() {
  return (
    <>
      <Posts />
    </>
  );
}
