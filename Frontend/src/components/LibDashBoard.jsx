import React, { useState } from 'react';
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
  Grid3X3
} from 'lucide-react';

export default function KindleDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { icon: Grid3X3, label: 'Dash Board', active: true },
    { icon: Book, label: 'Collections', active: false },
    { icon: Bookmark, label: 'Saved', active: false },
    { icon: User, label: 'Profile', active: false },
    { icon: Trophy, label: 'Legend', active: false },
  ];

  const recentBooks = [
    {
      title: "Harry Potter And The Sorcerer's Stone",
      author: "J.K. Rowling",
      pages: "309 Page",
      chapter: "Chapter 13",
      status: "Last Read",
      cover: "/api/placeholder/200/280",
      color: "from-orange-600 to-red-700"
    },
    {
      title: "TA Nehisi Coates The Water Dancer",
      author: "Ta-Nehisi Coates",
      status: "New Purchase",
      readStatus: "Yet to Read",
      cover: "/api/placeholder/200/280",
      color: "from-blue-600 to-indigo-700"
    },
    {
      title: "Possible Side Effects",
      author: "Augusten Burroughs",
      cover: "/api/placeholder/200/280",
      color: "from-gray-700 to-gray-900"
    }
  ];

  const newReleases = [
    {
      title: "The Glass Hotel",
      author: "Emily St. John Mandel",
      genre: "Fiction",
      cover: "/api/placeholder/120/180",
      color: "from-teal-600 to-blue-700"
    },
    {
      title: "The Book of Longings",
      author: "Sue Monk Kidd",
      genre: "Fiction",
      cover: "/api/placeholder/120/180",
      color: "from-yellow-600 to-orange-600"
    },
    {
      title: "Darling Rose Gold",
      author: "Stephanie Wrobel",
      genre: "Thriller",
      cover: "/api/placeholder/120/180",
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "My Dark Vanessa",
      author: "Kate Elizabeth Russell",
      genre: "Mystery",
      cover: "/api/placeholder/120/180",
      color: "from-red-600 to-red-800"
    },
    {
      title: "Weather",
      author: "Jenny Offill",
      genre: "Literary",
      cover: "/api/placeholder/120/180",
      color: "from-blue-500 to-blue-700"
    }
  ];

  const famousAuthors = [
    {
      name: "J.K. Rowling",
      books: "12 Books",
      avatar: "/api/placeholder/40/40"
    },
    {
      name: "Stephen King",
      books: "87 Books", 
      avatar: "/api/placeholder/40/40"
    },
    {
      name: "Danielle Steel",
      books: "179 Books",
      avatar: "/api/placeholder/40/40"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">

      <div className="flex">
        
        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-sm p-6 rounded-tl-3xl rounded-bl-3xl">
          
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
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`flex items-center gap-4 w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  item.active 
                    ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Amazon Product Badge */}
          {/* <div className="bg-gray-100 rounded-xl p-4 text-center">
            <div className="text-sm font-medium text-gray-700 mb-2">Product of</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-black">amazon</span>
              <div className="w-6 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full relative">
                <div className="absolute right-0 top-0 w-3 h-3 bg-orange-500 rounded-full transform translate-x-0.5 -translate-y-0"></div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-white/60 backdrop-blur-sm rounded-tr-3xl rounded-br-3xl">
          
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

          <div className="grid grid-cols-4 gap-8">
            
            {/* Main Content - Books Section */}
            <div className="col-span-3 space-y-8">
              
              {/* Books You Read Last */}
              <section>
                <h3 className="text-lg font-semibold text-black mb-6">Books you read last</h3>
                <div className="flex gap-6">
                  {recentBooks.map((book, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className={`w-48 h-64 bg-gradient-to-br ${book.color} rounded-2xl p-4 text-white relative overflow-hidden transform transition-transform group-hover:scale-105`}>
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
                <div className="grid grid-cols-5 gap-4">
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

            {/* Right Sidebar - Famous Authors */}
            <div className="space-y-6 bg-gray-200 p-3 rounded-2xl">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}