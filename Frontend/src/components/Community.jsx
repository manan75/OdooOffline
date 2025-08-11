import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';

export default function CommunityPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Recent');
  const [filterBy, setFilterBy] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const communityPosts = [
    {
      id: 1,
      user: {
        name: 'Priya Sharma',
        avatar: '👩‍🦰',
        location: 'Agra, Uttar Pradesh',
        badge: 'Alert Kangaroo'
      },
      title: 'Magical sunrise at Taj Mahal!',
      content: 'Just witnessed the most breathtaking sunrise from the Taj Mahal gardens. The golden hour light hitting the white marble was absolutely magical. If you\'re visiting Agra, make sure to catch this view at dawn!',
      image: '🕌',
      likes: 124,
      comments: 23,
      shares: 8,
      timestamp: '2 hours ago',
      tags: ['#TajMahal', '#Agra', '#Sunrise', '#Heritage']
    },
    {
      id: 2,
      user: {
        name: 'Rajesh Kumar',
        avatar: '👨‍💼',
        location: 'Jodhpur, Rajasthan',
        badge: 'Wise Panda'
      },
      title: 'Hidden gem in Blue City lanes',
      content: 'Discovered this amazing little chai shop tucked away in the narrow blue lanes of Jodhpur. The locals were so friendly and the masala chai was incredible. Sometimes the best experiences come from wandering off the beaten path.',
      image: '☕',
      likes: 89,
      comments: 15,
      shares: 12,
      timestamp: '5 hours ago',
      tags: ['#Jodhpur', '#BlueCity', '#Chai', '#Rajasthan']
    },
    {
      id: 3,
      user: {
        name: 'Kavya Reddy',
        avatar: '👩‍🎨',
        location: 'Munnar, Kerala',
        badge: 'Ocean Explorer'
      },
      title: 'Sunrise trek to Anamudi Peak',
      content: 'Woke up at 4 AM for this incredible sunrise trek in the Western Ghats. The view from Kerala\'s highest peak was absolutely worth every step. The tea gardens stretching endlessly below were simply stunning.',
      image: '🏔️',
      likes: 156,
      comments: 31,
      shares: 19,
      timestamp: '1 day ago',
      tags: ['#Munnar', '#Kerala', '#Trekking', '#WesternGhats']
    },
    {
      id: 4,
      user: {
        name: 'Arjun Singh',
        avatar: '👨‍🎓',
        location: 'Rishikesh, Uttarakhand',
        badge: 'Northern Wanderer'
      },
      title: 'Ganga Aarti photography tips',
      content: 'After three evenings of capturing the Ganga Aarti, I finally got some amazing shots! Here are my top tips: arrive early for good spots, use fast shutter speed for the fire, and most importantly - respect the sacred ceremony.',
      image: '🪔',
      likes: 203,
      comments: 47,
      shares: 35,
      timestamp: '2 days ago',
      tags: ['#Rishikesh', '#GangaAarti', '#Photography', '#Spiritual']
    }
  ];

  const openPostDetail = (post) => {
    setSelectedPost(post);
  };

  const closePostDetail = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#006694] to-[#70A9CB] p-6 pt-21">
      {/* Custom Sky Blue and White Gradient Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-blue-200 to-white">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/20 via-sky-200/15 to-white/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-sky-100/40"></div>
      </div> */}
      
      {/* Content Container */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2 drop-shadow-lg">Community</h1>
            
            {/* GlobalTrotter Header with Search */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">GlobeTrotter</h2>
                <div className="w-10 h-10 bg-gray/80 rounded-full flex items-center justify-center border-2 border-gray/40">
                  <span className="text-black">👤</span>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-100 border border-black text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div className="flex gap-3">
                  <select 
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-gray-100  border border-black text-black focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="Recent" className="bg-gray-800">Group by Recent</option>
                    <option value="Popular" className="bg-gray-800">Group by Popular</option>
                    <option value="Location" className="bg-gray-800">Group by Location</option>
                  </select>
                  <select 
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-gray-100  border border-black text-black focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="All" className="bg-gray-800">Filter All</option>
                    <option value="Photos" className="bg-gray-800">Photos</option>
                    <option value="Tips" className="bg-gray-800">Tips</option>
                    <option value="Reviews" className="bg-gray-800">Reviews</option>
                  </select>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-gray-100  border border-black text-black focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="Latest" className="bg-gray-800">Sort by Latest</option>
                    <option value="Popular" className="bg-gray-800">Sort by Popular</option>
                    <option value="Trending" className="bg-gray-800">Sort by Trending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-4 bg-white border-white/20 rounded-xl p-4">
              <p className="text-black text-sm">
                Community section where all the users can share their experiences about a certain trip or activity.
                Using the search, groupby or filter and sortby option, the user can narrow down the results that they are looking for...
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Posts Feed */}
            <div className={`transition-all duration-300 ${selectedPost ? 'w-2/3' : 'w-full'}`}>
              
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="flex items-start gap-4">
                    {/* User Avatar Circle */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-3 border-white/30 shadow-lg">
                        <span className="text-2xl">{post.user.avatar}</span>
                      </div>
                    </div>

                    {/* Post Content Block */}
                    <div 
                      onClick={() => openPostDetail(post)}
                      className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] transform"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800 mb-1">{post.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">{post.user.name}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {post.user.location}
                            </span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                        {post.user.badge && (
                          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                            {post.user.badge}
                          </span>
                        )}
                      </div>

                      {/* Post Content */}
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
                      </p>

                      {/* Post Image/Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="text-6xl filter drop-shadow-md">{post.image}</div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium border border-blue-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">{post.shares}</span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Detail Sidebar */}
            {selectedPost && (
              <div className="w-1/3 bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl animate-slideIn">
                <div className="p-6">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-black">Post Details</h3>
                    <button 
                      onClick={closePostDetail}
                      className="text-black  transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-3 border-white/30 shadow-lg">
                      <span className="text-2xl">{selectedPost.user.avatar}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-black">{selectedPost.user.name}</h4>
                      <p className="text-black text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedPost.user.location}
                      </p>
                      {selectedPost.user.badge && (
                        <span className="bg-gradient-to-r from-sky-600 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block shadow-md">
                          {selectedPost.user.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Title */}
                  <h5 className="text-xl font-bold text-black mb-4">{selectedPost.title}</h5>

                  {/* Post Image */}
                  <div className="flex justify-center mb-6 bg-white/10 rounded-xl p-8 border border-white/20">
                    <div className="text-8xl filter drop-shadow-lg">{selectedPost.image}</div>
                  </div>

                  {/* Full Content */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
                    <p className="text-black leading-relaxed">{selectedPost.content}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPost.tags.map((tag, index) => (
                      <span key={index} className="bg-gradient-to-r from-sky-600 to-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-md border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Detailed Stats */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-black bg-white/10 rounded-lg p-3 border border-white/20">
                      <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        Likes
                      </span>
                      <span className="font-bold">{selectedPost.likes}</span>
                    </div>
                    <div className="flex items-center justify-between text-black bg-white/10 rounded-lg p-3 border border-white/20">
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                        Comments
                      </span>
                      <span className="font-bold">{selectedPost.comments}</span>
                    </div>
                    <div className="flex items-center justify-between text-black bg-white/10 rounded-lg p-3 border border-white/20">
                      <span className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-green-400" />
                        Shares
                      </span>
                      <span className="font-bold">{selectedPost.shares}</span>
                    </div>
                    <div className="flex items-center justify-between text-black bg-white/10 rounded-lg p-3 border border-white/20">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        Posted
                      </span>
                      <span className="font-bold">{selectedPost.timestamp}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 hover:from-sky-700 hover:via-blue-700 hover:to-sky-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                      View Full Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}