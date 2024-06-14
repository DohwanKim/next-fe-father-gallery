import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import SocialLinks from '@/components/user/organism/social-links';

export const metadata: Metadata = {
  description: 'A painting challenge by a non-majors',
  openGraph: {
    title: 'KimDongCheol Art',
    description: 'A painting challenge by a non-majors',
    images: [
      {
        url: '/img/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'KimDongCheol Art',
      },
    ],
  },
};

export default async function Home() {
  return (
    <>
      <section
        className={'relative h-[300px] sm:h-[400px] md:h-[500px] -mt-12 mb-12'}
      >
        <Image
          src={'/img/main_banner_img.jpg'}
          alt={''}
          fill={true}
          className={'object-cover'}
        />
        <div className={'absolute w-full h-full bg-black/10'} />
        <div
          className={
            'absolute flex flex-col w-full h-full items-center justify-center'
          }
        >
          <div className={'container text-white text-center'}>
            <h1 className={'text-4xl font-thin'}>KimDongCheol Art Gallery</h1>
          </div>
        </div>
      </section>
      <section
        className={'container flex flex-col items-center justify-center'}
      >
        <div className={'flex flex-col items-end mb-5'}>
          <blockquote className={'pl-2 py-2 border-l-4 italic font-extralight'}>
            From a talent discovered in childhood, quietly blossoming over time,
            <br />
            I now capture the beauty of the world with watercolors, breathing
            life into each piece.
            <br />
            My works, carrying stories that touch the heart and messages of
            hope, aim to offer warm comfort to you.
          </blockquote>
          <Button variant={'ghost'} className={'rounded-none px-0'} asChild>
            <Link href={'/about'}>by. KimDongCheol</Link>
          </Button>
        </div>
        <SocialLinks isShowName />
      </section>
    </>
  );
}
