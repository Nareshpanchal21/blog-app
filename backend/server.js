import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/blogApp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  owner: String,
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

// ✅ Get all blogs
app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// ✅ Create new blog
app.post("/api/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

// ✅ Delete blog by ID
app.delete("/api/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ✅ Start server
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
