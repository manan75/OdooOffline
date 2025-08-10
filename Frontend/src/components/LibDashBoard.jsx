import { useState } from 'react';
import SettingsPage from './Settings.jsx';
import {
  Search,
  Star,
  Bookmark,
  User,
  Trophy,
  MoreHorizontal,
  Play,
  Book,
  Heart,
  Grid3X3,
  Bell, // For settings page
  Shield, // For settings page
  Palette, // For settings page
  Key, // For settings page
  HelpCircle, // For settings page
  LogOut, // For settings page
  Settings // For settings page icon
} from 'lucide-react';

export default function KindleDashboard(){
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard'); // State to manage active tab

  const sidebarItems = [
    { icon: Grid3X3, label: 'Dash Board', key: 'Dashboard' },
    { icon: Book, label: 'Collections', key: 'Collections' },
    { icon: Bookmark, label: 'Saved', key: 'Saved' },
    { icon: User, label: 'Profile', key: 'Profile' },
    { icon: Trophy, label: 'Legend', key: 'Legend' },
    { icon: Settings, label: 'Settings', key: 'Settings' }, // Added Settings tab
  ];

  const recentBooks = [
    {
      title: "Harry Potter And The Sorcerer's Stone",
      author: "J.K. Rowling",
      pages: "309 Page",
      chapter: "Chapter 13",
      status: "Last Read",
      cover: "https://placehold.co/200x280/F97316/FFFFFF?text=Harry+Potter", // Placeholder with specific text/color
      color: "from-orange-600 to-red-700"
    },
    {
      title: "TA Nehisi Coates The Water Dancer",
      author: "Ta-Nehisi Coates",
      status: "New Purchase",
      readStatus: "Yet to Read",
      cover: "https://placehold.co/200x280/3B82F6/FFFFFF?text=Water+Dancer",
      color: "from-blue-600 to-indigo-700"
    },
    {
      title: "Possible Side Effects",
      author: "Augusten Burroughs",
      cover: "https://placehold.co/200x280/4B5563/FFFFFF?text=Side+Effects",
      color: "from-gray-700 to-gray-900"
    }
  ];

  const newReleases = [
    {
      title: "The Glass Hotel",
      author: "Emily St. John Mandel",
      genre: "Fiction",
      cover: "https://placehold.co/120x180/0F766E/FFFFFF?text=Glass+Hotel",
      color: "from-teal-600 to-blue-700"
    },
    {
      title: "The Book of Longings",
      author: "Sue Monk Kidd",
      genre: "Fiction",
      cover: "https://placehold.co/120x180/FACC15/FFFFFF?text=Book+of+Longings",
      color: "from-yellow-600 to-orange-600"
    },
    {
      title: "Darling Rose Gold",
      author: "Stephanie Wrobel",
      genre: "Thriller",
      cover: "https://placehold.co/120x180/EC4899/FFFFFF?text=Rose+Gold",
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "My Dark Vanessa",
      author: "Kate Elizabeth Russell",
      genre: "Mystery",
      cover: "https://placehold.co/120x180/DC2626/FFFFFF?text=Dark+Vanessa",
      color: "from-red-600 to-red-800"
    },
    {
      title: "Weather",
      author: "Jenny Offill",
      genre: "Literary",
      cover: "https://placehold.co/120x180/3B82F6/FFFFFF?text=Weather",
      color: "from-blue-500 to-blue-700"
    }
  ];

  const famousAuthors = [
    {
      name: "J.K. Rowling",
      books: "12 Books",
      avatar: "https://placehold.co/40x40/E5E7EB/4B5563?text=JKR"
    },
    {
      name: "Stephen King",
      books: "87 Books",
      avatar: "https://placehold.co/40x40/E5E7EB/4B5563?text=SK"
    },
    {
      name: "Danielle Steel",
      books: "179 Books",
      avatar: "https://placehold.co/40x40/E5E7EB/4B5563?text=DS"
    }
  ];

  // Calculate genre distribution for the chart
  const genreCounts = newReleases.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  const totalBooks = newReleases.length;
  const genreData = Object.keys(genreCounts).map(genre => ({
    name: genre,
    count: genreCounts[genre],
    percentage: (genreCounts[genre] / totalBooks) * 100,
  }));

  // Assign colors to genres for consistency in the chart
  const genreColors = {
    'Fiction': '#FACC15', // yellow-400
    'Thriller': '#EF4444', // red-500
    'Mystery': '#8B5CF6', // purple-500
    'Literary': '#3B82F6', // blue-500
    'Science Fiction': '#10B981', // green-500
    // Add more colors if more genres are possible
  };

  // Function to calculate stroke-dasharray for the genre pie chart
  const calculateGenreStrokeDasharray = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += genreData[i].percentage;
    }
    const circumference = 2 * Math.PI * 16; // 2 * pi * r
    const strokeDasharray = `${genreData[index].percentage / 100 * circumference}, ${circumference}`;
    const strokeDashoffset = `${circumference - (offset / 100 * circumference)}`;
    return { strokeDasharray, strokeDashoffset };
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            {/* Header with Search */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-black">Library</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your books"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                  New Release
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                  Featured
                </button>
                <button className="p-2 rounded-lg">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> {/* Adjusted for responsiveness */}

              {/* Main Content - Books Section */}
              <div className="md:col-span-3 space-y-8">
                {/* Books You Read Last */}
                <section>
                  <h3 className="text-lg font-semibold text-black mb-6">Books you read last</h3>
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start"> {/* Added flex-wrap and justify-center */}
                    {recentBooks.map((book, index) => (
                      <div key={index} className="group cursor-pointer w-48"> {/* Fixed width for consistent card size */}
                        <div className={`w-full h-64 bg-gradient-to-br ${book.color} rounded-2xl p-4 text-white relative overflow-hidden transform transition-transform group-hover:scale-105`}>
                          <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h4>
                            <p className="text-white/80 text-sm mb-4">{book.author}</p>
                            {book.pages && (
                              <div className="text-white/80 text-sm space-y-1">
                                <div>{book.pages} • {book.chapter} • {book.status}</div>
                              </div>
                            )}
                            {book.readStatus && (
                              <div className="text-white/80 text-sm space-y-1">
                                <div>{book.status} • {book.readStatus}</div>
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                          <div className="absolute top-4 right-4">
                            <Play className="w-5 h-5 text-white/60" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* New Release */}
                <section>
                  <h3 className="text-lg font-semibold text-black mb-6">New Release</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"> {/* Responsive grid */}
                    {newReleases.map((book, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className={`aspect-[3/4] bg-gradient-to-br ${book.color} rounded-xl mb-3 relative overflow-hidden transform transition-transform group-hover:scale-105`}>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute top-3 right-3">
                            <Heart className="w-4 h-4 text-white/60" />
                          </div>
                        </div>
                        <h4 className="font-semibold text-black text-sm mb-1 line-clamp-1">{book.title}</h4>
                        <p className="text-gray-600 text-xs mb-1">{book.author}</p>
                        <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">
                          {book.genre}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Sidebar - Famous Authors and Genre Chart */}
              <div className="md:col-span-1 space-y-6 bg-gray-200 p-3 rounded-2xl">
                <section>
                  <h3 className="text-lg font-semibold text-black mb-6 ml-2">Famous Authors</h3>
                  <div className="space-y-4">
                    {famousAuthors.map((author, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 hover:bg-white/60 rounded-xl cursor-pointer transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-black text-sm">{author.name}</div>
                          <div className="text-gray-600 text-xs">{author.books}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Genre Distribution Chart */}
                <section className="mt-8">
                  <h3 className="text-lg font-semibold text-black mb-6 ml-2">Genre Distribution</h3>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Background circle */}
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                        {/* Genre segments */}
                        {genreData.map((genre, index) => {
                          const { strokeDasharray, strokeDashoffset } = calculateGenreStrokeDasharray(index);
                          return (
                            <circle
                              key={genre.name}
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              stroke={genreColors[genre.name] || '#9CA3AF'} // Fallback color
                              strokeWidth="2"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round" // Makes segments more distinct if they touch
                            />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{totalBooks}</div>
                          <div className="text-sm font-medium text-gray-600">Total Books</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Genre legend */}
                  <div className="space-y-2">
                    {genreData.map((genre, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: genreColors[genre.name] || '#9CA3AF' }}></div>
                        <div className="flex-1 text-sm font-medium text-gray-700">
                          {genre.name} ({genre.count})
                        </div>
                        <div className="text-sm font-bold text-gray-800">
                          {genre.percentage.toFixed(0)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
        );
      case 'Settings':
        return <SettingsPage />;
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 font-sans">
      <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl"> {/* Responsive layout adjustments */}

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white/80 backdrop-blur-sm p-6 lg:rounded-tl-3xl lg:rounded-bl-3xl rounded-t-3xl lg:rounded-tr-none mb-4 lg:mb-0">
          {/* User Profile */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Welcome</div>
              <div className="text-xl font-bold text-black">Sarah</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3 mb-8">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-4 w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.key
                    ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-white/60 backdrop-blur-sm lg:rounded-tr-3xl lg:rounded-br-3xl rounded-b-3xl lg:rounded-bl-none overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}