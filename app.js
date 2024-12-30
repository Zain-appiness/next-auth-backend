const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");  
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const dailyUpdateRoutes = require('./routes/dailyupdateRoutes');
const app = express();
require("dotenv").config(); 
const db = require('./models');

// Middlewares
app.use(bodyParser.json());

// Corrected CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
       "https://next-auth-frontend-c1r3-gd1cuoavp-zain-appiness-projects.vercel.app", 
       "http://localhost:3000" // Allow localhost for development
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Reject other origins
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/daily/update', dailyUpdateRoutes);

// Test the database connection
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync the models with the database
db.sequelize.sync({ alter: false }) // Use `force: true` to recreate tables if needed
  .then(() => {
    console.log('Database and tables synced successfully!');
  })
  .catch((error) => console.error('Sync error:', error));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Catch-all error handler for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
