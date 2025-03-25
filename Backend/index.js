const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const path = require('path');


// Import models
const User = require('./models/User');
const Task=require("./models/Task")
const authMiddleware = require('./middlewares/auth');


// Import routes
const userRoutes = require('./routes/authRoutes');
const taskRoutes=require("./routes/taskRoutes")


// Middleware
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
// In your backend app.js
app.use(cors({
    origin: ' http://localhost:3001', 
    credentials: true 
  }));
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Define routes with proper callbacks
app.use('/', userRoutes);
app.use('/',authMiddleware , taskRoutes);




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});