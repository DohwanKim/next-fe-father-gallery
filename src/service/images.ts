import { ImageUploadedResult } from '@/types/posts.type';
import apiFetch from '@/utils/fetchIntance';

type ImageUploadUrl = {
  uploadUrl: string;
};

export const getImageUploadUrl = async (): Promise<string> => {
  return await apiFetch<ImageUploadUrl>('/api/images/get-upload-url').then(
    (res) => res.body.uploadUrl,
  );
};

export const uploadImage = async (
  url: string,
  file: File,
): Promise<ImageUploadedResult> => {
  const formData = new FormData();
  formData.append('file', file);

  return await fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => res.result);
};
