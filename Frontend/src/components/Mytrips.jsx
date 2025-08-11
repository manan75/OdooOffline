import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
import { AppContent } from "../Context/AppContext";

export default function MyTrips() {
  const { backendURL, userData } = useContext(AppContent);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/trips/getTrips/${userData.userId}`);
        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [backendURL, userData]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="p-8 bg-white rounded-4xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Trips</h2>
      <p className="text-gray-700 mb-6">
        Here you can view and manage all your trips.
      </p>

      {trips.length === 0 ? (
        <p className="text-gray-500">You have no trips planned yet.</p>
      ) : (
        <div className="space-y-6">
          {trips.map((trip) => (
            <div
              key={trip.trip_id}
              className="flex flex-col md:flex-row items-center justify-between p-6 bg-white shadow-md rounded-xl border border-gray-200
                         transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0 flex-1">
                <MapPin size={28} className="text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{trip.trip_name}</h3>
                  <p className="text-sm text-gray-600">{trip.description}</p>
                </div>
              </div>

              <div className="text-sm text-gray-500 mr-6 whitespace-nowrap">
                <p>
                  <span className="font-semibold text-gray-700">From: </span>
                  {formatDate(trip.start_date)}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">To: </span>
                  {formatDate(trip.end_date || trip.start_date)}
                </p>
              </div>

              <button
                type="button"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
                           text-white px-5 py-2 rounded-lg font-semibold transition-colors shadow-md"
                onClick={() => alert(`See details for trip: ${trip.trip_name}`)}
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
