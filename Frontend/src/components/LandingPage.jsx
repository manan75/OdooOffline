import React, { useState } from "react";
import HeroSection_1 from "./HeroSection_1.jsx";
import Card from "./card.jsx";

export default function LandingPage(){
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [filterOption, setFilterOption] = useState("All");

  const destinations = [
    {
      image:
        "https://s3.india.com/wp-content/uploads/2024/04/Feature-Image-_-pondicherry.jpg?impolicy=Medium_Widthonly&w=350&h=263",
      title: "Beautiful Destination 1",
      timeAgo: "2 hours ago",
      description:
        "Discover the hidden gems of India with stunning landscapes and cultural richness.",
      category: "Nature",
    },
    {
      image: "https://images.memphistours.com/xlarge/154154142_3.jpg",
      title: "Beautiful Destination 2",
      timeAgo: "3 hours ago",
      description: "Golden beaches and serene sunsets await you.",
      category: "Beach",
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Beautiful Destination 3",
      timeAgo: "1 day ago",
      description: "Experience nature’s beauty at its finest.",
      category: "Mountain",
    },
  ];

  const filteredData = destinations
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => filterOption === "All" || item.category === filterOption)
    .sort((a, b) => {
      if (sortOption === "Newest") return 0;
      if (sortOption === "Oldest") return 0;
      return 0;
    });

  return (
    <>
      <div className="relative">
        <HeroSection_1 />

        {/* Glass Blur Search/Filter/Sort at the Junction */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-[90%] md:w-auto bg-white/30 backdrop-blur-md shadow-lg rounded-lg px-6 py-4 border border-white/40">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border w-2xl border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60"
            />

            {/* Filter Dropdown */}
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60"
            >
              <option value="All">All</option>
              <option value="Nature">Nature</option>
              <option value="Beach">Beach</option>
              <option value="Mountain">Mountain</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen font-sans px-8 pt-20 pb-12">
        {/* Top Picks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {filteredData.map((item, index) => (
              <Card
                key={index}
                image={item.image}
                title={item.title}
                timeAgo={item.timeAgo}
                description={item.description}
                className="w-60 h-[28rem]"
              />
            ))}
          </div>
        </section>

        {/* Lesser-known Places */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Lesser-known Places</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {destinations.map((item, index) => (
              <Card
                key={index + "lesser"}
                image={item.image}
                title={item.title}
                timeAgo={item.timeAgo}
                description={item.description}
                className="w-60 h-[28rem]"
              />
            ))}
          </div>
        </section>
      </div>

      {/* Plan Trip Floating Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-full shadow-lg transition-all duration-200">
        + Plan Trip
      </button>

    </>
  );
};