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



const spaceScheme = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: String, required: true },
  repoLink: { type: String, required: true },
  description: { type: String, required: true },
});

const Blog = mongoose.model('Blog', blogSchema);
const Space = mongoose.model('Space', spaceScheme);

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

function generateRandomToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}


app.post('/api/space', async (req, res) => {
  try {
    const token = generateRandomToken(16);
    console.log(req.body);
    const { name, repoLink, description } = req.body;
    const newBlog = new Space({ name, token, repoLink, description });
    
    await newBlog.save();
    console.log('done')
    
    res.status(200).json({ message: 'Space created successfully' , token: token});

  } catch (error) {
    res.status(500).json({ error: 'Failed to create space' });
  }
});

app.get('/api/space/:name', async (req, res) => {
  const spaceName = req.params.name;
  try {
    const space = await Space.findOne({ name: spaceName });
    if (space) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check space existence' });
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