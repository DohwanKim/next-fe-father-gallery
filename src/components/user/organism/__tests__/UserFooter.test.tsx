import { render } from '@testing-library/react';

import UserFooter from '@/components/user/organism/UserFooter';

describe('UserFooter', () => {
  it('UserFooter 스냅샷 일치', () => {
    const { container } = render(<UserFooter />);
    expect(container).toMatchSnapshot();
  });
});
