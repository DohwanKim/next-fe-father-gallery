import { fireEvent, render, waitFor } from '@testing-library/react';

import PostFilter from '@/components/user/organism/PostFilter';
import { ArtType } from '@/constants/post.enum';

describe('PostFilter', () => {
  beforeEach(() => {});

  it('All 선택되어 랜더링 된다', () => {
    const { getByText } = render(
      <PostFilter value={undefined} onValueChange={() => {}} />,
    );

    expect(getByText('All').getAttribute('aria-label')).toBe('Toggle all');
  });

  it('버튼을 누르면 값이 변경된다', async () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <PostFilter value={'OIL_PAINTING' as ArtType} onValueChange={onChange} />,
    );
    const watercolorButton = getByText('Watercolor');
    const allButton = getByText('All');

    window.scrollTo = jest.fn();
    fireEvent.click(watercolorButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('WATERCOLOR' as ArtType);
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
    });

    fireEvent.click(allButton);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(undefined);
    });
  });
});
