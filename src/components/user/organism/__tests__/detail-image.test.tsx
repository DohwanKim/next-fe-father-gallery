import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DetailImage from '@/components/user/organism/detail-image';
import { getPaginatePosts } from '@/service/posts';
import { Paginate } from '@/types/paginate.type';
import { Post } from '@/types/posts.type';

describe('DetailImage', () => {
  let paginatePosts: Paginate<Post>;

  beforeAll(async () => {
    paginatePosts = await getPaginatePosts({ page: 1, limit: 10 });
  });

  it('이미지 데이터를 받아서 랜더한다', async () => {
    const item = paginatePosts.items[0] as Post;
    const { findAllByRole } = render(
      <DetailImage imgId={item.img!.id} imgTitle={item.title} />,
    );
    const images = await findAllByRole('img');

    images.forEach((image) => {
      const src = image.getAttribute('src');
      expect(src).toBeTruthy();
    });
  });

  it('메인 이미지가 로드 되면, 메인 이미지는 보여지고 블러 이미지는 감춰진다', async () => {
    const item = paginatePosts.items[0] as Post;
    const imgTitle = item.title;
    render(<DetailImage imgId={item.img!.id} imgTitle={imgTitle} />);
    const blurImg = screen.getByAltText(`${imgTitle} blur image`);
    const mainImg = screen.getByAltText(`${imgTitle} image`);

    expect(blurImg).toHaveClass('opacity-100');
    expect(mainImg).toHaveClass('opacity-0');

    fireEvent.load(mainImg);
    await waitFor(async () => {
      expect(blurImg).toHaveClass('opacity-0');
      expect(mainImg).toHaveClass('opacity-100');
    });
  });

  describe('다이얼로그', () => {
    let item: Post;
    let dialogOpenButton: HTMLElement;
    let dialog: HTMLElement;

    beforeEach(() => {
      item = paginatePosts.items[0] as Post;
      render(<DetailImage imgId={item.img!.id} />);
      dialogOpenButton = screen.getByTestId('trigger');
    });

    it('트리거를 클릭하면 다이얼로그가 열린다', async () => {
      fireEvent.click(dialogOpenButton);

      dialog = screen.getByRole('dialog');

      expect(dialog).toBeInTheDocument();
    });

    it('다이얼로그의 원본 이미지가 로드 되기 전에는 로딩 스피너가 보이고 원본 이미지가 로드되면 로딩 스피너는 사라진다', async () => {
      fireEvent.click(dialogOpenButton);

      const loadingSpinner = screen.getByRole('status');
      const dialogImage = screen.getByRole('dialogImage');

      expect(loadingSpinner).toBeInTheDocument();

      fireEvent.load(dialogImage);
      await waitFor(async () => {
        expect(loadingSpinner).not.toBeInTheDocument();
      });
    });
    it('다이얼로그의 닫기 버튼을 클릭하면 다이얼로그가 닫힌다', async () => {
      fireEvent.click(dialogOpenButton);

      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      await waitFor(async () => {
        expect(dialog).not.toBeInTheDocument();
      });
    });
  });
});
