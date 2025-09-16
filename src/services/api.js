const API_URL = "http://localhost:5000"; // jab tak local pe run kar rahe ho

// Get blogs of specific user
export const getUserBlogs = async (userId) => {
  const response = await fetch(`${API_URL}/blogs/${userId}`);
  return response.json();
};

// Create a new blog
export const createBlog = async (blogData) => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogData),
  });
  return response.json();
};
