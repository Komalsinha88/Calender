import React from 'react';
import { Event } from '../types';
import { formatEventTime } from '../utils/dateUtils';
import { Clock, AlertCircle } from 'lucide-react';

interface EventItemProps {
  event: Event;
  hasConflicts: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ event, hasConflicts }) => {
  // Category-based styles
  const categoryStyles = {
    work: 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200',
    personal: 'bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200',
    meeting: 'bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200',
    other: 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
  };
  
  return (
    <div 
      className={`group relative text-xs rounded-md px-2 py-1.5 
        transition-all duration-200 hover:shadow-md cursor-pointer
        ${categoryStyles[event.category]} 
        ${hasConflicts ? 'border-l-4 border-red-500' : ''}`}
    >
      <div className="flex items-start gap-1">
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{event.title}</p>
          <div className="flex items-center gap-1 mt-0.5 text-[10px] opacity-80">
            <Clock className="w-3 h-3" />
            <span>{formatEventTime(event.startTime, event.endTime)}</span>
          </div>
        </div>
        {hasConflicts && (
          <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute invisible group-hover:visible z-10 w-64 bg-white 
        p-2 rounded-lg shadow-lg border border-gray-200 text-xs left-full ml-2 
        top-0 transition-opacity duration-200">
        <p className="font-semibold text-gray-900">{event.title}</p>
        <p className="text-gray-600 mt-1">
          {formatEventTime(event.startTime, event.endTime)}
        </p>
        {event.description && (
          <p className="text-gray-600 mt-1 border-t border-gray-100 pt-1">
            {event.description}
          </p>
        )}
        {hasConflicts && (
          <div className="flex items-center gap-1 mt-1 text-red-500 border-t border-gray-100 pt-1">
            <AlertCircle className="w-3 h-3" />
            <span>Time conflict with another event</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventItem;