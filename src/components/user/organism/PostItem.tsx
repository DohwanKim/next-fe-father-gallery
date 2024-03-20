'use client';
import Image from 'next/image';
import Link from 'next/link';
import { AnchorHTMLAttributes, useState } from 'react';

import { ImagesVariants } from '@/constants/images.enum';
import { ArtType } from '@/constants/post.enum';
import { cn } from '@/lib/utils';
import { Post } from '@/types/posts.type';
import { artTypeToKorean, getCFUrl } from '@/utils/common';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  postItem: Post;
}

const PostItem = ({ postItem, className, ...props }: Props) => {
  const [originImgLoaded, setOriginImgLoaded] = useState<boolean>(false);
  const { img, title, artType } = postItem;

  return (
    <Link
      href={`/gallery/${postItem.id}`}
      {...props}
      className={cn(
        'relative [&:hover_img]:scale-105 [&:hover_div_div]:opacity-15',
        className,
      )}
    >
      <div className={'relative w-full aspect-square mb-2 overflow-hidden'}>
        {img && (
          <>
            <Image
              src={getCFUrl(img.id, ImagesVariants.USER_POST_BLUR)}
              alt={`${title} blur image`}
              fill
              priority
              unoptimized
              sizes={'100vw'}
              className={`object-cover w-full h-full transition-opacity duration-500 ${
                originImgLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <Image
              src={getCFUrl(img.id, ImagesVariants.USER_POST)}
              alt={`${title} image`}
              width={0}
              height={0}
              sizes={'100vw'}
              unoptimized
              className={`object-cover w-full h-full transition-all duration-300 ${
                originImgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setOriginImgLoaded(true)}
            />
          </>
        )}
        <div
          className={
            'absolute w-full h-full transition-opacity duration-300 opacity-0 bg-black'
          }
        />
      </div>
      <div className={'text-center text-sm'}>
        <h2>{title}</h2>
        <p className={'font-light'}>{artTypeToKorean(artType as ArtType)}</p>
      </div>
    </Link>
  );
};

export default PostItem;
