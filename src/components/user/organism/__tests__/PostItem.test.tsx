import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

import PostItem from '../PostItem';

/**
 * 테스트 시나리오
 * - [x] 데이터를 받아온다.
 *   - [x] MSW 사용해서 데이터를 받아오도록 하자.
 * - [x] 데이터의 아이디를 받아 디테일 페이지로 가는 링크가 생성 된다
 * - [x] 이미지 파일이 있으면 두개의 이미지가 생성 된다
 * - [x] 이때 두번째가 이미지가 로드 되면 첫번째 이미지는 opacity가 0이 되고 두번째 이미지는 opacity가 100이 된다
 * - [ ] 스냅샷 테스트 알아보기
 */

describe('PostItem', () => {
  let paginatePosts: Paginate<Post>;

  beforeAll(async () => {
    paginatePosts = await getPaginatePosts({ page: 1, limit: 10 });
  });

  it('renders by data', async () => {
    const item = paginatePosts.items[0];
    const { findAllByTitle } = render(<PostItem postItem={item as Post} />);

    expect(findAllByTitle('샘플 게시글1')).toBeTruthy();
  });

  it('is should go to detail page when click', async () => {
    const item = paginatePosts.items[0] as Post;
    const { findByRole } = render(<PostItem postItem={item} />);
    const link = await findByRole('link');

    expect(link).toBeTruthy();
  });

  it('when img doesnt exist, there is no img', async () => {
    const noImgItem = { ...paginatePosts.items[0], img: null } as Post;
    render(<PostItem postItem={noImgItem} />);
    const img = document.querySelectorAll('img');

    expect(img.length).toBe(0);
  });

  it('when main img loaded, blur img is hide by opacity-0', async () => {
    const item = paginatePosts.items[0] as Post;
    render(<PostItem postItem={item} />);
    const blurImg = screen.getByAltText(`${item.title} blur image`);
    const mainImg = screen.getByAltText(`${item.title} image`);

    expect(blurImg).toHaveClass('opacity-100');
    expect(mainImg).toHaveClass('opacity-0');

    await waitFor(() => {
      fireEvent.load(mainImg);
    });

    expect(blurImg).toHaveClass('opacity-0');
    expect(mainImg).toHaveClass('opacity-100');
  });
});
