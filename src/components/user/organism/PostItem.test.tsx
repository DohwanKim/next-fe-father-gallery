import { render, screen } from '@testing-library/react';

import { getPaginatePosts } from '@/service/posts';
import { Post } from '@/types/posts.type';

import PostItem from './PostItem';

/**
 * 테스트 시나리오
 * - 데이터를 받아온다.
 *   - MSW 사용해서 데이터를 받아오도록 하자.
 * - 데이터의 아이디를 받아 디테일 페이지로 가는 링크가 생성 된다
 * - 이미지 파일이 있으면 두개의 이미지가 생성 된다
 *  - 이때 두번째가 이미지가 로드 되면 첫번째 이미지는 opacity가 0이 되고 두번째 이미지는 opacity가 100이 된다
 * - 이 아이템을 클릭하면 링크가 이동하는지 테스트 한다.
 * - 스냅샷 테스트 알아보기
 */

describe('PostItem', () => {
  it('renders a heading', async () => {
    const paginatePosts = await getPaginatePosts({ page: 1, limit: 10 });
    const item = paginatePosts.items[0];

    render(<PostItem postItem={item as Post} />);

    const heading = screen.getByText('샘플 게시글1');
    expect(heading).toBeInTheDocument();

    const img = screen.getAllByRole('img');
    console.log('img', img);
  });
});
