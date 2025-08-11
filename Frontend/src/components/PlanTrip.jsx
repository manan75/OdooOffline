
export default function PlanTrip() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#FFC5D3] to-[#006994]">
      <div className="glass bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg w-full max-w-4xl p-8">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Plan a New Trip
        </h1>

        {/* Trip Form */}
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">Start Date:</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">Select a Place:</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">Start Date:</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-white font-semibold mb-1">End Date:</label>
              <input
                type="date"
                className="w-full p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300"
              />
            </div>
          </div>
        </form>



        {/* Suggestions */}
        <div className="mt-8">
          <h2 className="text-[#BFDBFE] text-2xl font-semibold mb-4">
            Suggestions for Places to Visit / Activities to Perform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="h-40 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold"
              >
                Suggestion {num}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}