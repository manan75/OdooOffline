import Card from "./card";
import { useState } from "react";
import {
  MapPin,
  Plane,
  Camera,
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
  Car
} from 'lucide-react';

export default function TravelDashboard() {
  const [selectedDate, setSelectedDate] = useState('Aug 2024');
  const [activeTab, setActiveTab] = useState('Dashboard');

  const sidebarItems = [
    { icon: MapPin, label: 'Dashboard', key: 'Dashboard' },
    { icon: Plane, label: 'My Trips', key: 'Trips' },
    { icon: Camera, label: 'Photos', key: 'Photos' },
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

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="min-h-screen bg-white text-black p-4 rounded-4xl shadow-xl/20">
            {/* Header
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">User Profile</h1>
            </div> */}

            {/* Main Content Container */}
            <div className="bg-white rounded-3xl p-8 max-w-7xl">
              {/* GlobalTrotter Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">User Profile</h2>
                
                {/* User Profile Section */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-32 h-32 bg-gray-300 rounded-full border-2 border-gray-600 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image of the User</span>
                  </div>
                  
                  <div className="flex-1 bg-gray-300 rounded-lg p-6 relative">
                    <div className="text-black mb-4">
                      User Details with appropriate option to edit and view other information....
                    </div>
                    <div className="absolute top-6 right-4">
                      <button className="bg-blue-600 px-3 h-10 w-20 py-1 rounded text-lg text-white">Edit</button>
                    </div>
                  </div>
                </div>

                {/* Preplanned Trips Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Preplanned Trips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {prePlannedTrips.map((trip, index) => (
                      <div key={index} className=" rounded-lg p-6 relative shadow-md hover:shadow-lg">
                        <Card key={index} image={trip.image}/>
                        {/* <div className="text-4xl mb-4 text-center">{trip.image}</div>
                        <div className="text-center">
                          <h4 className="font-semibold mb-2">{trip.destination}</h4>
                          <p className="text-sm text-gray-400 mb-2">{trip.date}</p>
                          <p className="text-xs text-gray-500 mb-4">{trip.type}</p> */}
                          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-lg text-white transition-colors">
                            View
                          </button>
                          </div>
                        // {index === 2 && (
                          //   <div className="absolute top-2 right-2">
                          //     <span className="bg-green-600 px-2 py-1 rounded text-xs">Acclaimed Hamster</span>
                          //   </div>
                          // )}
                    ))}
                  </div>
                </div>

                {/* Previous Trips Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Previous Trips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {previousTrips.map((trip, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg p-6 relative shadow-md hover:shadow-lg">
                        <div className="text-4xl mb-4 text-center">{trip.image}</div>
                        <div className="text-center">
                          <h4 className="font-semibold mb-2">{trip.destination}</h4>
                          <p className="text-sm text-gray-400 mb-2">{trip.date}</p>
                          <p className="text-xs text-gray-500 mb-2">{trip.type}</p>
                          <p className="text-yellow-400 mb-4">{trip.rating}</p>
                          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-lg text-white transition-colors">
                            View
                          </button>
                        </div>
                        {index === 2 && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-green-600 px-2 py-1 rounded text-xs">Great Stingray</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Version indicator
            <div className="fixed bottom-4 right-4 bg-red-600 px-3 py-1 rounded text-sm">
              Ver
            </div> */}
          </div>
        );
      
      case 'Settings':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Travel Settings</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-semibold">Profile Settings</h3>
                    <p className="text-sm text-gray-600">Update your personal information and preferences</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="font-semibold">Travel Notifications</h3>
                    <p className="text-sm text-gray-600">Manage trip alerts and booking confirmations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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
          <div className="p-8 text-center text-gray-600">
            <h2 className="text-2xl font-bold mb-4">Content for "{activeTab}"</h2>
            <p>This travel section is under development. Pack your bags and check back later!</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-screen min-h-screen mx-auto bg-gradient-to-b from-blue-900 to-teal-900 shadow-2xl overflow-hidden p-5 font-sans">
      <div className="flex flex-col lg:flex-row h-full">

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-gradient-to-b from-blue-900 to-teal-900 text-white p-6 rounded-2xl lg:rounded-r-none mb-4 lg:mb-0">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-900" />
            </div>
            <span className="text-xl font-bold">TravelDash</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.key
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Premium Travel Card */}
          <div className="bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">
                Unlock Premium Travel Features
              </h3>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                Upgrade to Explorer
              </button>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>

      </div>
    </div>
  );
}