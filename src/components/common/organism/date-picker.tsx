'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateFormatter, useNavigation } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { numberPadding } from '@/utils/common';
import dayjs from '@/utils/dayjs';

interface Props {
  onChange: (date: Date | undefined) => void;
  value: Date;
}

const FormatCaption: DateFormatter = (month) => {
  const { goToDate } = useNavigation();
  const todayYear = Number(dayjs().format('YYYY'));
  const currentYear = Number(format(month, 'yyyy'));
  const currentMonth = Number(format(month, 'MM'));
  const years = Array.from({ length: 10 }, (_, index) => todayYear + 1 - index);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={'px-1 border hover:text-foreground/70 transition-colors'}
          >
            {currentYear}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {years.map((year) => (
              <DropdownMenuItem
                key={year}
                onClick={() => {
                  goToDate(new Date(Number(year), currentMonth - 1));
                }}
              >
                {year}년
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className={'mr-2'}>년</span>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={'px-1 border hover:text-foreground/70 transition-colors'}
          >
            {numberPadding(currentMonth, 2)}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {months.map((month) => (
              <DropdownMenuItem
                key={month}
                onClick={() => {
                  goToDate(new Date(Number(currentYear), month - 1));
                }}
              >
                {month}월
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span>월</span>
      </div>
    </>
  );
};

const DatePicker = ({ onChange, value }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'yyyy년 MM월dd일') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          formatters={{ formatCaption: FormatCaption }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
