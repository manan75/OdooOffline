export default function UserCard({ image, destination, date, type, rating, status }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 relative shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="text-4xl mb-4 text-center">{image}</div>
      <div className="text-center">
        {destination && <h4 className="font-semibold mb-2 text-gray-800">{destination}</h4>}
        {date && <p className="text-sm text-gray-600 mb-2">{date}</p>}
        {type && <p className="text-xs text-gray-500 mb-2">{type}</p>}
        {rating && <p className="text-yellow-500 mb-4">{rating}</p>}
        {status && <p className="text-blue-600 mb-4 text-sm font-medium">{status}</p>}
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
          View
        </button>
      </div>
    </div>
  );
}
