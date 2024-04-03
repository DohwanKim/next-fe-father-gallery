import { fireEvent, render, waitFor } from '@testing-library/react';

import PostFilter from '@/components/user/organism/PostFilter';

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

const mockTypeQuery = jest.fn().mockReturnValue('');
const mockSetTypeQuery = jest.fn();

jest.mock('nuqs', () => {
  return {
    useQueryState: jest.fn(() => [mockTypeQuery, mockSetTypeQuery]),
  };
});

describe('PostFilter', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/gallery');
  });

  it('All 선택되어 랜더링 된다', () => {
    const { getByText } = render(<PostFilter />);

    expect(getByText('WaterColor').getAttribute('aria-label')).toBe(
      'Toggle watercolor',
    );
  });

  it('버튼을 누르면 쿼리값 변경 함수가 작동한다', async () => {
    window.scrollTo = jest.fn();
    const { getByText } = render(<PostFilter />);
    const watercolorButton = getByText('WaterColor');
    const acrylicButton = getByText('Acrylic');

    fireEvent.click(watercolorButton);

    mockTypeQuery.mockReturnValue('WATERCOLOR');
    await waitFor(() => {
      expect(mockSetTypeQuery).toHaveBeenCalledWith('WATERCOLOR');
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
    });

    fireEvent.click(acrylicButton);
    mockTypeQuery.mockReturnValue('');
    await waitFor(() => {
      expect(mockSetTypeQuery).toHaveBeenCalledWith('ACRYLIC_PAINTING');
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
    });
  });
});
