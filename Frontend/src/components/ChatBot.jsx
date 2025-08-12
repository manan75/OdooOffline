import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, MapPin, Calendar } from 'lucide-react';

export default function TravelChatbot() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your travel planning assistant. Please tell me which city you'd like to visit and the date of your travel."
    }
  ]);

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSubmit = () => {
    // Guard clause to ensure all fields are filled
    if (!city || !date) {
      return;
    }

    // The value from an <input type="date"> is already in yyyy-mm-dd format.
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: `I want to visit ${city} on ${date}`
    };

    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      content: `Great choice! I'd be happy to help you plan your trip to ${city} on ${date}. Let me gather some recommendations for attractions, restaurants, and activities.`
    };

    setMessages(prev => [...prev, userMessage, botResponse]);

    // Clear form after submission
    setCity('');
    setDate('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-4 flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col" style={{height: '90vh'}}>
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg border-b border-sky-200 z-10">
          <div className="flex items-center p-6 bg-gradient-to-r from-sky-400 to-sky-600 rounded-t-2xl">
            <MessageCircle className="w-8 h-8 text-white mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-white">Travel Planning Assistant</h1>
              <p className="text-sky-100">Your personal trip planning companion</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white shadow-lg flex-grow overflow-y-auto">
          <div className="p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                 {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    B
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-sky-500 text-white rounded-br-none'
                      : 'bg-sky-50 text-gray-800 border border-sky-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                 {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-bold flex-shrink-0">
                    U
                  </div>
                )}
              </div>
            ))}
            {/* Empty div to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-b-2xl shadow-lg border-t border-sky-200 z-10">
          <div className="p-6">
            <div className="space-y-4">
              {/* City Input */}
              <div className="relative">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Which city would you like to visit?
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-sky-50"
                />
              </div>

              {/* Date Input */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-sky-50"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!city || !date}
                className="w-full bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5" />
                <span>Plan My Trip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};