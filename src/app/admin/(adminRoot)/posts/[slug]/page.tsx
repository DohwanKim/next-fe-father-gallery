'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArtType } from '@/constants/post.enum';
import { getImageUploadUrl, uploadImage } from '@/service/images';
import { createPost, deletePost, getPost, updatePost } from '@/service/posts';
import { ImageUploadedResult, Post, PostCore } from '@/types/posts.type';
import dayjs from '@/utils/dayjs';
import { z } from '@/utils/zod-i18n';

interface Props {
  params: { slug: `${number}` | 'new' };
}

// type ImageStatus = 'NONE' | 'CHANGED' | 'UPLOADED';

const formSchema = z.object({
  title: z.string().min(1),
  artType: z.nativeEnum(ArtType),
  canvasSize: z.string(),
  price: z.number(),
  frameType: z.string(),
  contents: z.string(),
  isSold: z.boolean(),
  tags: z.optional(z.array(z.string())).default([]),
  img: z
    .union([z.literal('NONE'), z.literal('CHANGED'), z.literal('UPLOADED')])
    .nullable(),
});

export default function PostDetailPage({ params }: Props) {
  const router = useRouter();
  const [editData, setEditData] = useState<Post | null>(null);
  const imgFileInputRef = useRef<HTMLInputElement>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string>('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      artType: 'NONE' as ArtType,
      canvasSize: '',
      price: 0,
      frameType: '',
      contents: '',
      isSold: false,
      img: 'NONE',
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    if (data.img === 'NONE') {
      form.setError('img', { message: '이미지를 등록해주세요.' });
      return;
    }

    // TODO: 로딩 표시 만들기
    let newImgData: ImageUploadedResult | null = null;
    if (data.img === 'CHANGED') {
      const file = imgFileInputRef.current?.files?.[0];

      if (file) {
        newImgData = await getImageUploadUrl()
          .then(async (cloudflareUrl) => {
            return await uploadImage(cloudflareUrl, file);
          })
          .catch((e) => {
            console.log(e);
            // TODO: 실패 시 얼럿 출력
            return null;
          });

        if (!newImgData) {
          return;
        }
      }
    } else if (data.img === 'UPLOADED' && editData?.img) {
      newImgData = editData.img;
    }

    const newData = {
      ...data,
      img: newImgData,
    };

    try {
      if (params.slug === 'new') {
        await createPost(newData).catch((e) => {
          // TODO: 실패 시 모달 출력
          console.log(e);
        });
        alert('등록되었습니다.');
      } else {
        await updatePost(Number(params.slug), newData).catch((e) => {
          // TODO: 실패 시 모달 출력
          console.log(e);
        });
        alert('수정되었습니다.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      router.push('/admin/posts');
    }
  };

  useEffect(() => {
    form.setValue('artType', 'NONE' as ArtType);
    if (params.slug !== 'new') {
      (async () => {
        const { id, createAt, updateAt, version, ...others } = await getPost(
          Number(params.slug),
        );

        setEditData({ id, createAt, updateAt, version, ...others });
        Object.entries({ ...others }).forEach(([key, value]) => {
          if (key === 'img' && value) {
            const { variants } = value as ImageUploadedResult;

            setImgPreviewUrl(variants[0]);
            form.setValue('img', 'UPLOADED');
          } else {
            form.setValue(
              key as keyof PostCore,
              value as keyof Omit<PostCore, 'img'>,
            );
          }
        });
      })();
    }
  }, [form, params.slug]);

  return (
    <>
      <h1 className={'text-3xl font-bold mb-10'}>
        {params.slug === 'new' ? '새 게시글 등록' : '게시글 수정'}
      </h1>
      {editData && (
        <div className={'flex gap-3 border-b mb-5 pb-5 text-sm'}>
          <dl className={'flex gap-1'}>
            <dt className={'font-bold'}>생성일: </dt>
            <dd>{dayjs(editData.createAt).format('YYYY-MM-DD HH:mm:ss')}</dd>
          </dl>
          <dl className={'flex gap-1'}>
            <dt className={'font-bold'}>수정일:</dt>
            <dd>{dayjs(editData.updateAt).format('YYYY-MM-DD HH:mm:ss')}</dd>
          </dl>
          <dl className={'flex gap-1'}>
            <dt className={'font-bold'}>수정 횟수:</dt>
            <dd>{editData.version}</dd>
          </dl>
        </div>
      )}
      <Form {...form}>
        <form
          id="post-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className={'flex flex-col gap-5 *:flex *:items-center *:gap-3'}
        >
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>이미지</FormLabel>
                <div className={'flex flex-col w-1/2'}>
                  <FormControl>
                    <>
                      {field.value !== 'NONE' && (
                        <div className={'w-1/2 mb-5'}>
                          <p className={'text-xs text-foreground/80'}>
                            미리보기
                            {field.value === 'UPLOADED' &&
                              editData?.img &&
                              ` (${editData.img.filename})`}
                          </p>
                          <img src={imgPreviewUrl} alt={''} />
                        </div>
                      )}
                      <div className={'flex gap-3'}>
                        <Button
                          type={'button'}
                          onClick={() => {
                            if (imgFileInputRef.current) {
                              imgFileInputRef.current.click();
                            }
                          }}
                        >
                          파일 올리기
                        </Button>
                        <Input
                          type={'file'}
                          {...field}
                          ref={imgFileInputRef}
                          value={undefined}
                          accept={'image/*'}
                          className={'hidden'}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setImgPreviewUrl(
                                URL.createObjectURL(e.target.files[0]),
                              );

                              field.onChange('CHANGED');
                            }
                          }}
                        />
                        {imgPreviewUrl && (
                          <Button
                            onClick={() => {
                              form.setValue('img', 'NONE');
                              setImgPreviewUrl('');
                              if (imgFileInputRef.current) {
                                imgFileInputRef.current.files = null;
                                imgFileInputRef.current.value = '';
                              }
                            }}
                            variant={'destructive'}
                          >
                            이미지 삭제
                          </Button>
                        )}
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>제목</FormLabel>
                <div className={'w-1/2'}>
                  <FormControl>
                    <Input placeholder="제목" type={'text'} {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="artType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>그림 타입</FormLabel>
                <div className={'w-1/2'}>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="그림 타입을 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ArtType.NONE}>분류 없음</SelectItem>
                        <SelectItem value={ArtType.WATERCOLOR}>
                          수채화
                        </SelectItem>
                        <SelectItem value={ArtType.PENCIL_DRAWING}>
                          연필화
                        </SelectItem>
                        <SelectItem value={ArtType.ACRYLIC_PAINTING}>
                          아크릴화
                        </SelectItem>
                        <SelectItem value={ArtType.OIL_PAINTING}>
                          유화
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="canvasSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>캔버스 정보</FormLabel>
                <FormControl>
                  <Input
                    className={'w-1/2'}
                    placeholder="61x45cm"
                    type={'text'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>가격</FormLabel>
                <FormControl>
                  <Input
                    className={'w-1/2'}
                    placeholder="price"
                    type={'text'}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');

                      if (value) {
                        field.onChange(Number(value) || 0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frameType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>액자 정보</FormLabel>
                <FormControl>
                  <Input
                    className={'w-1/2'}
                    placeholder="Oil on canvas"
                    type={'text'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>내용</FormLabel>
                <FormControl>
                  <Textarea
                    className={'w-1/2'}
                    placeholder="유화 왕초보라 갈길이 머네요...ㅡ,,ㅡ;;;"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSold"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'w-24 font-bold'}>판매여부</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={'flex justify-between border-t mt-5 pt-5'}>
            {params.slug !== 'new' ? (
              <Button
                type={'button'}
                variant={'destructive'}
                onClick={async () => {
                  if (confirm('정말로 삭제하시겠습니까?')) {
                    await deletePost(Number(params.slug)).then(() => {
                      alert('삭제되었습니다.');
                      router.push('/admin/posts');
                    });
                  }
                }}
              >
                삭제
              </Button>
            ) : (
              <span />
            )}
            <div className={'flex gap-3'}>
              <Button
                type={'button'}
                variant={'secondary'}
                onClick={() => {
                  history.back();
                }}
              >
                취소
              </Button>
              <Button className={'font-bold'} type="submit">
                저장
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
