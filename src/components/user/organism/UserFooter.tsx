import dayjs from '@/utils/dayjs';

const UserFooter = () => {
  return (
    <footer className={'border-t'} data-testid="footer">
      <div
        className={
          'flex container text-xs justify-between min-h-[60px] gap-y-2 items-center flex-wrap py-4 text-foreground/60'
        }
      >
        <div>
          <p>
            @Copyright {dayjs().format('YYYY')}. DongCheol Kim. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
