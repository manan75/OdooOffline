import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full px-6 py-7 flex justify-between items-center bg-[#586E9A] text-white dark:bg-[#45383F] shadow-md">
        {/* Left: Sidebar Toggle + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-xl font-semibold">MyApp</span>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 mx-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-1 rounded-full text-black text-sm focus:outline-none"
          />
        </div>

        {/* Right: Nav Links + Toggle */}
        <div className="flex items-center gap-4">
          <a href="/" className="hover:underline text-sm">Home</a>
          <a href="/login" className="hover:underline text-sm">Login</a>
          <a href="/register" className="hover:underline text-sm">Register</a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-1 rounded-full bg-white text-black dark:bg-black dark:text-white"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Optional Sidebar (simple example) */}
      {sidebarOpen && (
        <aside className="fixed top-0 left-0 h-full w-64 bg-[#586E9A]/20 dark:bg-[#45383F]/30 backdrop-blur-md p-6 shadow-lg z-50">
          <p className="text-white mb-4">Sidebar Content</p>
          <ul className="text-white space-y-3">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Navbar;
