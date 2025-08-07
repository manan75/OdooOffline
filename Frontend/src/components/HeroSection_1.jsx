import React from "react";

export default function HeroSection_1() {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden px-6 py-16">
      {/* Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              The Finance <br /> Solutions For Business 🚀
            </span>
          </h1>
          <p className="text-gray-300 max-w-lg">
            We are bringing banking applications to a new level of technology never seen before.
          </p>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-full text-sm font-semibold">
              Get Your Card
            </button>
            <div className="flex -space-x-2">
              <img
                src="https://i.pravatar.cc/24?img=1"
                alt=""
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/24?img=2"
                alt=""
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/24?img=3"
                alt=""
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
            <span className="text-sm text-gray-300">132k</span>
          </div>
        </div>

        {/* Card Image */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center relative">
          <div className="relative w-72 h-44 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl p-4 shadow-2xl transform rotate-12">
            <div className="text-white">
              <div className="flex justify-between">
                <span className="font-bold">Mastercard</span>
                <span>02/24</span>
              </div>
              <div className="mt-8">
                <p className="text-lg">**** **** **** 4901</p>
                <p className="mt-2 text-sm">NAME SURNAME</p>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-72 h-44 bg-gray-800 rounded-2xl opacity-50 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <p className="text-2xl font-bold">10M+</p>
          <p className="text-gray-400">Total Customers</p>
        </div>
        <div>
          <p className="text-2xl font-bold">08+</p>
          <p className="text-gray-400">Years of Experience</p>
        </div>
        <div>
          <p className="text-2xl font-bold">No.1</p>
          <p className="text-gray-400">Best Finance Company</p>
        </div>
      </div>
    </section>
  );
}
