const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import and use the user router
const userRoutes = require('./routes/UserRoutes'); // adjust path if needed
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
