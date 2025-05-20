import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
} from 'date-fns';
import { CalendarDay, Event } from '../types';

export const getDaysForMonth = (date: Date, events: Event[]): CalendarDay[] => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
  
  const today = new Date();
  const currentMonth = date;
  
  const days = eachDayOfInterval({ start, end }).map((day) => {
    // Get events for this day
    const dayEvents = events.filter((event) => 
      isSameDay(parseISO(event.date), day)
    );
    
    return {
      date: day,
      isCurrentMonth: isSameMonth(day, currentMonth),
      isToday: isSameDay(day, today),
      events: dayEvents
    };
  });
  
  return days;
};

export const formatEventTime = (startTime: string, endTime: string): string => {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12}:${minutes} ${period}`;
};

export const hasTimeConflict = (event1: Event, event2: Event): boolean => {
  // Convert times to minutes for easier comparison
  const event1Start = timeToMinutes(event1.startTime);
  const event1End = timeToMinutes(event1.endTime);
  const event2Start = timeToMinutes(event2.startTime);
  const event2End = timeToMinutes(event2.endTime);
  
  // Check if the events overlap
  return (
    (event1Start < event2End && event1End > event2Start) ||
    (event2Start < event1End && event2End > event1Start)
  );
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};