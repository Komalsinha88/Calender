import React from 'react';
import { format } from 'date-fns';
import { CalendarDay } from '../types';
import EventItem from './EventItem';

interface CalendarGridProps {
  days: CalendarDay[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days }) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Day names header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {dayNames.map((day) => (
          <div 
            key={day} 
            className="py-2 text-center text-sm font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 min-h-[600px]">
        {days.map((day, i) => (
          <div 
            key={i}
            className={`min-h-[120px] border-b border-r border-gray-200 p-2 
              ${!day.isCurrentMonth ? 'bg-gray-50' : ''} 
              transition-colors duration-200 hover:bg-gray-50`}
          >
            <div className="h-full flex flex-col">
              {/* Date number */}
              <div className="flex items-center justify-center mb-2">
                <span 
                  className={`flex items-center justify-center h-7 w-7 text-sm 
                    font-medium rounded-full transition-colors duration-200
                    ${day.isToday 
                      ? 'bg-blue-600 text-white' 
                      : day.isCurrentMonth 
                        ? 'text-gray-900 hover:bg-gray-100' 
                        : 'text-gray-400'
                    }`}
                >
                  {format(day.date, 'd')}
                </span>
              </div>
              
              {/* Events */}
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {day.events.map((event) => (
                  <EventItem 
                    key={event.id} 
                    event={event} 
                    hasConflicts={day.events.some(
                      e => e.id !== event.id && e.date === event.date && 
                      ((e.startTime >= event.startTime && e.startTime < event.endTime) || 
                       (e.endTime > event.startTime && e.endTime <= event.endTime))
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;