const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "zain13",  
  database: "appiness-project",     
  logging: true,            
});

module.exports = sequelize;