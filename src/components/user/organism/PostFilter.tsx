'use client';

import { useQueryState } from 'nuqs';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ArtType } from '@/constants/post.enum';
import { artTypeToReadableText } from '@/utils/common';

const PostFilter = () => {
  const [typeQuery, setTypeQuery] = useQueryState('type');

  return (
    <div data-testid={'post-filter'} className={'container'}>
      <ToggleGroup
        type="single"
        value={typeQuery ? typeQuery : 'WATERCOLOR'}
        className={'flex-wrap [&>button]:rounded-none'}
        onValueChange={async (value) => {
          await setTypeQuery(value);
          scrollTo({ top: 0 });
        }}
      >
        <ToggleGroupItem value="WATERCOLOR" aria-label="Toggle watercolor">
          {artTypeToReadableText('WATERCOLOR' as ArtType)}
        </ToggleGroupItem>
        <ToggleGroupItem value="ACRYLIC_PAINTING" aria-label="Toggle acrylic">
          {artTypeToReadableText('ACRYLIC_PAINTING' as ArtType)}
        </ToggleGroupItem>
        <ToggleGroupItem value="OIL_PAINTING" aria-label="Toggle oil">
          {artTypeToReadableText('OIL_PAINTING' as ArtType)}
        </ToggleGroupItem>
        <ToggleGroupItem value="PENCIL_DRAWING" aria-label="Toggle pencil">
          {artTypeToReadableText('PENCIL_DRAWING' as ArtType)}
        </ToggleGroupItem>
        <ToggleGroupItem value="ETC" aria-label="Toggle etc">
          {artTypeToReadableText('NONE' as ArtType)}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default PostFilter;
