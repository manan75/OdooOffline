export default function Card ({
  image = "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  title = "NEW DESIGN",
  timeAgo = "2 hours ago",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum praesentium amet, perspiciatis expedita quidem dolore...",
  className = ""
}) {
  return (
    <div className={`relative w-full rounded-3xl overflow-hidden shadow-xl bg-white group ${className}`}>
      {/* Image */}
      <div
        className="w-full h-64 md:h-72 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Overlay container */}
      <div className="absolute bottom-0 left-0 w-full transition-transform duration-300 group-hover:translate-y-0 translate-y-[60%]">
        {/* Wave shape */}
        <svg
          className="w-full h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C150,80 350,0 500,40 L500,80 L0,80 Z"
            fill="white"
          />
        </svg>

        {/* White content */}
        <div className="bg-white px-5 pb-20 pt-1">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-xs text-gray-500">{timeAgo}</p>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};
