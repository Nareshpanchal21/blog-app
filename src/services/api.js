const API_URL = "https://blog-app-mz67.onrender.com"; // Render backend URL

// Get blogs of specific user
export const getUserBlogs = async (userId) => {
  const response = await fetch(`${API_URL}/api/blogs/${userId}`);
  return response.json();
};

// Create a new blog
export const createBlog = async (blogData) => {
  const response = await fetch(`${API_URL}/api/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogData),
  });
  return response.json();
};
