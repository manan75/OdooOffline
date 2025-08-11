import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../Context/AppContext";

export default function ExpensesPage() {
  const { backendURL, userData } = useContext(AppContent);

  const [userTrips, setUserTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [budget, setBudget] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [budgetStatus, setBudgetStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user's trips on mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/trips/getTrips/${userData.userId}`);
        setUserTrips(res.data);
      } catch (err) {
        setError("Failed to load trips.");
      }
    };
    fetchTrips();
  }, [backendURL, userData.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setEstimatedCost(null);
    setBudgetStatus(null);

    if (!selectedTripId) {
      setError("Please select a trip.");
      return;
    }
    if (!budget || isNaN(budget) || Number(budget) <= 0) {
      setError("Please enter a valid budget amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/trip/calculateBudget`, {
        tripId: selectedTripId,
        budget: Number(budget),
      });

      setEstimatedCost(res.data.estimatedCost);
      setBudgetStatus(res.data.withinBudget ? "Within Budget" : "Over Budget");
      setMessage(res.data.message);
    } catch {
      setError("Failed to calculate budget.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">Trip Expenses</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <label className="block mb-2 font-semibold text-gray-700">Select Trip</label>
        <select
          value={selectedTripId}
          onChange={(e) => setSelectedTripId(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="" disabled>
            -- Choose a trip --
          </option>
          {userTrips.map((trip) => (
            <option key={trip.trip_id} value={trip.trip_id}>
              {trip.trip_name} ({new Date(trip.start_date).toLocaleDateString()} -{" "}
              {new Date(trip.end_date).toLocaleDateString()})
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold text-gray-700">Your Budget (₹)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter your budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Calculating..." : "Calculate Estimated Cost"}
        </button>
      </form>

      {estimatedCost !== null && (
        <div className="mt-8 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg max-w-md w-full text-center">
          <p className="text-xl font-semibold mb-2">Estimated Cost: ₹{estimatedCost.toFixed(2)}</p>
          <p
            className={`text-lg font-bold ${
              budgetStatus === "Within Budget" ? "text-green-600" : "text-red-600"
            }`}
          >
            {budgetStatus}
          </p>
          <p className="mt-2 text-gray-700">{message}</p>
        </div>
      )}
    </div>
  );
}
