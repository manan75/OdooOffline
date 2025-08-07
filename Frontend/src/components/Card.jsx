import React from "react";

const Card = ({
  image = "https://hips.hearstapps.com/hmg-prod/images/northern-lights-above-festhelltinden-peak-and-royalty-free-image-1620383439.",
  title = "Hello World",
  description = "Hi this is a card hello",
  price = "100000",
  tags = ["hello", "eww"],
  buttonLabel = "Reserve"
}) => {
  return (
    <div
      className="relative w-80 h-[28rem] rounded-3xl overflow-hidden shadow-xl border border-white/10 transform transition-transform duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Glassy Content */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Spacer for 60% */}
        <div className="flex-1" />

        {/* 30% Content */}
        <div className="p-4 bg-[#45435C]/65 backdrop-blur-none text-white border-t border-white/10">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-lg font-semibold">{title}</h2>
            {price && (
              <span className="bg-[#45383F]/70 px-2 py-0.5 rounded text-xs">
                ${price}
              </span>
            )}
          </div>
          <p className="text-xs mb-2">{description}</p>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#45383F]/70 text-[10px] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 10% Action */}
        <div className="px-4 pb-3 bg-[#45435C]/65 backdrop-blur-md border-t border-white/10">
          <button className="w-full py-2 bg-white hover:bg-blue-300 rounded-full text-sm">
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
