import apiFetch from '@/utils/ofetchIntance';

export const signIn = async (data: { username: string; password: string }) => {
  return await apiFetch('/auth/signin', {
    method: 'POST',
    body: data,
  });
};
