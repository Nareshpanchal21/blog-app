import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-xl font-bold">MyBlog</h1>
          <p className="text-sm">© 2025 MyBlog. All rights reserved.</p>
        </div>

        {/* Right Section: Social Media */}
        <div className="flex gap-4">
          <span className="font-semibold mr-2 hidden sm:inline">Follow me:</span>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="p-2 rounded-full bg-white text-orange-500 hover:bg-orange-100 hover:text-orange-600 transition">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
             className="p-2 rounded-full bg-white text-orange-500 hover:bg-orange-100 hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="p-2 rounded-full bg-white text-orange-500 hover:bg-orange-100 hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className="p-2 rounded-full bg-white text-orange-500 hover:bg-orange-100 hover:text-blue-700 transition">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
