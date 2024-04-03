import { render, screen } from '@testing-library/react';

import HeaderNav, { navItems } from '@/components/user/organism/HeaderNav';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe('HeaderNav', () => {
  it('"navItems"에 정의된 항목들이 랜더된다', () => {
    mockUsePathname.mockReturnValue('/');
    render(<HeaderNav />);

    navItems.forEach((item) => {
      const link = screen.getByText(item.name);
      const linkHref = link.getAttribute('href')!;

      expect(link).toBeInTheDocument();
      expect(linkHref.includes(item.href)).toBe(true);
    });
  });

  it('현재 경로에 해당하는 항목은 활성화된다', () => {
    mockUsePathname.mockReturnValue('/gallery');
    render(<HeaderNav />);

    navItems.forEach((item) => {
      const link = screen.getByText(item.name);

      if (item.href !== '/gallery') {
        expect(link).toHaveClass('text-foreground/60');
      }
    });
  });

  it('프롭스로 함수를 전달 할 경우 링크 클릭 시 함수가 호출 된다.', () => {
    mockUsePathname.mockReturnValue('/');
    const onClickNav = jest.fn();
    render(<HeaderNav onClickNav={onClickNav} />);
    const link = screen.getByText(navItems[0].name);

    link.click();
    expect(onClickNav).toHaveBeenCalled();
  });
});
