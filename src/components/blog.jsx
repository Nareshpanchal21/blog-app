import React, { useState } from "react";

export default function Blog({ blogs, user, deleteBlog }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleOpen = (blog) => setSelectedBlog(blog);
  const handleClose = () => setSelectedBlog(null);

  return (
    <div className="p-6 max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white border-l-4 border-orange-500 shadow-md p-4 rounded-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
          onClick={() => handleOpen(blog)}
        >
          <h2 className="text-orange-500 font-bold text-lg">{blog.title}</h2>
          <p className="text-gray-500 text-sm">
            By {blog.author || blog.owner || "Unknown"} | {blog.date} |{" "}
            {blog.category}
          </p>
          <p className="text-gray-700 mt-2 line-clamp-3">{blog.description}</p>
          <p className="text-orange-500 mt-1 text-sm font-semibold">
            Read more...
          </p>

          {/* Delete button if owner */}
          {user && blog.owner?.trim() === user?.trim() && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent modal open
                deleteBlog(blog._id, blog.owner);
              }}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative p-6">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-orange-500 mb-2">
              {selectedBlog.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              By {selectedBlog.author || selectedBlog.owner || "Unknown"} |{" "}
              {selectedBlog.date} | {selectedBlog.category}
            </p>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedBlog.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
