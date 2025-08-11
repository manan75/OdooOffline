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

        {/* Floating Plan Trip Button */}
        <div className="fixed bottom-6 right-4 z-50 md:absolute md:top-4 md:right-4">
          <Link to="/planTrip">
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-300 animate-bounce font-semibold text-lg transition-transform duration-200 md:px-8 md:py-3">
              + Plan Trip
            </button>
          </Link>
        </div>

        {/* Search/Filter/Sort Bar */}
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[95%] max-w-lg md:absolute md:left-1/2 md:bottom-auto md:translate-x-[-50%] md:top-[calc(100%+1rem)] bg-white/30 backdrop-blur-md shadow-lg rounded-lg px-4 py-3 border border-white/40 z-40">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60 text-sm md:text-base"
            />
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60 text-sm md:text-base"
            >
              <option value="All">All</option>
              {/* You can dynamically generate options from your city states */}
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60 text-sm md:text-base"
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
      </div>
      <Footer />
    </>
  );
}
