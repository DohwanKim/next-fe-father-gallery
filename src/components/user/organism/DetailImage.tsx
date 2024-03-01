'use client';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getCFUrl } from '@/utils/common';

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgId: string;
}

const DetailImage = ({ imgId }: Props) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={
              'flex justify-center relative h-[500px] md:h-[50vh] basis-7/12 bg-stone-100 drop-shadow-md cursor-pointer'
            }
          >
            <Image
              src={getCFUrl(imgId)}
              width={0}
              height={0}
              sizes={'100vw'}
              priority
              alt={''}
              className={'object-contain w-auto h-full'}
            />
          </div>
        </DialogTrigger>
        <DialogContent className={'max-w-[95vw] bg-transparent border-0 p-0'}>
          <Image
            src={getCFUrl(imgId)}
            width={0}
            height={0}
            sizes={'100vw'}
            priority
            alt={''}
            className={'object-contain max-h-[90dvh] w-full h-auto'}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailImage;
