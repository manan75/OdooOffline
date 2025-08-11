import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import { MapPin } from 'lucide-react';
import Navbar from  './navbar.jsx'

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const { backendURL } = useContext(AppContent);

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    const fetchDestinationsWithActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${backendURL}/api/trips/${tripId}/destination-activities`);
        setDestinations(res.data);
      } catch (err) {
        console.error('Failed to fetch destinations and activities', err);
        setError('Failed to load trip details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationsWithActivities();
  }, [backendURL, tripId]);

  if (loading) return <div className="p-6 text-center text-gray-700">Loading trip details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (destinations.length === 0)
    return <div className="p-6 text-center text-gray-500">No destinations planned yet for this trip.</div>;

  return (
    <><Navbar/>
    <div className="min-h-screen pt-40 bg-gradient-to-b from-purple-700 to-purple-900 p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Trip Destinations & Activities</h2>

        {destinations.map((dest) => (
          <section
            key={dest.trip_dest_id}
            className="mb-6 rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center mb-3 gap-3">
              <MapPin size={24} className="text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                {dest.city_name}, {dest.state}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 font-medium">Date: {formatDate(dest.dest_date)}</p>

            {dest.activities.length === 0 ? (
              <p className="italic text-gray-500">No activities planned for this destination.</p>
            ) : (
              <ul className="list-disc pl-5 space-y-2 text-gray-800">
                {dest.activities.map((activity) => (
                  <li key={activity.trip_activity_id}>
                    <strong>{activity.activity_name}</strong>{' '}
                    {activity.scheduled_time ? `at ${activity.scheduled_time}` : '(Time not specified)'}
                    {activity.notes ? ` — ${activity.notes}` : ''}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="text-center mt-6">
          <Link to="/travelDashboard" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            Back to My Trips
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default TripDetailsPage;
