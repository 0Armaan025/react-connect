const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

app.use(cors());

// Connect to MongoDB using mongoose
const uri = 'mongodb+srv://armaan:armaan@cluster0.dikvcy4.mongodb.net/';
const dbURI = `${uri}blogs`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a MongoDB schema and model for the blog
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
});
const Blog = mongoose.model('Blog', blogSchema);

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// API endpoint to add a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get blogs' });
  }
});

// Start the server
const port = 5000; // You can use any available port
app.listen(port, () => console.log(`Server running on port ${port}`));