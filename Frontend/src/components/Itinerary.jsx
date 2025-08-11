import React, { useState } from "react";

export default function TravelPlanner() {
  const [days, setDays] = useState(2); // Start with Day 1 & Day 2

  const handleAddDay = () => {
    setDays((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative flex justify-center items-center p-6">
      <img
        src="https://i.pinimg.com/1200x/53/b3/bc/53b3bc64567c1f1d0e01154f0676dd72.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Glass container */}
      <div className="relative w-full max-w-6xl p-6 rounded-xl backdrop-blur-lg bg-white/20 shadow-2xl border border-white/30 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">GlobalTrotter</h1>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/30 rounded-md hover:bg-white/40">
              Group by
            </button>
            <button className="px-3 py-1 bg-white/30 rounded-md hover:bg-white/40">
              Filter
            </button>
            <button className="px-3 py-1 bg-white/30 rounded-md hover:bg-white/40">
              Sort by...
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search bar..."
            className="w-full p-3 rounded-md bg-white/30 placeholder-white text-white outline-none border border-white/30 focus:border-white/60"
          />
        </div>

        {/* Title Row */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Itinerary for a selected place</h2>
          <h2 className="text-lg font-semibold">Expense</h2>
        </div>

        {/* Days Loop */}
        {[...Array(days)].map((_, dayIndex) => (
          <div key={dayIndex} className="mb-6">
            <span className="inline-block px-3 py-1 bg-white/30 rounded-md mb-3">
              Day {dayIndex + 1}
            </span>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Enter physical activity..."
                  className="flex-1 p-3 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white text-white outline-none focus:border-white/60"
                />
                <input
                  type="number"
                  placeholder="₹"
                  className="w-32 p-3 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white text-white outline-none focus:border-white/60"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Add Day Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAddDay}
            className="px-4 py-2 bg-white/30 rounded-md hover:bg-white/40 border border-white/50"
          >
            + Add Day
          </button>
        </div>
      </div>
    </div>
  );
}
