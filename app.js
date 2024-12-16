const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
const sequelize = require("./db");  // Import Sequelize instance

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userRoutes);

// Sync Sequelize models with the database before starting the server
sequelize.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Failed to synchronize the database:", err);
  });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
