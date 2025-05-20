import React, { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Event } from '../types';
import { getDaysForMonth } from '../utils/dateUtils';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState(getDaysForMonth(currentDate, events));
  
  useEffect(() => {
    // Update calendar days when the current date changes
    setCalendarDays(getDaysForMonth(currentDate, events));
    
    // Set up event listener for the "Today" button's custom event
    const handleSetCurrentMonth = (e: CustomEvent) => {
      setCurrentDate(e.detail);
    };
    
    document.addEventListener('set-current-month', handleSetCurrentMonth as EventListener);
    
    return () => {
      document.removeEventListener('set-current-month', handleSetCurrentMonth as EventListener);
    };
  }, [currentDate, events]);
  
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />
      <CalendarGrid days={calendarDays} />
    </div>
  );
};

export default Calendar;