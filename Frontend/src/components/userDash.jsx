import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
import { AppContent } from "../Context/AppContext";

export default function Dashboard() {
  const { backendURL, userData } = useContext(AppContent);
  const [prePlannedTrips, setPrePlannedTrips] = useState([]);
  const [previousTrips, setPreviousTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData?.userId) return; // wait for userId to be ready

    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/trips/getTrips/${userData.userId}`);
        const trips = res.data;
        const now = new Date();

        setPrePlannedTrips(trips.filter(trip => new Date(trip.start_date) > now));
        setPreviousTrips(trips.filter(trip => new Date(trip.start_date) <= now));
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [backendURL, userData]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  // Helper to format date nicely
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="min-h-screen bg-white text-black p-6 rounded-4xl shadow-xl/20 max-w-6xl mx-auto">
      {/* Profile Section */}
      {userData && (
        <div className="flex items-center gap-6 mb-12 bg-gray-100 p-6 rounded-xl shadow-sm max-w-3xl mx-auto">
          {/* Simple avatar placeholder */}
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold select-none">
            {userData.username ? userData.username.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{userData.username || "User"}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-500">
              {userData.address ? `${userData.address}, ` : ""}
              {userData.city || "City not set"}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Role: {userData.role || "N/A"}
            </p>
            <p className="text-gray-400 text-sm">
              Joined: {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Preplanned Trips */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Preplanned Trips</h3>
        {prePlannedTrips.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prePlannedTrips.map(trip => (
              <div
                key={trip.trip_id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
              >
                {/* Cover photo */}
                {trip.cover_photo ? (
                  <img
                    src={trip.cover_photo}
                    alt={trip.trip_name}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="flex items-center justify-center h-40 bg-gray-300 rounded-t-2xl text-gray-600 text-xl">
                    No Image
                  </div>
                )}

                {/* Trip details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-semibold mb-2 text-gray-800 text-center">{trip.trip_name}</h4>
                  <p className="text-sm text-gray-600 mb-2 text-center">
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </p>
                  <p className="text-xs text-gray-500 mb-4 text-center flex-grow">{trip.description}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white block mx-auto transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming trips.</p>
        )}
      </div>

      {/* Previous Trips */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Previous Trips</h3>
        {previousTrips.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousTrips.map(trip => (
              <div
                key={trip.trip_id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
              >
                {/* Cover photo */}
                {trip.cover_photo ? (
                  <img
                    src={trip.cover_photo}
                    alt={trip.trip_name}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="flex items-center justify-center h-40 bg-gray-300 rounded-t-2xl text-gray-600 text-xl">
                    No Image
                  </div>
                )}

                {/* Trip details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-semibold mb-2 text-gray-800 text-center">{trip.trip_name}</h4>
                  <p className="text-sm text-gray-600 mb-2 text-center">
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </p>
                  <p className="text-xs text-gray-500 mb-4 text-center flex-grow">{trip.description}</p>
                  <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white block mx-auto transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No previous trips.</p>
        )}
      </div>
    </div>
  );
}
