import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import UserHeader from '@/components/user/organism/UserHeader';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe('UserHeader', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('"UserHeader"가 표시 된다', async () => {
    const { container } = render(<UserHeader />);
    const header = container.querySelector('header');

    expect(header).toBeInTheDocument();
  });

  it('스크롤 Y값, 122 미만에선 스크롤해도 "UserHeader"가 보인다', async () => {
    const { container } = render(<UserHeader />);
    const header = container.querySelector('header');

    act(() => {
      fireEvent.scroll(window, {
        target: { scrollY: 100 },
      });
    });

    await waitFor(() => {
      expect(header).toHaveClass('translate-y-0');
    });
  });

  it('스크롤이 122 이상 내려가면 "UserHeader"가 숨겨진다', async () => {
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
});
