import React from "react";
import Navbar from "./navbar";
import { Search } from "lucide-react";

export default function HeroSection_1() {
  return (
    <>
      <Navbar />
      <section className="relative w-full px-6 md:px-16 mt-20">
        {/* Banner Container */}
        <div className="relative rounded-3xl overflow-hidden h-[60vh]">
          {/* Background Image */}
          <img
            src="https://uttarakhandtourism.gov.in/assets/media/UTDB_media_logo1746526797mussorroe.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Text Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-4">
              Enjoy your Dream Vacation
            </h1>
            <p className="max-w-lg text-gray-200">
              Book Hotels, Flights, and Stay packages at the lowest price.
            </p>
          </div>

          
           
        </div>
      </section>
    </>
  );
}