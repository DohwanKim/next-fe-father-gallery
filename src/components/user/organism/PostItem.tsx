import Image from 'next/image';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

import { Post } from '@/types/posts.type';
import { artTypeToKorean, getCFUrl } from '@/utils/common';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  postItem: Post;
}

const PostItem = ({ postItem, ...props }: Props) => {
  const { img, title, artType } = postItem;

  return (
    <Link
      href={`/gallery/${postItem.id}`}
      className={'[&:hover_img]:scale-105'}
      {...props}
    >
      {img && (
        <div
          className={
            'relative w-full aspect-square mb-5 overflow-hidden rounded-lg drop-shadow-lg'
          }
        >
          <Image
            fill={true}
            src={getCFUrl(img.id)}
            alt={''}
            className={'object-cover transition-transform duration-500'}
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
