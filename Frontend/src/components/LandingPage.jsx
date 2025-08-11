import React, { useState, useEffect } from "react";
import HeroSection_1 from "./HeroSection_1.jsx";
import Card from "./card.jsx";
import axios from "axios";
import { useContext } from "react";
import { AppContent } from "../Context/AppContext.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";


export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [filterOption, setFilterOption] = useState("All");
  const [topCities, setTopCities] = useState([]);


  const {backendURL} = useContext(AppContent);

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
  }, []);

  const filteredCities = topCities
    .filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (city) => filterOption === "All" || city.state === filterOption // Example filter by state
    );

  return (
    <>
      <div className="relative">
        <HeroSection_1 />

        {/* Floating Plan Trip Button */}
        <div className="absolute top-4 right-4 z-50">
         <Link to='/planTrip'> <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-full shadow-lg shadow-blue-300 animate-bounce font-semibold text-lg transition-transform duration-200">
            + Plan Trip
          </button>
          </Link>
        </div>

        {/* Search/Filter/Sort Bar */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-[90%] md:w-auto bg-white/30 backdrop-blur-md shadow-lg rounded-lg px-6 py-4 border border-white/40">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60"
            />
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60"
            >
              <option value="All">All</option>
              {/* You can dynamically generate options from your city states */}
            </select>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCities.map((city) => (
              <Card
                key={city.city_id}
                image={`https://source.unsplash.com/400x300/?${city.name}`} // Placeholder image
                title={city.name}
                timeAgo={`${city.ratings} ★`}
                description={city.about}
                className="h-[28rem] w-80"
              />
            ))}
          </div>
        </section>
      </div>
          <Footer/>
    </>
  );
}
