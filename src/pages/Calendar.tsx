import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, date: new Date(2023, 4, 15), title: 'Consulta con Ginecóloga', time: '10:00 AM' },
    { id: 2, date: new Date(2023, 4, 17), title: 'Clase de Yoga', time: '6:00 PM' },
    { id: 3, date: new Date(2023, 4, 20), title: 'Charla sobre Nutrición', time: '3:00 PM' },
  ]);

  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time) {
      setEvents([...events, { id: events.length + 1, date: selectedDate, ...newEvent }]);
      setNewEvent({ title: '', time: '' });
      setShowAddEvent(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Tu Calendario de Bienestar</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Aquí iría el componente de calendario. Por simplicidad, mostraremos un placeholder */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`p-2 text-center cursor-pointer rounded ${
                  day === selectedDate.getDate() ? 'bg-purple-600 text-white' : 'hover:bg-purple-100'
                }`}
                onClick={() => handleDateClick(new Date(2023, 4, day))}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Eventos del día</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {events
            .filter((event) => event.date.toDateString() === selectedDate.toDateString())
            .map((event) => (
              <div key={event.id} className="mb-4 last:mb-0">
                <div className="flex items-center">
                  <CalendarIcon className="text-purple-600 mr-2" size={20} />
                  <span className="font-semibold">{event.title}</span>
                </div>
                <p className="text-gray-600 ml-7">{event.time}</p>
              </div>
            ))}
          
          {!showAddEvent && (
            <button
              onClick={() => setShowAddEvent(true)}
              className="mt-4 flex items-center text-purple-600 hover:text-purple-800"
            >
              <Plus size={20} className="mr-1" /> Agregar evento
            </button>
          )}
          
          {showAddEvent && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Título del evento"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full p-2 mb-2 border rounded"
              />
              <button
                onClick={handleAddEvent}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
              >
                Agregar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;