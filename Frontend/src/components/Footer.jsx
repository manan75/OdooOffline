import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-500 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">GlobeTrotter</h2>
          <p className="mt-3 text-sm text-blue-100">
            Plan your perfect journey, discover new places, and create memories
            that last a lifetime.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/destinations" className="hover:underline">Destinations</a></li>
            <li><a href="/plan" className="hover:underline">Plan a Trip</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-200"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-200"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-200"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-200"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-700 py-4 text-center text-sm text-blue-100">
        © {new Date().getFullYear()} GlobeTrotter. All rights reserved.
      </div>
    </footer>
  );
}
