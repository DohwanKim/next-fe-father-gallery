import { render, screen } from '@testing-library/react';

import PostItem from '@/components/user/organism/PostItem';
import { Post } from '@/types/posts.type';

describe('PostItem', () => {
  const item = {
    id: 25,
    createAt: new Date('2024-02-21T11:32:53.093Z'),
    updateAt: new Date('2024-03-05T06:16:39.649Z'),
    version: 7,
    title: '샘플 게시글1',
    drawingDate: new Date('2024-03-05T06:16:39.649Z'),
    artType: 'WATERCOLOR',
    canvasSize: '61x45cm',
    price: 10000,
    isSold: true,
    frameType: 'Paper',
    contents: '이쁜 그림을 그려보았습니다.',
    tags: [],
    img: {
      uid: 25,
      id: 'f0a8866e-2b9a-4329-ba01-0ae7fc210b00',
      filename: 'KakaoTalk_20240105_194605293-crop-crop.jpg',
      metadata: null,
      uploaded: '2024-02-21T11:32:52.918Z',
      requireSignedURLs: false,
      variants: [
        'https://imagedelivery.net/MXlZJaCYonU_kO5E66JLvw/f0a8866e-2b9a-4329-ba01-0ae7fc210b00/public',
        'https://imagedelivery.net/MXlZJaCYonU_kO5E66JLvw/f0a8866e-2b9a-4329-ba01-0ae7fc210b00/adminPost',
        'https://imagedelivery.net/MXlZJaCYonU_kO5E66JLvw/f0a8866e-2b9a-4329-ba01-0ae7fc210b00/origin',
      ],
    },
  };

  it('renders a heading', () => {
    render(<PostItem postItem={item as Post} />);

    const heading = screen.getByText('샘플 게시글1');
    expect(heading).toBeInTheDocument();

    /**
     * 테스트 시나리오
     * - 데이터를 받아온다. (이부분 MSW 사용해서 해결 할 수 있는지 알아보기)
     * - 데이터의 아이디를 받아 디테일 페이지로 가는 링크가 생성 된다
     * - 이미지 파일이 있으면 두개의 이미지가 생성 된다
     *  - 이때 두번째가 이미지가 로드 되면 첫번째 이미지는 opacity가 0이 되고 두번째 이미지는 opacity가 100이 된다
     * - 이 아이템을 클릭하면 링크가 이동하는지 테스트 한다.
     * - 스냅샷 테스트 알아보기
     */

    const img = screen.getAllByRole('img');
    console.log('img', img[0]);
  });
});
