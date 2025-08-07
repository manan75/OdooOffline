import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src="https://i.pinimg.com/1200x/a0/26/0f/a0260fa676b3b9dd06519437b07e4d59.jpg"
        alt="Property"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 text-white">
        <h1 className="text-3xl md:text-5xl font-bold max-w-2xl mb-4">
          Solution to All Your Property Needs
        </h1>
        <p className="max-w-xl text-gray-300 mb-8">
          Get the features you want in all the properties we offer, with the best price you can get.
        </p>

        {/* Search/Info Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white/5 backdrop-blur-md rounded-lg overflow-hidden max-w-2xl mb-8">
          <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-white/20">
            <p className="text-sm text-white">Location</p>
            <p>Karimunjawa, Jepara</p>
          </div>
          <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-white/20">
            <p className="text-sm text-gray-300">Price</p>
            <p>IDR 1,300,000</p>
          </div>
          <div className="flex-1 p-4">
            <p className="text-sm text-gray-300">Type</p>
            <p>Minimalist</p>
          </div>
          <button className="bg-white text-black px-4 py-4 hover:bg-gray-200 transition">
            →
          </button>
        </div>

        {/* Stats */}
        <div className="flex space-x-8">
          <div>
            <p className="text-2xl font-bold">10</p>
            <p className="text-gray-300">Cities</p>
          </div>
          <div>
            <p className="text-2xl font-bold">27,725</p>
            <p className="text-gray-300">Properties</p>
          </div>
          <div>
            <p className="text-2xl font-bold">5,827</p>
            <p className="text-gray-300">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
