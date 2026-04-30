require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Make 'uploads' folder statically serveable
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Root Route
app.get('/', (req, res) => {
  res.send('Pingaara API is running...');
});

// API Routes will be registered here
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
