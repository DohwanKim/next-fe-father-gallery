'use client';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

const DetailImage = ({ imgSrc }: Props) => {
  return (
    <div
      className={
        'flex justify-center relative h-[500px] md:h-[50vh] basis-7/12 bg-stone-100 drop-shadow-md cursor-pointer'
      }
      onClick={() => {
        console.log('show modal');
      }}
    >
      <Image
        src={imgSrc}
        width={0}
        height={0}
        sizes={'100vw'}
        priority
        alt={''}
        className={'object-contain w-auto h-full'}
      />
    </div>
  );
};

export default DetailImage;
