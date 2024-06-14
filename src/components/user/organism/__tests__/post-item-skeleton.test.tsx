import { render } from '@testing-library/react';

import PostItemSkeleton from '@/components/user/organism/post-item-skeleton';

describe('PostItemSkeleton', () => {
  it('PostItemSkeleton 스냅샷 일치', () => {
    const { container } = render(<PostItemSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
