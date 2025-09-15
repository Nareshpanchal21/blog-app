import React, { useState } from "react";
import Blog, { sampleBlogs } from "./components/blog";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function App() {
  const [blogs, setBlogs] = useState(sampleBlogs);
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [user, setUser] = useState(null); // logged-in user
  const [showLogin, setShowLogin] = useState(false);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  const addBlog = (newBlog) => {
    setBlogs([{ ...newBlog, owner: user }, ...blogs]); // add owner
    setShowCreate(false);
    setQuery("");
  };

  const deleteBlog = (index) => {
    if (blogs[index].owner === user) {
      const updated = blogs.filter((_, i) => i !== index);
      setBlogs(updated);
    } else {
      alert("You can only delete your own blogs!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
     <Navbar
  onCreateClick={() => setShowCreate(true)}
  user={user}
  onLogout={() => setUser(null)}
  onLoginClick={() => setShowLogin(true)}
/>


      {/* Login Modal */}
      {showLogin && <Login onLogin={(email) => { setUser(email); setShowLogin(false); }} onClose={() => setShowLogin(false)} />}

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
          {/* Search */}
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Search blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition">
              Search
            </button>
          </div>

          {/* Blog Listing */}
          {query ? (
            filteredBlogs.length > 0 ? (
              <Blog blogs={filteredBlogs} deleteBlog={deleteBlog} user={user} />
            ) : (
              <p className="text-gray-500 text-center mt-6">No blogs found.</p>
            )
          ) : (
            <p className="text-gray-500 text-center mt-6">
              Search a blog to see results.
            </p>
          )}
        </div>
      )}
      {!showCreate && !query && <HowItWorks />}
      <Footer />
    </div>
  );
}
