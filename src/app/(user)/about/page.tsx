import { ExternalLink, Home, Mail, Phone } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

import SocialLinks from '@/components/user/organism/SocialLinks';

export const metadata: Metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className={'container'}>
      <div className={'grid gap-6 grid-cols-1 md:grid-cols-2'}>
        <div className={'relative aspect-square drop-shadow'}>
          <Image
            src={'/img/profile.jpeg'}
            alt={''}
            priority
            className={'object-cover h-full filter'}
            fill
          />
        </div>
        <div className={'flex flex-col justify-center gap-3 md:gap-10'}>
          <div>
            <h1 className={'text-2xl font-light'}>
              Dongcheol Kim | South Korea
            </h1>
          </div>
          <div
            className={
              'flex flex-col gap-4 font-extralight italic text-foreground/80'
            }
          >
            <p>
              In my early years, I discovered a talent for painting, but the
              opportunity to nurture that dream was not within reach at the
              time. Amid compromises with the world, that passion was
              momentarily set aside as time passed. However, it was not too
              late. At a later stage in life, that talent began to quietly yet
              assuredly blossom.
            </p>
            <p>
              Now, I immerse myself in the world of watercolors, capturing the
              beauty of the world and the emotions of moments through the
              harmony of water and color. With the talent discovered in my
              youth, I explore the infinite possibilities of light and color,
              breathing life into each piece. Within my paintings, one can
              discover the beauty of nature and the preciousness of everyday
              life.
            </p>
            <p>
              My work carries stories that touch the heart, encapsulating dreams
              that continue to bloom at this very moment. Through the soft
              textures and transparent light of watercolors, I aim to convey
              messages of warm comfort and hope to you.
            </p>
          </div>
          <div
            className={
              'flex flex-col gap-y-1 [&>*]:flex [&>*]:gap-4 [&>*]:items-center [&>a:hover>span]:text-foreground/70 [&>a>span]:transition-colors'
            }
          >
            <address className={'not-italic'}>
              <Home className={'h-[1rem] w-[1rem]'} />
              <span className={'not-italic'}>
                Sarim Street, ChangWon City, South Korea
              </span>
            </address>
            <a href={'tel:+82 10 3831 5338'}>
              <Phone className={'h-[1rem] w-[1rem]'} />
              <span>+82 10 3831 5338</span>
            </a>
            <a href={'mailto:kreator2006@naver.com'}>
              <Mail className={'h-[1rem] w-[1rem]'} />
              <span>kreator2006@naver.com</span>
            </a>
            <div className={'flex items-center gap-4'}>
              <ExternalLink className={'h-[1rem] w-[1rem]'} />
              <SocialLinks iconSize={16} isShowName />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
