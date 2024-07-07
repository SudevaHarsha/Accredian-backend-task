const express = require('express');
const app = express();
const cors = require('cors');

const referralRoutes = require('./routes/referralRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', referralRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
