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

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', item.href);
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
});
