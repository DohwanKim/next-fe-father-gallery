import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

import PostItem from '../PostItem';

describe('PostItem', () => {
  let paginatePosts: Paginate<Post>;

  beforeAll(async () => {
    // MSW DATA
    paginatePosts = await getPaginatePosts({ page: 1, limit: 10 });
  });

  it('데이터를 받아서 랜더한다', async () => {
    const item = paginatePosts.items[0] as Post;
    const { findAllByTitle } = render(<PostItem postItem={item} />);

    expect(findAllByTitle('샘플 게시글1')).toBeTruthy();
  });

  it('a 태그에 올바른 디테일 페이지 url이 있다', async () => {
    const item = paginatePosts.items[0] as Post;
    const { findByRole } = render(<PostItem postItem={item} />);
    const link = await findByRole('link');

    expect(link).toHaveAttribute('href', `/gallery/${item.id}`);
  });

  it('이미지 데이터가 없으면 이미지 태그가 없다', async () => {
    const noImgItem = { ...paginatePosts.items[0], img: null } as Post;
    render(<PostItem postItem={noImgItem} />);
    const img = document.querySelectorAll('img');

    expect(img.length).toBe(0);
  });

  it('이미지 데이터가 있으면 메인 이미지가 로드 후 블러이미지가 감춰지고 메인이미지가 보인다', async () => {
    const item = paginatePosts.items[0] as Post;
    render(<PostItem postItem={item} />);
    const blurImg = screen.getByAltText(`${item.title} blur image`);
    const mainImg = screen.getByAltText(`${item.title} image`);

    expect(blurImg).toHaveClass('opacity-100');
    expect(mainImg).toHaveClass('opacity-0');

    fireEvent.load(mainImg);
    await waitFor(() => {
      expect(blurImg).toHaveClass('opacity-0');
      expect(mainImg).toHaveClass('opacity-100');
    });
  });
});
