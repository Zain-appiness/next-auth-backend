const sequelize = require('../db'); 
const { DataTypes } = require('sequelize');


const db = {};

db.User = require('./user')(sequelize, DataTypes);
db.Project = require('./project')(sequelize, DataTypes);
db.DailyUpdate = require('./dailyUpdate')(sequelize, DataTypes);

// Set up for associations between models
db.User.associate(db);
db.Project.associate(db);
db.DailyUpdate.associate(db);

// instance to db object for connection testing
db.sequelize = sequelize;
db.Sequelize = require('sequelize');

module.exports = db;
