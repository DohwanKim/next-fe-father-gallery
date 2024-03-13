'use client';
import { useEffect, useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ArtType } from '@/constants/post.enum';
import useLayoutStore from '@/store/layout';

interface Props {
  value: ArtType | undefined;
  onValueChange: (value: ArtType | undefined) => void;
}

const PostFilter = ({ value, onValueChange }: Props) => {
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const setIsHeaderHideByScroll = useLayoutStore(
    (state) => state.setIsHeaderHideByScroll,
  );

  useEffect(() => {
    setIsShowFilter(true);
  }, []);

  return (
    <div
      className={`fixed w-full md:w-auto bottom-0 md:bottom-[60px] left-1/2 p-3 border z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transform -translate-x-1/2 transition-transform duration-500 ${
        !isShowFilter ? 'translate-y-[300px]' : 'translate-y-0'
      }`}
    >
      <ToggleGroup
        type="single"
        value={value ? value : 'ALL'}
        size="lg"
        className={'flex-wrap [&>button]:rounded-none'}
        onValueChange={(value) => {
          scrollTo({ top: 0 });
          setTimeout(() => {
            setIsHeaderHideByScroll(false);
            onValueChange(value === 'ALL' ? undefined : (value as ArtType));
          }, 100);
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
