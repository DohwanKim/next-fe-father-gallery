'use client';
import Image from 'next/image';
import Link from 'next/link';
import { AnchorHTMLAttributes, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { ImagesVariants } from '@/constants/images.enum';
import { cn } from '@/lib/utils';
import { Post } from '@/types/posts.type';
import { artTypeToKorean, getCFUrl } from '@/utils/common';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  postItem: Post;
}

export const PostItemSkeleton = () => {
  return Array.from({ length: 9 }, (_, index) => (
    <div key={index}>
      <Skeleton className="w-full aspect-square drop-shadow mb-5" />
      <div className={'flex flex-col items-center'}>
        <Skeleton className="h-4 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ));
};

const PostItem = ({ postItem, className, ...props }: Props) => {
  const [originImgLoaded, setOriginImgLoaded] = useState<boolean>(false);
  const { img, title, artType } = postItem;

  return (
    <Link
      href={`/gallery/${postItem.id}`}
      {...props}
      className={cn(
        '[&:hover_img]:scale-105 [&:hover_div_div]:opacity-15',
        className,
      )}
    >
      {img && (
        <div className={'relative w-full aspect-square mb-2 overflow-hidden'}>
          <Image
            fill
            src={getCFUrl(img.id, ImagesVariants.USER_POST_BLUR)}
            alt={''}
            priority
            className={`object-cover transition-opacity duration-500 ${
              originImgLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <Image
            fill
            src={getCFUrl(img.id, ImagesVariants.USER_POST)}
            alt={''}
            className={`object-cover transition duration-300 ${
              originImgLoaded ? 'opacity-100' : 'opacity-0'
            }}`}
            onLoad={() => setOriginImgLoaded(true)}
          />
          <div
            className={
              'absolute w-full h-full transition-opacity duration-300 opacity-0 bg-black'
            }
          />
        </div>
      )}
      <div className={'text-center text-sm'}>
        <h2>{title}</h2>
        <p className={'font-light'}>{artTypeToKorean(artType)}</p>
      </div>
    </Link>
  );
};

export default PostItem;
