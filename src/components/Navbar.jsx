import React from "react";

export default function Navbar({ onCreateClick, user, onLogout, onLoginClick }) {
  const handleCreateClick = () => {
    if (!user) {
      alert("Please login first to create a blog");
    } else {
      onCreateClick();
    }
  };

  return (
    <nav className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">MyBlog</h1>

      <div className="flex items-center gap-4">
        {/* Create Blog Button */}
        <button
          onClick={handleCreateClick}
          className="bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-100 transition"
        >
          Create a Blog
        </button>

        {/* Login / User info */}
        {user ? (
          <div className="flex items-center gap-2">
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
            className="bg-white text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-100 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
