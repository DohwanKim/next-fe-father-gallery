import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ArtType } from '@/constants/post.enum';

interface Props {
  value: ArtType | undefined;
  onValueChange: (value: ArtType | undefined) => void;
}

const PostFilter = ({ value, onValueChange }: Props) => {
  return (
    <ToggleGroup
      type="single"
      value={value ? value : 'ALL'}
      size="lg"
      className={'flex-wrap'}
      onValueChange={(value) => {
        onValueChange(value === 'ALL' ? undefined : (value as ArtType));
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
      <ToggleGroupItem value="ACRYLIC_PAINTING" aria-label="Toggle 아크릴화">
        아크릴화
      </ToggleGroupItem>
      <ToggleGroupItem value="OIL_PAINTING" aria-label="Toggle 유화">
        유화
      </ToggleGroupItem>
      <ToggleGroupItem value="NONE" aria-label="Toggle 기타">
        기타
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default PostFilter;
