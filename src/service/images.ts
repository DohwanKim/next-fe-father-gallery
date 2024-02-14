import apiFetch from '@/utils/fetchIntance';

type ImageUploadUrl = {
  uploadUrl: string;
};

export const getImageUploadUrl = async (): Promise<string> => {
  return await apiFetch<ImageUploadUrl>('/api/images/get-upload-url').then(
    (res) => res.body.uploadUrl,
  );
};

export const uploadImage = async (url: string, file: FileList) => {
  const formData = new FormData();
  formData.append('file', file[0]);

  return await fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => res.result);
};
