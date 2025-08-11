import React, { useState, useEffect, useContext } from "react";
import HeroSection_1 from "./HeroSection_1.jsx";
import Card from "./card.jsx";
import axios from "axios";
import { AppContent } from "../Context/AppContext.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [filterOption, setFilterOption] = useState("All");
  const [topCities, setTopCities] = useState([]);

  const { backendURL } = useContext(AppContent);

  useEffect(() => {
    const fetchTopCities = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/search/top-cities`);
        setTopCities(res.data);
      } catch (err) {
        console.error("Error fetching top cities", err);
      }
    };
    fetchTopCities();
  }, [backendURL]);

  const filteredCities = topCities
    .filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (city) => filterOption === "All" || city.state === filterOption
    );

  return (
    <>
      <div className="relative">
        <HeroSection_1 />

        {/* Overlay Search Bar */}
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 
                          w-[95%] max-w-4xl bg-white/20 backdrop-blur-xl 
                          border border-white/30 shadow-xl rounded-2xl 
                          px-4 py-4 z-20">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border border-white/40 rounded-lg px-4 py-2 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 
                          bg-white/50 placeholder-gray-600 text-gray-800 text-sm md:text-base shadow-sm"
              />

              {/* Filter Dropdown */}
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="border border-white/40 rounded-lg px-3 py-2 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 
                          bg-white/50 text-gray-800 text-sm md:text-base shadow-sm"
              >
                <option value="All">All</option>
                {/* Dynamic filter options */}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-white/40 rounded-lg px-3 py-2 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 
                          bg-white/50 text-gray-800 text-sm md:text-base shadow-sm"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>



      <div className="bg-gray-50 min-h-screen font-sans px-4 sm:px-6 md:px-8 pt-28 pb-12 max-w-screen-xl mx-auto">
        {/* Top Picks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Top Picks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {filteredCities.map((city) => (
              <Card
                key={city.city_id}
                image={`https://source.unsplash.com/400x300/?${city.name}`}
                title={city.name}
                timeAgo={`${city.ratings} ★`}
                description={city.about}
                className="w-full max-w-xs mx-auto h-[28rem]"
              />
            ))}
          </div>
        </section>

      <div className="sticky bottom-12 flex flex-col gap-3 md:flex-row md:gap-4 justify-end pr-4 z-50">
    
          {/* Plan Trip Button */}
          <Link to="/planTrip">
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 
                              text-white px-6 py-3 rounded-full shadow-lg shadow-blue-300 
                              font-semibold text-lg transition-transform duration-200 hover:scale-105">
              + Plan Trip
            </button>
          </Link>

          {/* Chatbot Button */}
          <button
            onClick={() => {
              console.log("Open chatbot");
            }}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 
                      text-white px-6 py-3 rounded-full shadow-lg shadow-purple-300 
                      font-semibold text-lg transition-transform duration-200 hover:scale-105"
          >
            💬 Chatbot
          </button>

        </div>
      </div>
        
      <Footer />
    </>
  );
}
