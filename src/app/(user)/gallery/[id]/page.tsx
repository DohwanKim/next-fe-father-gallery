import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getPost } from '@/service/posts';
import { getCFUrl } from '@/utils/common';

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
        <div className={'relative basis-7/12 border-2 rounded object-left'}>
          <Image
            src={getCFUrl(detailData.img!.id)}
            width={0}
            height={0}
            sizes={'100vw'}
            priority
            alt={''}
            className={'object-contain w-full h-auto'}
          />
        </div>
        <div className={'grow'}>
          <h1 className={'text-3xl mb-10'}>{detailData.title}</h1>
          <p className={'text-foreground/80 mb-2'}>{detailData.price}</p>
          <p className={'text-foreground/80 mb-2'}>{detailData.isSold}</p>
          <p className={'text-foreground/80 mb-2'}>{detailData.artType}</p>
          <p className={'text-foreground/80 mb-2'}>{detailData.canvasSize}</p>
          <p className={'text-foreground/80'}>{detailData.contents}</p>
        </div>
      </div>
      <div>Bottom Area</div>
    </div>
  );
}
