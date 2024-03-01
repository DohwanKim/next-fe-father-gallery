'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateFormatter } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
  onChange: (date: Date | undefined) => void;
  value: Date;
}

const formatCaption: DateFormatter = (month, options) => {
  return <>{format(month, 'yyyy년 MM월', { locale: options?.locale })}</>;
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
          formatters={{ formatCaption }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
