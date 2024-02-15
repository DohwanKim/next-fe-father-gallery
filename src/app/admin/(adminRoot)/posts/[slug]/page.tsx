'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ArtType } from '@/constants/post.enum';
import { getImageUploadUrl, uploadImage } from '@/service/images';
import { getPost } from '@/service/posts';
import { PostForm } from '@/types/posts.type';

interface Props {
  params: { slug: `${number}` | 'new' };
}

export default function PostDetailPage({ params }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostForm>();
  const onSubmit = async (data: PostForm) => {
    setValue('tags', ['test']);

    if (data.img) {
      const cloudflareUrl = await getImageUploadUrl();
      const uploadedImageData = await uploadImage(
        cloudflareUrl,
        data.img as FileList,
      ).catch((e) => {
        console.log(e);
        console.log('url 만료됨');
      });

      console.log(cloudflareUrl);
      console.log(uploadedImageData);
    }
  };

  if (params.slug !== 'new') {
    (async () => {
      const initData = await getPost(Number(params.slug));
      Object.entries(initData).forEach(([key, value]) => {
        setValue(key as keyof PostForm, value);
      });
    })();
  }

  useEffect(() => {
    setValue('artType', 'NONE' as ArtType);
    setValue('tags', ['test']);
  });

  return (
    <>
      <h1>페이지 이름</h1>
      <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>image</div>
          <div>
            <input type={'file'} {...register('img', { required: true })} />
            {errors.img && <span>이미지를 등록해주세요</span>}
          </div>
        </div>
        <div>
          <div>title</div>
          <div>
            <input type={'text'} {...register('title', { required: true })} />
            {errors.title && <span>제목을 입력해주세요</span>}
          </div>
        </div>
        <div>
          <div>artType</div>
          <div>
            <input type={'text'} {...register('artType', { required: true })} />
          </div>
        </div>
        <div>
          <div>canvasSize</div>
          <div>
            <input type={'text'} {...register('canvasSize')} />
          </div>
        </div>
        <div>
          <div>price</div>
          <div>
            <input type={'text'} {...register('price')} />
          </div>
        </div>
        <div>
          <div>frameType</div>
          <div>
            <input type={'text'} {...register('frameType')} />
          </div>
        </div>
        <div>
          <div>contents</div>
          <div>
            <input type={'text'} {...register('contents')} />
          </div>
        </div>
        <div>
          <div>tags</div>
          <div>
            <input type={'text'} {...register('tags')} />
          </div>
        </div>
        <div>
          <div>isSold</div>
          <div>
            <input type={'checkbox'} {...register('isSold')} />
          </div>
        </div>
      </form>
      <div>
        <button>[삭제]</button>
        <button>[취소]</button>
        <button type="submit" form="hook-form">
          [저장]
        </button>
      </div>
    </>
  );
}
