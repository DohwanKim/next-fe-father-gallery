import { Skeleton } from '@/components/ui/skeleton';

export const PostItemSkeleton = () => {
  return Array.from({ length: 9 }, (_, index) => (
    <div key={index}>
      <Skeleton className="w-full aspect-square drop-shadow mb-5" />
      <div className={'flex flex-col items-center'}>
        <Skeleton className="h-4 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ));
};

export default PostItemSkeleton;
