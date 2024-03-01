import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getPost } from '@/service/posts';
import { artTypeToKorean, getCFUrl, threeCommaNum } from '@/utils/common';

interface Props {
  params: {
    id: string;
  };
}

export default async function GalleryDetail({ params }: Props) {
  const { id } = params;
  const detailData = await getPost(Number(id));

  if (!detailData) {
    return null;
  }

  return (
    <div className={'container'}>
      <div>
        <Link href={'/'} className={'flex items-center mb-5'}>
          <MoveLeft className={'mr-2'} />
          <span>Back</span>
        </Link>
      </div>
      <div className={'flex flex-col md:flex-row gap-x-10 gap-y-5 mb-10'}>
        <div className={'relative basis-7/12 object-left'}>
          <Image
            src={getCFUrl(detailData.img!.id)}
            width={0}
            height={0}
            sizes={'100vw'}
            priority
            alt={''}
            className={'object-contain rounded w-full h-auto'}
          />
        </div>
        <div className={'grow [&_dl]:mb-2 [&_dd]:text-foreground/80'}>
          <h1 className={'text-3xl mb-10'}>{detailData.title}</h1>
          <dl>
            <dt>Category</dt>
            <dd>{artTypeToKorean(detailData.artType)}</dd>
          </dl>
          <dl>
            <dt>Canvas</dt>
            <dd>{detailData.frameType}</dd>
          </dl>
          <dl>
            <dt>Canvas Size</dt>
            <dd>{detailData.canvasSize}</dd>
          </dl>
          <dl>
            <dt>Price</dt>
            <dd>{threeCommaNum(detailData.price)} ₩</dd>
          </dl>
          <p className={'text-foreground/80'}>{detailData.contents}</p>
        </div>
      </div>
      <div>Bottom Area</div>
    </div>
  );
}
