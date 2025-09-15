import React, { useState } from "react";

export default function Blog({ blogs, user, deleteBlog }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleOpen = (blog) => setSelectedBlog(blog);
  const handleClose = () => setSelectedBlog(null);

  return (
    <div className="p-6 max-w-4xl mx-auto grid gap-6">
      {/* Blog Cards */}
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="bg-white border-l-4 border-orange-500 shadow-md p-4 rounded-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
          onClick={() => handleOpen(blog)}
        >
          <h2 className="text-orange-500 font-bold text-lg">{blog.title}</h2>
          <p className="text-gray-500 text-sm">
            By {blog.author} | {blog.date} | {blog.category}
          </p>
          <p className="text-gray-700 mt-2 line-clamp-3">{blog.description}</p>
          <p className="text-orange-500 mt-1 text-sm font-semibold">
            Read more...
          </p>

          {/* Delete button if owner */}
          {user && blog.owner === user && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent modal open
                deleteBlog(index);
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
            {/* Close Button */}
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
              By {selectedBlog.author} | {selectedBlog.date} | {selectedBlog.category}
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

// Sample blogs with owner field (initially undefined)
export const sampleBlogs = [
  {
    title: "Understanding React: A Comprehensive Guide",
    author: "Naresh Panchal",
    date: "14 Sep 2025",
    category: "Web Development",
    description:
      "Dive deep into React, its core concepts, and how to build dynamic web applications efficiently.",
    content: `React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page...`,
    owner: null, // owner will be set when user creates
  },
  {
    title: "Mastering Tailwind CSS: A Developer's Perspective",
    author: "Priya Sharma",
    date: "10 Sep 2025",
    category: "CSS Frameworks",
    description:
      "Learn how Tailwind CSS revolutionizes styling in web development with its utility-first approach.",
    content: `Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs...`,
    owner: null,
  },

];
