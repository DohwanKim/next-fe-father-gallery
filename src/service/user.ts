import apiFetch from '@/utils/fetchIntance';

export const getMyInfo = async () => {
  return await apiFetch('/api/users/info').then((res) => res.body);
};
