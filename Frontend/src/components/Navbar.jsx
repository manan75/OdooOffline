import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Home, Users } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      {/* Navbar */}
      <nav
        className="w-full px-6 py-4 flex items-center justify-between
        bg-white/20 dark:bg-black/20 backdrop-blur-md shadow-lg fixed top-0 left-0 z-50 border-b border-white/10"
      >
        {/* Left: Sidebar Toggle + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none text-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-xl font-semibold text-white">MyApp</span>
        </div>

        

        {/* Right: Nav Buttons + User Image */}
        <div className="flex items-center gap-10 text-white">
          <button className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Home size={20} /> Home
          </button>
          <button className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Users size={20} /> Community
          </button>
          <img
            src="https://thumbs.dreamstime.com/b/funny-avatar-cunning-emoji-flat-vector-illustration-comic-yellow-social-media-sticker-humorous-cartoon-face-smiling-mouth-162122340.jpg"
            alt="User"
            className="w-8 h-8 rounded-full border border-white/30"
          />
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <aside
          className="fixed top-0 left-0 h-full w-64 
          bg-white/20 dark:bg-black/20 backdrop-blur-md 
          p-6 shadow-lg z-50 border-r border-white/10"
        >
          <p className="text-white mb-4">Sidebar Content</p>
          <ul className="text-white space-y-3">
            <li className="flex items-center gap-2">
              <Home size={18} /> Home
            </li>
            <li className="flex items-center gap-2">
              <Users size={18} /> Community
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Navbar;