import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

import DetailImage from '@/components/user/organism/DetailImage';
import PostItem from '@/components/user/organism/PostItem';
import { getPost, getRandomPost } from '@/service/posts';
import { artTypeToKorean, threeCommaNum } from '@/utils/common';
import dayjs from '@/utils/dayjs';

interface Props {
  params: {
    id: string;
  };
}

export default async function GalleryDetail({ params }: Props) {
  const { id } = params;
  const detailData = await getPost(Number(id));
  const randomPost = await getRandomPost(Number(id));

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
        <DetailImage imgId={detailData.img!.id} />
        <div
          className={
            'flex flex-col gap-y-2 grow [&_dl]:flex [&_dt]:w-[100px] [&_dd]:font-light [&_dd]:text-foreground/80'
          }
        >
          <h1 className={'text-3xl border-b pb-2'}>{detailData.title}</h1>
          <dl>
            <dt>Category</dt>
            <dd>{artTypeToKorean(detailData.artType)}</dd>
          </dl>
          <dl>
            <dt>Date</dt>
            <dd>{dayjs(detailData.drawingDate).format('YYYY.MM.DD')}</dd>
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
          <p className={'text-sm font-light border-t pt-2'}>
            {detailData.contents}
          </p>
        </div>
      </div>
      <div className={'mt-16 border-t pt-16'}>
        <h2 className={'text-2xl pb-4'}>다른 작품 감상하기</h2>
        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-24'
          }
        >
          {randomPost.map((post) => (
            <PostItem key={post.id} postItem={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
