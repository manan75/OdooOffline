import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";



export default function TravelPlanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripName, startDate, endDate, tripId } = location.state || {};
  const { backendURL } = useContext(AppContent);

  const tripStart = new Date(startDate);
  const tripEnd = new Date(endDate);
  const totalDays =
    Math.floor((tripEnd - tripStart) / (1000 * 60 * 60 * 24)) + 1;

  const [days, setDays] = useState(2);
  const [dayPlans, setDayPlans] = useState(
    Array(2).fill({
      city: null,
      citySearch: "",
      cityOptions: [],
      activities: [],
      selectedActivities: [],
    })
  );

  const handleAddDay = () => {
    if (days < totalDays) {
      setDays((prev) => prev + 1);
      setDayPlans((prev) => [
        ...prev,
        {
          city: null,
          citySearch: "",
          cityOptions: [],
          activities: [],
          selectedActivities: [],
        },
      ]);
    }
  };

  const searchCities = async (dayIndex, query) => {
    try {
      const res = await axios.get(`${backendURL}/api/search/cities?q=${query}`);
      updateDay(dayIndex, { citySearch: query, cityOptions: res.data });
    } catch (err) {
      console.error("❌ Error fetching cities:", err);
    }
  };

  const selectCity = async (dayIndex, city) => {
    try {
      const res = await axios.get(
        `${backendURL}/api/search/getactivities/${city.city_id}`
      );
      updateDay(dayIndex, {
        city,
        activities: res.data,
        cityOptions: [],
        citySearch: city.name,
        selectedActivities: [],
      });
    } catch (err) {
      console.error("❌ Error fetching activities:", err);
    }
  };

  const addActivity = (dayIndex, activity) => {
    setDayPlans((prev) => {
      const newPlans = [...prev];
      const dayPlan = { ...newPlans[dayIndex] };

      if (!dayPlan.selectedActivities.find((a) => a.activity_id === activity.activity_id)) {
        dayPlan.selectedActivities.push(activity);
      }

      newPlans[dayIndex] = dayPlan;
      return newPlans;
    });
  };

  const removeActivity = (dayIndex, activityId) => {
    setDayPlans((prev) => {
      const newPlans = [...prev];
      newPlans[dayIndex].selectedActivities =
        newPlans[dayIndex].selectedActivities.filter(
          (a) => a.activity_id !== activityId
        );
      return newPlans;
    });
  };

  const updateDay = (index, updatedFields) => {
    setDayPlans((prev) => {
      const newPlans = [...prev];
      newPlans[index] = { ...newPlans[index], ...updatedFields };
      return newPlans;
    });
  };

  const getDateForDay = (index) => {
    const date = new Date(tripStart);
    date.setDate(date.getDate() + index);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Submit to backend
  const handleSubmit = async () => {
    try {
      for (let i = 0; i < dayPlans.length; i++) {
        const plan = dayPlans[i];
        if (!plan.city) continue;

        const destDate = new Date(tripStart);
        destDate.setDate(destDate.getDate() + i);

        // 1️ Insert into trip_destinations
        const destRes = await axios.post(`${backendURL}/api/trips/tripDestinations`, {
          trip_id: tripId,
          city_id: plan.city.city_id,
          dest_date: destDate.toISOString().split("T")[0], // YYYY-MM-DD
        });

        const trip_dest_id = destRes.data.trip_dest_id;

        // 2 Insert activities for this destination
        for (const act of plan.selectedActivities) {
          await axios.post(`${backendURL}/api/trips/tripActivities`, {
            trip_dest_id,
            activity_id: act.activity_id,
          });
        }
      }

      alert("Trip plan saved successfully!");
      navigate('/travelDashboard');

    } catch (err) {
      console.error("❌ Error saving trip:", err);
      alert("Failed to save trip plan.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-cover bg-center relative flex justify-center items-center p-6">
      <img
        src="https://i.pinimg.com/1200x/53/b3/bc/53b3bc64567c1f1d0e01154f0676dd72.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-6xl p-6 rounded-xl backdrop-blur-lg bg-white/20 shadow-2xl border border-white/30 text-white">
        <h1 className="text-2xl font-bold mb-6">{tripName}</h1>

        {[...Array(days)].map((_, dayIndex) => {
          const plan = dayPlans[dayIndex];
          return (
            <div key={dayIndex} className="mb-8">
              <span className="inline-block px-3 py-1 bg-white/30 rounded-md mb-3">
                Day {dayIndex + 1} — {getDateForDay(dayIndex)}
              </span>

              <input
                type="text"
                placeholder="Search city..."
                value={plan.citySearch}
                onChange={(e) => searchCities(dayIndex, e.target.value)}
                className="w-full p-3 rounded-md bg-white/30 placeholder-white text-white outline-none border border-white/30 focus:border-white/60"
              />
              {plan.cityOptions.length > 0 && (
                <div className="bg-white/20 mt-1 rounded-md">
                  {plan.cityOptions.map((city) => (
                    <div
                      key={city.city_id}
                      onClick={() => selectCity(dayIndex, city)}
                      className="p-2 cursor-pointer hover:bg-white/30"
                    >
                      {city.name} {city.state && `(${city.state})`}
                    </div>
                  ))}
                </div>
              )}

              {plan.city && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">
                    Select Activities in {plan.city.name}
                  </h3>
                  <div className="bg-white/10 p-3 rounded-md mb-3">
                    {plan.activities.map((act) => (
                      <div
                        key={act.activity_id}
                        className="flex justify-between items-center mb-2"
                      >
                        <span>{act.name}</span>
                        <button
                          onClick={() => addActivity(dayIndex, act)}
                          className="px-2 py-1 bg-green-500 rounded hover:bg-green-600"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>

                  {plan.selectedActivities.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Planned Activities</h4>
                      {plan.selectedActivities.map((act) => (
                        <div
                          key={act.activity_id}
                          className="flex justify-between items-center mb-2"
                        >
                          <span>{act.name}</span>
                          <button
                            onClick={() =>
                              removeActivity(dayIndex, act.activity_id)
                            }
                            className="px-2 py-1 bg-red-500 rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleAddDay}
            disabled={days >= totalDays}
            className={`px-4 py-2 rounded-md border border-white/50 ${
              days >= totalDays
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white/30 hover:bg-white/40"
            }`}
          >
            + Add Day
          </button>

          {/* ✅ Submit button */}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Save Trip Plan
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
