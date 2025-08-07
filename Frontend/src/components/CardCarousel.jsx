// CardGridCarousel.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./card";


export default function CardCarousel() {
  // Example cards data
  const initialCards = [
    {
      id: 1,
      image: "https://i.pinimg.com/1200x/a0/26/0f/a0260fa676b3b9dd06519437b07e4d59.jpg",
      title: "Cozy Cottage",
      description: "A lovely place to stay.",
      price: "120,000",
      tags: ["Lake View", "2 Beds"],
      buttonLabel: "Book Now"
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/400x600?apartment",
      title: "Modern Apartment",
      description: "Downtown living.",
      price: "200,000",
      tags: ["City Center", "3 Beds"],
      buttonLabel: "Book Now"
    },
    {
      id: 3,
      image: "https://source.unsplash.com/random/400x600?villa",
      title: "Luxury Villa",
      description: "Private and spacious.",
      price: "500,000",
      tags: ["Pool", "4 Beds"],
      buttonLabel: "Book Now"
    },
    {
      id: 4,
      image: "https://source.unsplash.com/random/400x600?cabin",
      title: "Rustic Cabin",
      description: "Nature retreat.",
      price: "80,000",
      tags: ["Forest", "1 Bed"],
      buttonLabel: "Book Now"
    }
  ];

  const [cards, setCards] = useState(initialCards);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const rotateLeft = () => {
    const newCards = [...cards];
    const first = newCards.shift();
    newCards.push(first);
    setCards(newCards);
  };

  const rotateRight = () => {
    const newCards = [...cards];
    const last = newCards.pop();
    newCards.unshift(last);
    setCards(newCards);
  };

  return (
    <div className="relative w-full bg-[#111] py-12">
      {/* Buttons */}
      <button
        onClick={rotateLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={rotateRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center px-4">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`transform transition duration-300 ${
              hoveredIndex === idx ? "scale-105" : ""
            }`}
          >
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
