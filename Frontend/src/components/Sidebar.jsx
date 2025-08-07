import React from "react";
import { Home, Info, LogIn, UserPlus, Search } from "lucide-react";

const Sidebar = () => {
  const items = [
    { icon: <Home size={20} />, label: "Home" },
    { icon: <Info size={20} />, label: "About" },
    { icon: <Search size={20} />, label: "Search" },
    { icon: <LogIn size={20} />, label: "Login" },
    { icon: <UserPlus size={20} />, label: "Register" },
  ];

  return (
    <div className="h-screen w-20 bg-[#586E9A]/20 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-6 space-y-6 shadow-md">
      {items.map((item, index) => (
        <div
          key={index}
          className="group flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <div className="text-white group-hover:text-[#FFF]">
            {item.icon}
          </div>
          <span className="text-[10px] text-white group-hover:text-[#FFF] mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
