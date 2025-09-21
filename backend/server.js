// File: server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

// =====================
// ✅ CORS Setup (Allow Local + Both Frontends)
// =====================
app.use(
  cors({
    origin: [
      "http://localhost:5173",               // Local dev frontend
      "https://blog-app-mz67.onrender.com",  // Backend deployed frontend
      "https://blog-app-1-bg4f.onrender.com" // Actual deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// =====================
// ✅ MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =====================
// ✅ User Schema & Model
// =====================
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // plain text (hash later)
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

// =====================
// ✅ Blog Schema & Model
// =====================
const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    owner: String,
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);

// =====================
// ✅ User Routes
// =====================

// Signup
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password) return res.status(400).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// =====================
// ✅ Blog Routes
// =====================

// Get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err });
  }
});

// Create blog
app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, owner } = req.body;
    const blog = new Blog({ title, content, owner });
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err });
  }
});

// Delete blog
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err });
  }
});

// =====================
// ✅ Start Server
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
