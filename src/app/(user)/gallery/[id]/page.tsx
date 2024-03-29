import BackButton from '@/components/user/atom/BackButton';
import DetailImage from '@/components/user/organism/DetailImage';
import PostItem from '@/components/user/organism/PostItem';
import { ImagesVariants } from '@/constants/images.enum';
import { ArtType } from '@/constants/post.enum';
import { getPost, getRandomPost } from '@/service/posts';
import { artTypeToKorean, getCFUrl, threeCommaNum } from '@/utils/common';
import dayjs from '@/utils/dayjs';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const detailData = await getPost(Number(id));
  const ogTitle = `${detailData.title || '갤러리'} | 김동철 그림세상`;

  return {
    title: detailData.title || '갤러리',
    openGraph: {
      title: ogTitle,
      description: detailData.contents || '',
      images: [
        {
          url: getCFUrl(detailData.img!.id, ImagesVariants.USER_POST_DETAIL_OG),
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
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
        <BackButton />
      </div>
      <div className={'flex flex-col md:flex-row gap-x-10 gap-y-5 mb-10'}>
        <DetailImage imgId={detailData.img!.id} />
        <div
          className={
            'flex flex-col gap-y-2 grow [&_dl]:flex [&_dt]:w-[100px] [&_dd]:font-light [&_dd]:text-foreground/80'
          }
        >
          <h1 className={'text-2xl border-b pb-2'}>{detailData.title}</h1>
          <dl>
            <dt>Category</dt>
            <dd>{artTypeToKorean(detailData.artType as ArtType)}</dd>
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
          {detailData.price && detailData.price > 0 ? (
            <dl>
              <dt>Price</dt>
              <dd>{threeCommaNum(detailData.price)} ₩</dd>
            </dl>
          ) : null}
          <p className={'text-sm font-light border-t pt-2'}>
            {detailData.contents}
          </p>
        </div>
      </div>
      <div className={'border-t mt-8 pt-8 md:mt-16 md:pt-16'}>
        <h2 className={'text-2xl text-foreground/80 mb-4'}>
          You may also like
        </h2>
        <div className={'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'}>
          {randomPost.map((post, index) => (
            <PostItem
              key={post.id}
              postItem={post}
              className={
                index === 2
                  ? 'hidden sm:block'
                  : index === 3 || index === 4
                    ? 'hidden md:block'
                    : ''
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
