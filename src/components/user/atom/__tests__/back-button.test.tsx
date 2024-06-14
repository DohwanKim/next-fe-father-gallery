import { fireEvent, render } from '@testing-library/react';

import BackButton from '@/components/user/atom/back-button';

describe('BackButton', () => {
  it('BackButton 스냅샷 일치', () => {
    const { container } = render(<BackButton />);
    expect(container).toMatchSnapshot();
  });

  it('클릭하면 히스토리 백이 일어난다', () => {
    const back = jest.spyOn(window.history, 'back');
    const { getByRole } = render(<BackButton />);
    const button = getByRole('button');

    fireEvent.click(button);
    expect(back).toHaveBeenCalled();
  });
});
