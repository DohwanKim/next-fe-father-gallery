import { Home, Mail, Phone } from 'lucide-react';

import dayjs from '@/utils/dayjs';

const UserFooter = () => {
  return (
    <footer className={'border-t'}>
      <div
        className={
          'flex container text-xs justify-between h-[60px] gap-y-2 items-center flex-wrap py-4 text-foreground/60'
        }
      >
        <div className={'flex gap-x-5 gap-y-2 mr-5 flex-wrap'}>
          <address className={'flex not-italic gap-1 items-center'}>
            <Home className={'h-[1rem] w-[1rem] transition-all'} />
            Sarim Street, ChangWon City, South Korea
          </address>
          <a
            href={'tel:+82 10 3831 5338'}
            className={'flex gap-1 items-center'}
          >
            <Phone className={'h-[1rem] w-[1rem] transition-all'} />
            010-3831-5338
          </a>
          <a
            href={'mailto:kreator2006@naver.com'}
            className={'flex gap-1 items-center'}
          >
            <Mail className={'h-[1rem] w-[1rem] transition-all'} />
            kreator2006@naver.com
          </a>
        </div>
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
