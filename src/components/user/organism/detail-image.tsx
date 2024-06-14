'use client';
import Image from 'next/image';
import { HTMLAttributes, useState } from 'react';

import { LoadingSpinner } from '@/components/common/atom/loading-spinner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ImagesVariants } from '@/constants/images.enum';
import { getCFUrl } from '@/utils/common';

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgId: string;
  imgTitle?: string;
}

const DetailImage = ({ imgId, imgTitle }: Props) => {
  const [originImgLoaded, setOriginImgLoaded] = useState<boolean>(false);
  const [detailOriginImgLoaded, setDetailOriginImgLoaded] =
    useState<boolean>(false);

  return (
    <>
      <Dialog>
        <DialogTrigger
          role={'button'}
          tabIndex={0}
          data-testid="trigger"
          asChild
        >
          <div
            className={
              'flex justify-center relative max-h-[400px] md:h-[500px] md:max-h-[700px] grow md:basis-7/12 bg-stone-100 drop-shadow cursor-zoom-in'
            }
          >
            <Image
              src={getCFUrl(imgId, ImagesVariants.USER_POST_DETAIL_BLUR)}
              alt={`${imgTitle} blur image`}
              priority
              className={`object-contain w-full h-auto duration-500 ${
                originImgLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              fill
            />
            <Image
              src={getCFUrl(imgId, ImagesVariants.USER_POST_DETAIL)}
              alt={`${imgTitle} image`}
              unoptimized
              width={0}
              height={0}
              sizes={'100vw'}
              className={`object-contain w-full h-auto transition-opacity duration-300 ${
                originImgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setOriginImgLoaded(true)}
            />
          </div>
        </DialogTrigger>
        <DialogContent
          className={'max-w-[95vw] bg-transparent border-0 p-0 shadow-none'}
        >
          {!detailOriginImgLoaded && (
            <LoadingSpinner
              className={
                'absolute h-full w-full flex items-center justify-center'
              }
            />
          )}
          <Image
            role="dialogImage"
            src={getCFUrl(imgId)}
            width={0}
            height={0}
            sizes={'100vw'}
            priority
            alt={'detail image'}
            unoptimized
            className={'object-contain max-h-[90dvh] w-full h-auto'}
            onLoad={() => setDetailOriginImgLoaded(true)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailImage;
