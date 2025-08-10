// AdminDashboard.jsx
import React from "react";
import { FiHome, FiBarChart2, FiMessageSquare, FiSettings, FiLogOut } from "react-icons/fi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard_3 = () => {
  // Color palette assignments
  const colors = {
    primary: "#40B7FF", // 60%
    secondary: "#F2F2F2", // 30%
    accent: "#174D38", // 20%
    light: "#E0F3FF",
    darkAccent: "#4D1717",
  };

  // Pie chart data
  const pieData = {
    labels: ["Computer Science", "Science", "Business"],
    datasets: [
      {
        label: "Progress",
        data: [37, 83, 51],
        backgroundColor: [colors.primary, colors.accent, colors.darkAccent],
        borderColor: colors.secondary,
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 60%, ${colors.secondary} 30%, ${colors.accent} 20%)`,
      }}
    >
      {/* Sidebar */}
      <aside className="w-64 p-6 flex flex-col text-white" style={{ backgroundColor: colors.accent }}>
        <div className="text-2xl font-bold mb-10">Edu Admin</div>
        <nav className="flex-1 space-y-6">
          <a href="#" className="flex items-center space-x-3 hover:opacity-80">
            <FiHome /> <span>Schedule</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:opacity-80">
            <FiBarChart2 /> <span>Progress</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:opacity-80">
            <FiMessageSquare /> <span>Messages</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:opacity-80">
            <FiSettings /> <span>Settings</span>
          </a>
        </nav>
        <a href="#" className="flex items-center space-x-3 hover:opacity-80 mt-auto">
          <FiLogOut /> <span>Log out</span>
        </a>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8" style={{ backgroundColor: colors.secondary }}>
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/3 p-2 rounded-lg border"
          />
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
            <span>Kate G.</span>
          </div>
        </div>

        {/* Highlight Section */}
        <section
          className="p-6 rounded-xl mb-6 text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <h1 className="text-2xl font-bold">Effective education!</h1>
          <p>Learning is easy and effective with us. Track progress and grow in knowledge!</p>
        </section>

        {/* Events */}
        <section className="mb-6">
          <h2 className="font-semibold mb-3">Events</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="font-bold">26.02</p>
              <p>UX/UI Workshop</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="font-bold">02.03</p>
              <p>English Lecture</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="font-bold">07.03</p>
              <p>Business Lecture</p>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="mb-6">
          <h2 className="font-semibold mb-3">Timing & Progress</h2>
          <div className="grid grid-cols-2 gap-6 items-center">
            {/* Progress bars */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <span>Computer Science</span> <span>37%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: "37%" }}></div>
              </div>
              <div className="flex justify-between mt-4 mb-2">
                <span>Science</span> <span>83%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "83%" }}></div>
              </div>
              <div className="flex justify-between mt-4 mb-2">
                <span>Business</span> <span>51%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-red-800 h-2 rounded-full" style={{ width: "51%" }}></div>
              </div>
            </div>

            {/* Pie chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </section>
      </main>

      {/* Right Panel */}
      <aside className="w-64 p-6" style={{ backgroundColor: colors.light }}>
        <h2 className="font-semibold mb-4">Your Courses</h2>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>Art</span> <span>35 hrs</span>
          </li>
          <li className="flex justify-between">
            <span>Business</span> <span>40 hrs</span>
          </li>
          <li className="flex justify-between">
            <span>Science</span> <span>25 hrs</span>
          </li>
          <li className="flex justify-between">
            <span>Mathematics</span> <span>15 hrs</span>
          </li>
        </ul>
        <div
          className="mt-8 p-4 rounded-lg text-white text-center"
          style={{ backgroundColor: colors.darkAccent }}
        >
          Upgrade to Premium
        </div>
      </aside>
    </div>
  );
};

export default Dashboard_3;
