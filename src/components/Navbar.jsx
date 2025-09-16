import React, { useState } from "react";

export default function Navbar({ onCreateClick, user, onLogout, onLoginClick }) {
  const [showProfile, setShowProfile] = useState(false);

  const handleCreateClick = () => {
    if (!user) {
      alert("Please login first to create a blog");
    } else {
      onCreateClick();
    }
  };

  return (
    <nav className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
      <h1 className="text-2xl font-bold">MyBlog</h1>

      <div className="flex items-center gap-4">
        {/* Create Blog Button */}
        <button
          onClick={handleCreateClick}
          className="bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-100 transition"
        >
          Create a Blog
        </button>

        {/* -------- Desktop (md+) view -------- */}
        {user ? (
          <div className="hidden md:flex items-center gap-2">
            <span>{user}</span>
            <button
              onClick={onLogout}
              className="bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="hidden md:block bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-100 transition"
          >
            Login
          </button>
        )}

        {/* -------- Mobile (sm) view -------- */}
        {user ? (
          <div className="relative md:hidden">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-100 transition"
            >
              Profile
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-4 z-50">
                <p className="font-semibold mb-2">👤 {user}</p>
                <button
                  onClick={onLogout}
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="md:hidden bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-100 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
