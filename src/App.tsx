import React from 'react';
import Calendar from './components/Calendar';
import { events } from './data/events';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calendar App</h1>
          <p className="text-gray-600 mt-2">A beautiful and functional calendar interface</p>
        </header>
        
        <Calendar events={events} />
      </div>
    </div>
  );
}

export default App;