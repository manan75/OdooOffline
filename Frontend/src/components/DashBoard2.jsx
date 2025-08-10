import { useState } from "react";
import SettingsPage from "./Settings";
import {
  BarChart3,
  FileText,
  Receipt,
  CreditCard,
  Settings,
  TrendingUp,
  Calendar,
  Search,
  ChevronDown,
  MoreVertical,
  Bell,
  User,
  Shield,
  Palette,
  Key,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function Dashboard2() {
  const [selectedDate, setSelectedDate] = useState('Aug 2019');
  // State to manage the active content view
  const [activeTab, setActiveTab] = useState('Dashboard'); // 'Dashboard' or 'Settings'

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', key: 'Dashboard' },
    { icon: FileText, label: 'Reports', key: 'Reports' },
    { icon: Receipt, label: 'Receipts', key: 'Receipts' },
    { icon: CreditCard, label: 'Accounts', key: 'Accounts' },
    { icon: Settings, label: 'Settings', key: 'Settings' },
  ];

  const recentPayments = [
    { company: 'Magna Magma', type: 'Electronics', amount: '$38.15', date: '03 July 2019', logo: '🔴' },
    { company: 'Apple', type: 'Electronics', amount: '$17.60', date: '03 July 2019', logo: '🍎' },
    { company: 'Uber', type: 'Transport', amount: '$12.50', date: '03 July 2019', logo: '🚗' },
    { company: 'Whole goods', type: 'Electronics', amount: '-', date: '03 July 2019', logo: '🎯' },
    { company: 'Magna', type: '', amount: '-', date: '03 July 2019', logo: '🔴' },
    { company: 'Apple', type: 'Electronics', amount: '$17.60', date: '03 July 2019', logo: '🍎' },
    { company: 'Uber', type: 'Transport', amount: '$12.50', date: '03 July 2019', logo: '🚗' },
    { company: 'Magna', type: '', amount: '-', date: '03 July 2019', logo: '🔴' }
  ];

  const spendingCategories = [
    { name: 'Transport', amount: '$1,870.20', color: 'bg-blue-500', percentage: 30 },
    { name: 'Shopping', amount: '$4,280.73', color: 'bg-pink-400', percentage: 25 },
    { name: 'Education', amount: '$1,341.15', color: 'bg-purple-400', percentage: 20 },
    { name: 'Food & Drink', amount: '$1,214.11', color: 'bg-orange-400', percentage: 25 }
  ];

  // Function to calculate stroke-dasharray for the spend by category chart
  const calculateStrokeDasharray = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += spendingCategories[i].percentage;
    }
    const circumference = 2 * Math.PI * 16; // 2 * pi * r
    const strokeDasharray = `${spendingCategories[index].percentage / 100 * circumference} ${circumference}`;
    const strokeDashoffset = `${circumference - (offset / 100 * circumference)}`;
    return { strokeDasharray, strokeDashoffset };
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  CC
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Cory Chandler</div>
                  <div className="text-sm text-gray-500">Admin</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">

                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Expenses Card */}
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-white/80 text-sm font-medium mb-2">Expenses</h3>
                      <div className="text-3xl font-bold mb-1">884.00</div>
                      <div className="text-white/80 text-sm mb-4">USD</div>
                      <div className="text-sm">
                        <span className="text-white/80">Income: </span>
                        <span className="font-semibold">162.00</span>
                        <span className="text-white/80 ml-1">USD</span>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Donut Chart */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#ec4899"
                            strokeWidth="2"
                            strokeDasharray="60, 40"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-600">OVERSPENT</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spend by Category */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Spend by category</h3>

                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                      {/* <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                        {/* {spendingCategories.map((category, index) => {
                          const { strokeDasharray, strokeDashoffset } = calculateStrokeDasharray(index);
                          return (
                            <circle
                              key={index}
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke={category.color.replace('bg-', '#').replace('-500', '').replace('-400', '')} // Simple conversion, may need refinement
                              strokeWidth="2"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                            />
                          );
                        })} }
                        </svg> */}

                         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="2" 
                                strokeDasharray="30 70" strokeDashoffset="0"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#ec4899" strokeWidth="2" 
                                strokeDasharray="25 75" strokeDashoffset="-30"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#8b5cf6" strokeWidth="2" 
                                strokeDasharray="20 80" strokeDashoffset="-55"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#f97316" strokeWidth="2" 
                                strokeDasharray="25 75" strokeDashoffset="-75"/>
                      </svg>


                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">100%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {spendingCategories.map((category, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700">{category.name}</div>
                          <div className="text-sm font-bold text-gray-800">{category.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-3xl font-bold mb-2">$4,566.00</div>
                      <div className="text-white/80">United Bank</div>
                    </div>
                    <MoreVertical className="w-5 h-5 text-white/80" />
                  </div>

                  <div className="text-white/80 text-sm mb-4">
                    5341 •••• •••• 5412
                  </div>

                  <div className="flex items-center gap-4">
                    <TrendingUp className="w-5 h-5" />
                    <div className="text-sm">
                      <span className="text-white/80">Valid Thru: </span>
                      <span>12/24</span>
                    </div>
                  </div>

                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
                </div>
              </div>

              {/* Right Column - Recent Payments */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Recent payments</h3>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                        <Calendar className="w-4 h-4" />
                        {selectedDate}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Search className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 mb-4">Today - $46.35</div>

                    {recentPayments.slice(0, 3).map((payment, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="text-lg">{payment.logo}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 text-sm">{payment.company}</div>
                          <div className="text-xs text-gray-500">{payment.type}</div>
                        </div>
                        <div className="text-sm font-semibold text-gray-800">{payment.amount}</div>
                      </div>
                    ))}

                    <div className="text-sm text-gray-500 my-4">03 July 2019</div>

                    {recentPayments.slice(3).map((payment, index) => (
                      <div key={index + 3} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="text-lg">{payment.logo}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 text-sm">{payment.company}</div>
                          <div className="text-xs text-gray-500">{payment.type}</div>
                        </div>
                        <div className="text-sm font-semibold text-gray-800">{payment.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Savings Card */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-white/80 text-sm">Savings</div>
                        <div className="text-2xl font-bold">73%</div>
                      </div>
                      <TrendingUp className="w-6 h-6 text-white/80" />
                    </div>
                    <div className="text-white/80 text-sm">
                      Compared to last month
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </>
        );
      case 'Settings':
        return (<div className="bg-white "><SettingsPage /></div>);
      // Add other cases for Reports, Receipts, Accounts if you want to create separate pages for them
      default:
        return (
          <div className="p-8 text-center text-gray-600">
            <h2 className="text-2xl font-bold mb-4">Content for "{activeTab}"</h2>
            <p>This section is under development. Please check back later!</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-screen min-h-screen mx-auto bg-gradient-to-b from-indigo-900 to-purple-900 shadow-2xl overflow-hidden p-5 font-sans">
      <div className="flex flex-col lg:flex-row h-full"> {/* Added flex-col and lg:flex-row for responsiveness */}

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6 rounded-2xl lg:rounded-r-none mb-4 lg:mb-0"> {/* Adjusted for responsiveness */}
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-indigo-900" />
            </div>
            <span className="text-xl font-bold">finreports</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)} // Update activeTab on click
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.key // Check against activeTab state
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Premium Upgrade Card */}
          <div className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">
                Add family account with the premium
              </h3>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                Upgrade to Premium
              </button>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gray-50 rounded-4xl overflow-auto"> {/* Added overflow-auto */}
          {renderContent()}
        </div>

      </div>
    </div>
  );
}


                      {/* <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="2" 
                                strokeDasharray="30 70" strokeDashoffset="0"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#ec4899" strokeWidth="2" 
                                strokeDasharray="25 75" strokeDashoffset="-30"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#8b5cf6" strokeWidth="2" 
                                strokeDasharray="20 80" strokeDashoffset="-55"/>
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#f97316" strokeWidth="2" 
                                strokeDasharray="25 75" strokeDashoffset="-75"/>
                      </svg> */}