import { render } from '@testing-library/react';

import SocialLinks from '@/components/user/organism/SocialLinks';

describe('SocialLinks', () => {
  it('SocialLinks 스냅샷 일치', () => {
    const { container } = render(<SocialLinks />);
    expect(container).toMatchSnapshot();
  });

  it('"isGray"가 "true" 일때 링크에 관련 클래스가 적용된다', () => {
    const { getAllByRole } = render(<SocialLinks isGray={true} />);

    getAllByRole('link').forEach((link) => {
      expect(link).toHaveClass(
        'grayscale hover:grayscale-0 transition-grayscale',
      );
    });
  });
});
