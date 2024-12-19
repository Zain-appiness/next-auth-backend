const sequelize = require('../db'); // Adjust path to your db config
const { DataTypes } = require('sequelize');

// Create an empty object to hold our models
const db = {};

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.Project = require('./project')(sequelize, DataTypes);
db.DailyUpdate = require('./dailyUpdate')(sequelize, DataTypes);

// Set up associations between models
db.User.associate(db);
db.Project.associate(db);
db.DailyUpdate.associate(db);

// Add sequelize instance to db object for connection testing
db.sequelize = sequelize;
db.Sequelize = require('sequelize');

// Export db object with models and sequelize instance
module.exports = db;
