import { useContext, useState } from "react";
import Navbar from "./navbar.jsx";
import { AppContent } from "../Context/AppContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlanTrip() {
  const { userData, backendURL } = useContext(AppContent);

  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhotoURL, setCoverPhotoURL] = useState("");

  const navigate = useNavigate();

const suggestions = [
  {
    cityName: "Srinagar",
    imageURL:
      "https://www.bhatakna.com/system/images/000/812/639/47c5ce96c3bcd82cbced964876403036/original/asbot-43nxn.jpg", // Dal Lake Srinagar
  },
  {
    cityName: "Manali",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0D7VNKeHVquhgHTocomYBJYiggMddTAd4Qw&s", // Mountain valley, Manali style
  },
  {
    cityName: "Agra",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTllHuv6ZXxeN6S3tA9jOVSUTUJ3PqoHm4shA&s", // Taj Mahal, Agra
  },
  {
    cityName: "Amritsar",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL27yYEfe-TAPTPh_ecwbwcNTs97lgIR5tlQ&s", // Golden Temple, Amritsar
  },
  {
    cityName: "Mumbai",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/960px-F7xZ48abwAAgNst.jpg", // Mumbai skyline
  },
  {
    cityName: "Goa",
    imageURL:
      "https://www.onthegotours.com/repository/Sandy-beach-in-Goa--India-Tours--On-The-Go-Tours-346991495533921.jpg", // Goa beach sunset
  },
];


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendURL}/api/trips/createTrip`, {
        user_id: userData.userId,
        trip_name: tripName,
        description,
        start_date: startDate,
        end_date: endDate,
        cover_photo: coverPhotoURL || null,
      });

      console.log("Trip created:", res.data);
      alert("Trip created successfully!");
      setTripName("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      setCoverPhotoURL("");

      navigate("/travelPlanner", {
        state: {
          tripName,
          startDate,
          endDate,
          tripId: res.data.trip_id,
        },
      });
    } catch (err) {
      console.error("Error creating trip:", err);
      alert("Failed to create trip");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6 pt-21 bg-gradient-to-br from-[#FFC5D3] to-[#006994]">
        <div className="glass bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg w-full max-w-4xl p-8">
          <h1 className="text-white text-3xl font-bold mb-6 text-center">Plan a New Trip</h1>

          {/* Trip Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Trip Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-white font-semibold mb-1">Trip Name</label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-white font-semibold mb-1">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-white font-semibold mb-1">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
                  required
                />
              </div>
            </div>

            {/* Cover Photo URL */}
            <div>
              <label className="block text-white font-semibold mb-1">Cover Photo URL:</label>
              <input
                type="url"
                placeholder="https://example.com/your-image.jpg"
                value={coverPhotoURL}
                onChange={(e) => setCoverPhotoURL(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-1">Description:</label>
              <textarea
                placeholder="Write a short description about your trip..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
            >
              Create Trip
            </button>
          </form>

          {/* Suggestions */}
          <div className="mt-8">
            <h2 className="text-[#BFDBFE] text-2xl font-semibold mb-4">
              Suggestions for Places to Visit / Activities to Perform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestions.map(({ cityName, imageURL }) => (
                <div
                  key={cityName}
                  className="h-48 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center text-white font-semibold shadow-lg overflow-hidden"
                >
                  <img
                    src={imageURL}
                    alt={cityName}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-2 text-lg">{cityName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
