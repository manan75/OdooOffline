import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppContent } from "../Context/AppContext";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // 0=Sun ... 6=Sat
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function isDateInRange(date, start, end) {
  const d = new Date(date).setHours(0, 0, 0, 0);
  const s = new Date(start).setHours(0, 0, 0, 0);
  const e = new Date(end).setHours(0, 0, 0, 0);
  return d >= s && d <= e;
}

export default function SimpleTripsCalendar() {
  const { backendURL, userData } = useContext(AppContent);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData?.userId) return;
    setLoading(true);
    setError(null);

    axios
      .get(`${backendURL}/api/trips/getTrips/${userData.userId}`)
      .then((res) => {
        setTrips(res.data);
      })
      .catch((err) => {
        setError("Failed to load trips");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [backendURL, userData]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    calendarDays.push(new Date(currentYear, currentMonth, day));

  if (loading)
    return <div className="p-6 text-center">Loading trips...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-600">{error}</div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-3 hover:bg-gray-200 rounded"
          title="Previous Month"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString(
            undefined,
            { month: "long", year: "numeric" }
          )}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-3 hover:bg-gray-200 rounded"
          title="Next Month"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-700 mb-3 select-none">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2 text-base">
        {calendarDays.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} className="p-4"></div>;
          }

          const tripsForDay = trips.filter((trip) =>
            isDateInRange(date, trip.start_date, trip.end_date || trip.start_date)
          );

          const isToday =
            date.toDateString() === new Date().toDateString();

          return (
            <div
              key={date.toISOString()}
              className={`p-4 border rounded min-h-[90px] flex flex-col cursor-default ${
                isToday
                  ? "bg-blue-100 border-blue-600"
                  : "border-gray-300"
              }`}
              title={
                tripsForDay.length
                  ? tripsForDay.map((t) => `${t.trip_name}\n`).join("")
                  : ""
              }
            >
              <div className="font-semibold mb-2 text-lg">{date.getDate()}</div>
              <div className="flex flex-col space-y-1 overflow-y-auto max-h-[5rem] text-sm">
                {tripsForDay.map((trip) => (
                  <div
                    key={trip.trip_id}
                    className="bg-blue-600 text-white rounded px-2 truncate"
                    title={`${trip.trip_name} (${trip.start_date} to ${
                      trip.end_date || trip.start_date
                    })`}
                  >
                    {trip.trip_name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
