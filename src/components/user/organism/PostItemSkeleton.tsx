import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  isShowSubTitle?: boolean;
}

export const PostItemSkeleton = ({ isShowSubTitle }: Props) => {
  return Array.from({ length: 9 }, (_, index) => (
    <div key={index} data-testid={`skeleton-${index}`}>
      <Skeleton className="w-full aspect-square drop-shadow mb-5" />
      <div className={'flex flex-col items-center'}>
        <Skeleton className="h-4 w-[200px]" />
        {isShowSubTitle && <Skeleton className="h-4 w-[100px] mt-2" />}
      </div>
    </div>
  ));
};

export default PostItemSkeleton;
