import React, { useState, useEffect } from "react";
import Blog from "./components/blog";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import { getUserBlogs, createBlog } from "./services/api";


export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [showLogin, setShowLogin] = useState(false);

  // ✅ Fetch blogs from backend
  const fetchBlogs = () => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Add blog
  const addBlog = (newBlog) => {
    if (!user) return alert("Please login first!");
    fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newBlog, owner: user }),
    })
      .then((res) => res.json())
      .then(() => fetchBlogs());

    setShowCreate(false);
    setSearchQuery("");
  };

  // ✅ Delete blog
  const deleteBlog = (id, owner) => {
    if (!user) return alert("Please login first!");
    if (owner?.trim() !== user?.trim()) {
      return alert("You can only delete your own blogs!");
    }

    fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchBlogs())
      .catch((err) => console.error(err));
  };

  // ✅ Filtering logic
  const filteredBlogs = blogs
    .filter((blog) => (user ? blog.owner?.trim() === user?.trim() : true))
    .filter((blog) => {
      // Agar user login hai → search ki zarurat nahi
      if (user) return true;
      // Agar login nahi hai → search karna compulsory
      return searchQuery
        ? blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
    });

  // ✅ Login handler
  const handleLogin = (email) => {
    const trimmedEmail = email.trim();
    setUser(trimmedEmail);
    localStorage.setItem("user", trimmedEmail);
    setShowLogin(false);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setSearchQuery(""); // logout par search clear
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onCreateClick={() => setShowCreate(true)}
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowLogin(true)}
      />

      {/* Login Modal */}
      {showLogin && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

      {/* Create Blog */}
      {showCreate ? (
        <div className="max-w-3xl mx-auto p-6">
          <button
            onClick={() => setShowCreate(false)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mb-4 transition"
          >
            ← Back
          </button>
          <Create addBlog={addBlog} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6">
          {/* Search (sirf logout ke baad kaam karega) */}
          {!user && (
            <div className="flex mb-6">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition"
                onClick={() => setSearchQuery(searchQuery)}
              >
                Search
              </button>
            </div>
          )}

          {/* Blog Listing */}
          {filteredBlogs.length > 0 ? (
            <Blog blogs={filteredBlogs} deleteBlog={deleteBlog} user={user} />
          ) : !user && searchQuery ? (
            <p className="text-gray-500 text-center mt-6">No blogs found.</p>
          ) : null}
        </div>
      )}

      {/* ✅ HowItWorks → sirf tab show ho jab user login na ho & search empty ho */}
      {!showCreate && !user && !searchQuery && <HowItWorks />}

      <Footer />
    </div>
  );
}
