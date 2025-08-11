import { useState } from "react";
import {
  MapPin,
  Plane,
  Calendar,
  Settings,
  TrendingUp,
  Search,
  ChevronDown,
  MoreVertical,
  Bell,
  User,
  Shield,
  Palette,
  Key,
  HelpCircle,
  LogOut,
  Edit3,
  Car,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Card Component
function Card({ image, destination, date, type, rating, status }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 relative shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="text-4xl mb-4 text-center">{image}</div>
      <div className="text-center">
        {destination && <h4 className="font-semibold mb-2 text-gray-800">{destination}</h4>}
        {date && <p className="text-sm text-gray-600 mb-2">{date}</p>}
        {type && <p className="text-xs text-gray-500 mb-2">{type}</p>}
        {rating && <p className="text-yellow-500 mb-4">{rating}</p>}
        {status && <p className="text-blue-600 mb-4 text-sm font-medium">{status}</p>}
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

export default function TravelDashboard() {
  const [selectedDate, setSelectedDate] = useState('Aug 2024');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Alex Johnson');
  const [userCity, setUserCity] = useState('San Francisco');
  const [userCountry, setUserCountry] = useState('CA');
  const [userDescription, setUserDescription] = useState('Travel enthusiast with a passion for exploring new cultures and discovering hidden gems around the world. Always planning the next adventure!');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const sidebarItems = [
    { icon: MapPin, label: 'Dashboard', key: 'Dashboard' },
    { icon: Plane, label: 'My Trips', key: 'Trips' },
    { icon: Calendar, label: 'Itinerary', key: 'Itinerary' },
    { icon: Settings, label: 'Settings', key: 'Settings' },
  ];

  const prePlannedTrips = [
    { 
      destination: 'Paris, France', 
      date: 'Dec 15-22, 2024', 
      type: 'Cultural',
      image: '🗼',
      status: 'Confirmed'
    },
    { 
      destination: 'Tokyo, Japan', 
      date: 'Jan 10-20, 2025', 
      type: 'Adventure',
      image: '🗾',
      status: 'Planning'
    },
    { 
      destination: 'Bali, Indonesia', 
      date: 'Mar 5-15, 2025', 
      type: 'Relaxation',
      image: '🏝️',
      status: 'Wishlist'
    }
  ];

  const previousTrips = [
    { 
      destination: 'Rome, Italy', 
      date: 'Sep 2024', 
      type: 'Historical',
      image: '🏛️',
      rating: '★★★★★'
    },
    { 
      destination: 'Iceland', 
      date: 'Jul 2024', 
      type: 'Nature',
      image: '🌋',
      rating: '★★★★☆'
    },
    { 
      destination: 'New York, USA', 
      date: 'May 2024', 
      type: 'Urban',
      image: '🗽',
      rating: '★★★★★'
    }
  ];

  // Calendar functionality
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="min-h-screen bg-white text-black p-4 rounded-4xl shadow-xl/20 max-w-6xl">
            {/* Main Content Container */}
            <div className="bg-white rounded-3xl p-8 max-w-6xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">User Profile</h2>
                
                {/* Enhanced User Profile Section with Glass Effect */}
                <div className="relative mb-12">
                  {/* Background with subtle pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl"></div>
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-2xl"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-lg"></div>
                  
                  <div className="relative z-10 p-8">
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full border-4 border-white/80 shadow-lg flex items-center justify-center backdrop-blur-sm">
                            <div className="text-center">
                              <div className="text-6xl mb-2">👤</div>
                              <span className="text-xs text-gray-600">Profile Photo</span>
                            </div>
                          </div>
                          {/* Online status indicator */}
                          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg"></div>
                        </div>
                      </div>
                      
                      {/* User Details - Conditional Rendering */}
                      <div className="flex-1 space-y-6">
                        {isEditing ? (
                          // Edit Mode
                          <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">Name</label>
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              className="w-full p-2 rounded-lg bg-white/60 backdrop-blur-sm border border-white/40 text-gray-800"
                            />

                            <label className="block text-sm font-semibold text-gray-700">City</label>
                            <input
                              type="text"
                              value={userCity}
                              onChange={(e) => setUserCity(e.target.value)}
                              className="w-full p-2 rounded-lg bg-white/60 backdrop-blur-sm border border-white/40 text-gray-800"
                            />
                            
                            <label className="block text-sm font-semibold text-gray-700">Country/State</label>
                            <input
                              type="text"
                              value={userCountry}
                              onChange={(e) => setUserCountry(e.target.value)}
                              className="w-full p-2 rounded-lg bg-white/60 backdrop-blur-sm border border-white/40 text-gray-800"
                            />

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">About Me</label>
                              <textarea
                                value={userDescription}
                                onChange={(e) => setUserDescription(e.target.value)}
                                className="w-full p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none shadow-inner"
                                rows="4"
                                placeholder="Tell us about your travel experiences and interests..."
                              />
                            </div>

                            <div className="flex gap-3 mt-4">
                              <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors shadow-lg"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-xl transition-colors shadow-lg"
                              >
                                Cancel
                              </button>
                          </div>
                          </div>
                        ) : (
                          // View Mode
                          <>
                            <div className="space-y-2">
                              <h3 className="text-2xl font-bold text-gray-800">{userName}</h3>
                              <p className="text-lg text-blue-600 font-medium">Travel Explorer • Adventurer</p>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {userCity}, {userCountry}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Joined March 2023
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">About Me</label>
                              <p className="text-gray-800">{userDescription}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                                <div className="text-2xl font-bold text-blue-600">12</div>
                                <div className="text-sm text-gray-600">Countries</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                                <div className="text-2xl font-bold text-green-600">28</div>
                                <div className="text-sm text-gray-600">Cities</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                                <div className="text-2xl font-bold text-purple-600">156</div>
                                <div className="text-sm text-gray-600">Photos</div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-lg"
                              >
                                <Edit3 className="w-4 h-4" />
                                Edit Profile
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preplanned Trips Section */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Preplanned Trips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prePlannedTrips.map((trip, index) => (
                      <Card 
                        key={index} 
                        image={trip.image}
                        destination={trip.destination}
                        date={trip.date}
                        type={trip.type}
                        status={trip.status}
                      />
                    ))}
                  </div>
                </div>

                {/* Previous Trips Section */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Previous Trips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {previousTrips.map((trip, index) => (
                      <Card 
                        key={index} 
                        image={trip.image}
                        destination={trip.destination}
                        date={trip.date}
                        type={trip.type}
                        rating={trip.rating}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'Settings':
        return (
          <div className="p-8 bg-white rounded-4xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Travel Settings</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-semibold">Profile Settings</h3>
                    <p className="text-sm text-gray-600">Update your personal information and preferences</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-semibold">Travel Notifications</h3>
                    <p className="text-sm text-gray-600">Manage trip alerts and booking confirmations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-semibold">Privacy & Security</h3>
                    <p className="text-sm text-gray-600">Control your data and account security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center text-gray-600 bg-white rounded-4xl">
            <h2 className="text-2xl font-bold mb-4">Content for "{activeTab}"</h2>
            <p>This travel section is under development. Pack your bags and check back later!</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-screen min-h-screen mx-auto bg-gradient-to-br from-blue-900 via-purple-900 to-teal-900 shadow-2xl overflow-hidden p-5 font-sans">
      <div className="flex flex-col lg:flex-row h-full">

        {/* Sidebar */}
        <div className="w-full lg:w-100 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-6 rounded-2xl mb-4 lg:mb-0 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">TravelDash</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  activeTab === item.key
                    ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm'
                    : 'text-white/70 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Calendar Widget */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Calendar</h3>
              <div className="flex gap-1">
                <button 
                  onClick={prevMonth}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-white font-medium">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </p>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-center p-2 text-white/60 font-medium">
                  {day}
                </div>
              ))}
              
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={`empty-${index}`} className="p-2"></div>
              ))}
              
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const isToday = day === new Date().getDate() && 
                               currentMonth.getMonth() === new Date().getMonth() &&
                               currentMonth.getFullYear() === new Date().getFullYear();
                
                return (
                  <div 
                    key={day} 
                    className={`text-center p-2 rounded-lg cursor-pointer transition-colors ${
                      isToday 
                        ? 'bg-white/30 text-white font-bold' 
                        : 'text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs text-white/70">Paris Trip - Dec 15</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-white/70">Flight Booking - Jan 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto ml-10">
          {renderContent()}
        </div>

      </div>
    </div>
  );
}