import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Edit2, Clock, MapPin, Users } from 'lucide-react';

// Utility function to check if two dates are the same day
const isSameDay = (d1, d2) => d1.getFullYear() === d2.getFullYear() &&
                                d1.getMonth() === d2.getMonth() &&
                                d1.getDate() === d2.getDate();

const Calendar = () => {
  // Use the current date as the initial state
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);
  
  // A helper function to format a Date object into a 'YYYY-MM-DD' string
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Example events, now with travel-related content
  const [events, setEvents] = useState([
    { id: 1, title: 'Visit local museum', date: formatDate(new Date()), time: '09:00', duration: 120, color: 'bg-blue-200', participants: ['👤', '👤'] },
    { id: 2, title: 'Try new cafe', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 1))), time: '10:00', duration: 90, color: 'bg-purple-200', participants: ['�'] },
    { id: 3, title: 'Go on a street food tour', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 2))), time: '08:00', duration: 60, color: 'bg-purple-300', participants: ['👤'] },
    { id: 4, title: 'Morning hike', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 3))), time: '09:00', duration: 180, color: 'bg-green-200', participants: ['👤', '👤', '👤'] },
    { id: 5, title: 'Souvenir shopping', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 5))), time: '10:00', duration: 120, color: 'bg-blue-300', participants: ['👤', '👤'] },
    { id: 6, title: 'Visit historic site', date: formatDate(new Date()), time: '14:00', duration: 150, color: 'bg-yellow-200', participants: ['👤'] },
    { id: 7, title: 'Relax at the beach', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 1))), time: '16:00', duration: 90, color: 'bg-indigo-200', participants: ['👤', '👤'] },
    { id: 8, title: 'Explore local market', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 2))), time: '11:00', duration: 120, color: 'bg-teal-200', participants: ['👤', '👤'] },
    { id: 9, title: 'Try local dishes', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 2))), time: '15:00', duration: 90, color: 'bg-purple-300', participants: ['👤', '👤', '👤'] },
    { id: 10, title: 'Attend a concert', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 3))), time: '13:00', duration: 60, color: 'bg-orange-200', participants: ['👤'] },
    { id: 11, title: 'Cycling tour', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 4))), time: '14:00', duration: 90, color: 'bg-teal-300', participants: ['👤', '👤'] },
    { id: 12, title: 'Day trip to nearby town', date: formatDate(new Date(new Date().setDate(new Date().getDate() + 5))), time: '15:00', duration: 120, color: 'bg-green-300', participants: ['👤'] }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '09:00',
    duration: 60,
    color: 'bg-blue-200',
    participants: ['👤']
  });
  
  // Helper functions for calendar navigation
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  };
  
  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  // Generate the dates for the current week based on the currentDate state
  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    // Adjust to get to the first day of the week (Monday)
    const diff = startOfWeek.getDate() - (day === 0 ? 6 : day - 1);
    startOfWeek.setDate(diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      weekDates.push(currentDay);
    }
    return weekDates;
  };
  
  // Generate the dates for the month view in the sidebar
  const getMonthDates = () => {
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    // Get the first day of the week for the first day of the month (Monday = 0, Sunday = 6)
    const firstDay = startOfMonth.getDay();
    // Days to show from the previous month
    const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;
    
    const calendarDays = [];
    let day = new Date(startOfMonth);
    day.setDate(startOfMonth.getDate() - prevMonthDays);

    // Loop to generate 6 weeks (42 days) for the calendar grid
    for (let i = 0; i < 42; i++) {
      calendarDays.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    return calendarDays;
  };

  const weekDates = getWeekDates();
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const getEventPosition = (event) => {
    const [hours, minutes] = event.time.split(':').map(Number);
    const startMinutes = (hours - 8) * 60 + minutes;
    const top = (startMinutes / 60) * 60; // 60px per hour
    const height = (event.duration / 60) * 60;
    return { top, height };
  };

  const handleAddEvent = (date = null) => {
    const eventDate = date ? formatDate(date) : formatDate(selectedDate);
    setNewEvent({
      ...newEvent,
      date: eventDate
    });
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      duration: event.duration,
      color: event.color,
      participants: [...event.participants]
    });
    setEditingEvent(event.id);
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.title.trim()) return;

    const eventData = {
      ...newEvent,
      id: editingEvent || Date.now(),
    };

    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent ? eventData : event
      ));
    } else {
      setEvents([...events, eventData]);
    }

    setShowEventModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '09:00',
      duration: 60,
      color: 'bg-blue-200',
      participants: ['👤']
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventModal(false);
  };

  const handleDragStart = (e, event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, date, hour) => {
    e.preventDefault();
    if (!draggedEvent) return;

    const newTime = `${hour.toString().padStart(2, '0')}:00`;
    const updatedEvent = {
      ...draggedEvent,
      date: formatDate(date),
      time: newTime
    };

    setEvents(events.map(event => 
      event.id === draggedEvent.id ? updatedEvent : event
    ));
    setDraggedEvent(null);
  };

  const colorOptions = [
    'bg-blue-200', 'bg-purple-200', 'bg-green-200', 'bg-yellow-200',
    'bg-pink-200', 'bg-indigo-200', 'bg-teal-200', 'bg-orange-200'
  ];

  const today = new Date();
  
  return (
    <div className="flex h-screen bg-blue-200 text-black">
      {/* Sidebar */}
      <div className="w-80 bg-blue-150 p-4 flex flex-col">
        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {/* Dynamic month and year display */}
            <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-700 rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-semibold">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={handleNextMonth} className="p-1 hover:bg-gray-700 rounded-full">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-xs text-gray-900 mb-2">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
              <div key={day} className="text-center p-1">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {/* Dynamic calendar grid generation */}
            {getMonthDates().map((date, i) => {
              const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
              const isToday = isSameDay(date, today);
              
              return (
                <button
                  key={i}
                  className={`
                    p-1 text-xs rounded transition-colors
                    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${isToday ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}
                  `}
                  onClick={() => {
                    setSelectedDate(date);
                    setCurrentDate(date); // Sync main calendar with sidebar selection
                  }}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Calendar */}
      <div className="flex-1 bg-yellow-50 text-gray-900">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevWeek}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextWeek}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                {/* Dynamic month and year display */}
                <h1 className="text-xl font-semibold">
                  {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h1>
                <button onClick={handleToday} className="bg-gray-800 text-white px-2 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                  Today
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-3 py-1 rounded text-sm ${view === 'month' ? 'bg-white shadow' : ''}`}
                  onClick={() => setView('month')}
                >
                  Month
                </button>
                <button
                  className={`px-3 py-1 rounded text-sm ${view === 'week' ? 'bg-white shadow' : ''}`}
                  onClick={() => setView('week')}
                >
                  Week
                </button>
                <button
                  className={`px-3 py-1 rounded text-sm ${view === 'day' ? 'bg-white shadow' : ''}`}
                  onClick={() => setView('day')}
                >
                  Day
                </button>
              </div>
              <button
                onClick={() => handleAddEvent()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Week View */}
        <div className="flex-1 overflow-auto">
          <div className="flex">
            {/* Time column */}
            <div className="w-16 border-r border-gray-200">
              <div className="h-16 border-b border-gray-200"></div>
              {hours.map(hour => (
                <div key={hour} className="h-16 border-b border-gray-200 px-2 py-1 text-xs text-gray-500">
                  {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                </div>
              ))}
            </div>

            {/* Days columns */}
            <div className="flex-1">
              {/* Header with dates */}
              <div className="flex border-b border-gray-200 bg-white">
                {weekDates.map((date, index) => {
                  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                  const isToday = isSameDay(date, today);
                  
                  return (
                    <div key={index} className="flex-1 h-16 border-r border-gray-200 p-2 text-center">
                      <div className="text-xs text-gray-500 mb-1">{dayNames[date.getDay()]}</div>
                      <div className={`text-lg font-medium ${isToday ? 'bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' : ''}`}>
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time slots */}
              <div className="flex">
                {weekDates.map((date, dayIndex) => (
                  <div key={dayIndex} className="flex-1 border-r border-gray-200 relative">
                    {hours.map(hour => (
                      <div
                        key={hour}
                        className="h-16 border-b border-gray-200 hover:bg-blue-50 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, date, hour)}
                        onClick={() => {
                          const clickTime = `${hour.toString().padStart(2, '0')}:00`;
                          setNewEvent({
                            ...newEvent,
                            date: formatDate(date),
                            time: clickTime
                          });
                          handleAddEvent(date);
                        }}
                      ></div>
                    ))}

                    {/* Events */}
                    {getEventsForDate(date).map(event => {
                      const { top, height } = getEventPosition(event);
                      return (
                        <div
                          key={event.id}
                          className={`absolute left-1 right-1 ${event.color} rounded-lg p-2 border border-opacity-50 border-gray-400 cursor-pointer shadow-sm hover:shadow-md transition-shadow`}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            minHeight: '40px'
                          }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, event)}
                          onClick={() => handleEditEvent(event)}
                        >
                          <div className="text-xs font-medium truncate">{event.title}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {event.time} • {event.duration}m
                          </div>
                          <div className="flex items-center mt-1 space-x-1">
                            {event.participants.slice(0, 3).map((participant, i) => (
                              <div key={i} className="w-4 h-4 bg-gray-300 rounded-full text-xs flex items-center justify-center">
                                {participant}
                              </div>
                            ))}
                            {event.participants.length > 3 && (
                              <span className="text-xs text-gray-500">+{event.participants.length - 3}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({...newEvent, duration: parseInt(e.target.value) || 60})}
                  min="15"
                  step="15"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <div className="flex space-x-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 ${color} rounded border-2 ${newEvent.color === color ? 'border-gray-800' : 'border-transparent'}`}
                      onClick={() => setNewEvent({...newEvent, color})}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              {editingEvent && (
                <button
                  onClick={() => handleDeleteEvent(editingEvent)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              )}
              <div className="flex space-x-2 ml-auto">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {editingEvent ? 'Update' : 'Add'} Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;