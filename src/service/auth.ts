import apiFetch from '@/utils/fetchIntance';

export const signIn = async (data: { username: string; password: string }) => {
  return await apiFetch('/api/auth/signin', {
    method: 'POST',
    body: data,
  });
};

export const signOut = async () => {
  return await apiFetch('/api/auth/signout', {
    method: 'POST',
  });
};

export const refreshToken = async () => {
  return await apiFetch('/api/auth/refresh').catch(() => {
    throw new Error('로그인 페이지로 이동');
  });
};
