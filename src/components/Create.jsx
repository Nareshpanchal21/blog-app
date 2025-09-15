// File: Create.jsx
import React, { useState } from "react";

export default function Create({ addBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !category || !content) {
      alert("Please fill all fields!");
      return;
    }

    // Add blog using parent function
    addBlog({ title, author, category, description: content.slice(0, 200), content });
    
    // Clear form
    setTitle("");
    setAuthor("");
    setCategory("");
    setContent("");
    alert("Blog created successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Author */}
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Content */}
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 h-72 resize-none"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 text-white font-semibold px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}
