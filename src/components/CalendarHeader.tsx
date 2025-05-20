import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-800">
        {format(currentDate, 'MMMM yyyy')}
      </h1>
      <div className="flex space-x-2">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => {
            const today = new Date();
            // Only update if we're not already showing the current month
            if (format(currentDate, 'yyyy-MM') !== format(today, 'yyyy-MM')) {
              // This will trigger a re-render with today's date
              document.dispatchEvent(new CustomEvent('set-current-month', { detail: today }));
            }
          }}
          className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200"
        >
          Today
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;