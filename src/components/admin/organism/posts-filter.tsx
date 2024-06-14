'use client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ArtType } from '@/constants/post.enum';

type Filter = {
  type: ArtType | 'ALL';
  keyword: string;
};

interface Props {
  onFilterChange: (value: { type: ArtType | 'ALL'; keyword: string }) => void;
}

const initialFilterData: Filter = {
  type: 'ALL',
  keyword: '',
};

const PostsFilter = ({ onFilterChange }: Props) => {
  const [filterData, setFilterData] = useState<Filter>(initialFilterData);

  return (
    <div className={'py-2 px-4 mb-5 border rounded'}>
      <div className={'flex mb-3'}>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={() => {
            setFilterData(initialFilterData);
            onFilterChange(initialFilterData);
          }}
        >
          필터 리셋
        </Button>
      </div>
      <div className={'flex justify-between'}>
        <div className={'flex items-center w-1/2'}>
          <p className={'mr-4 font-bold'}>타입</p>
          <ToggleGroup
            type="single"
            value={filterData.type}
            size="lg"
            className={'justify-start flex-wrap'}
            onValueChange={(value: ArtType | 'ALL') => {
              const updatedValue = { ...filterData, type: value || 'ALL' };
              setFilterData(updatedValue);
              onFilterChange(updatedValue);
            }}
          >
            <ToggleGroupItem value={'ALL'} aria-label="Toggle 전체">
              전체
            </ToggleGroupItem>
            <ToggleGroupItem value="PENCIL_DRAWING" aria-label="Toggle 연필화">
              연필화
            </ToggleGroupItem>
            <ToggleGroupItem value="WATERCOLOR" aria-label="Toggle 수채화">
              수채화
            </ToggleGroupItem>
            <ToggleGroupItem
              value="ACRYLIC_PAINTING"
              aria-label="Toggle 아크릴화"
            >
              아크릴화
            </ToggleGroupItem>
            <ToggleGroupItem value="OIL_PAINTING" aria-label="Toggle 유화">
              유화
            </ToggleGroupItem>
            <ToggleGroupItem value="NONE" aria-label="Toggle 기타">
              기타
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className={'flex w-1/2 gap-2 min-w-0 items-center'}>
          <p className={'w-[53px] font-bold'}>검색어</p>
          <Input
            value={filterData.keyword || ''}
            type={'text'}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                onFilterChange(filterData);
              }
            }}
            onChange={(e) => {
              setFilterData({ ...filterData, keyword: e.target.value });
            }}
          />
          <Button
            onClick={() => {
              onFilterChange(filterData);
            }}
          >
            검색
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostsFilter;
