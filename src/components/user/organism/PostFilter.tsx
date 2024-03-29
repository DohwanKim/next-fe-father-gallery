'use client';

import { useQueryState } from 'nuqs';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const PostFilter = () => {
  const [typeQuery, setTypeQuery] = useQueryState('type');

  return (
    <div data-testid={'post-filter'}>
      <ToggleGroup
        type="single"
        value={typeQuery ? typeQuery : 'ALL'}
        size="lg"
        className={'flex-wrap [&>button]:rounded-none'}
        onValueChange={async (value) => {
          await setTypeQuery(value === 'ALL' ? '' : value);
          scrollTo({ top: 0 });
        }}
      >
        <ToggleGroupItem value={'ALL'} aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="WATERCOLOR" aria-label="Toggle watercolor">
          Watercolor
        </ToggleGroupItem>
        <ToggleGroupItem value="ACRYLIC_PAINTING" aria-label="Toggle acrylic">
          Acrylic
        </ToggleGroupItem>
        <ToggleGroupItem value="OIL_PAINTING" aria-label="Toggle oil">
          Oil
        </ToggleGroupItem>
        <ToggleGroupItem value="PENCIL_DRAWING" aria-label="Toggle pencil">
          Pencil
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default PostFilter;
