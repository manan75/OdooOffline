import { useState } from "react";
import { MapPin, Plane, Calendar, Settings, ChevronLeft, ChevronRight } from "lucide-react";

import MyTrips from "./Mytrips";

import SettingsPage from "./SettingsPage";
import Navbar from "./navbar.jsx";
import Dashboard from "./userDash.jsx";
import SimpleTripsCalendar from "./Calender.jsx";



export default function TravelDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const sidebarItems = [
    { icon: MapPin, label: "Dashboard" },
    { icon: Plane, label: "My Trips" },
    { icon: Calendar, label: "Calender" },
    { icon: Settings, label: "Settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard": return <Dashboard />;
      case "My Trips": return <MyTrips />;
      case "Calender": return <SimpleTripsCalendar/>;
      case "Settings": return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen min-h-screen p-20 mx-auto bg-gradient-to-br from-blue-900 via-purple-900 to-teal-900">
        <div className="flex flex-col lg:flex-row">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-6 rounded-2xl">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-3 w-full p-4 rounded-xl text-left transition-all ${
                  activeTab === item.label
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-10">{renderContent()}</div>
        </div>
      </div>
    </>
  );
}
