import { create } from 'zustand';

export interface AdminPostsStore {
  checkedPosts: number[];
  setCheckedPosts: (postIds: number[]) => void;
}

const useAdminPostsStore = create<AdminPostsStore>((set) => ({
  checkedPosts: [],
  setCheckedPosts: (postIds) => set({ checkedPosts: postIds }),
}));

export default useAdminPostsStore;
