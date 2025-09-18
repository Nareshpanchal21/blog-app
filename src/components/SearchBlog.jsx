import React, { useState } from "react";

export default function SearchBlog() {
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "https://blog-app-mz67.onrender.com/api"; // aapki API key
  const BLOG_ID = "3213900"; // aapka blog ID

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/search?q=${query}&key=${API_KEY}`
      );
      const data = await response.json();
      setBlogs(data.items || []); // Blogger API returns items array
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Search Bar */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Blog Results */}
      <div className="grid gap-4">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <h3 className="text-orange-500 font-bold text-lg">{blog.title}</h3>
              <div
                className="text-gray-700 mt-2"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
