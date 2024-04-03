import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import UserHeader from '@/components/user/organism/UserHeader';

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname() {
      return mockUsePathname();
    },
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({ get: () => {} }),
    useServerInsertedHTML: jest.fn(),
  };
});

describe('UserHeader', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('"UserHeader"가 표시 된다', async () => {
    const { container } = render(<UserHeader />);
    const header = container.querySelector('header');

    expect(header).toBeInTheDocument();
  });

  it('스크롤이 지정된 고정값 미만에선 스크롤해도 "UserHeader"가 보인다', async () => {
    const { container } = render(<UserHeader />);
    const header = container.querySelector('header');

    act(() => {
      fireEvent.scroll(window, {
        target: { scrollY: 40 },
      });
    });

    await waitFor(() => {
      expect(header).toHaveClass('translate-y-0');
    });
  });

  it('스크롤이 지정된 고정값 이상 내려가면 "UserHeader"가 숨겨진다', async () => {
    const { container } = render(<UserHeader />);
    const header = container.querySelector('header');

    act(() => {
      fireEvent.scroll(window, {
        target: { scrollY: 200 },
      });
    });

    await waitFor(() => {
      expect(header).toHaveClass('translate-y-[-100%]');
    });
  });

  it('갤러리 페이지로 이동하면 서브 메뉴가 나온다', async () => {
    mockUsePathname.mockReturnValue('/gallery');

    const { findByTestId } = render(<UserHeader />);
    const subMenu = await findByTestId('sub-menu');

    expect(subMenu).toBeInTheDocument();
  });

  it.todo('햄버거 버튼 클릭 시 메뉴가 열린다');
});
