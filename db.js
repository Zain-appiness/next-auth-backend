const { Sequelize } = require("sequelize");

require("dotenv").config(); // At the top of your file
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
});


module.exports = sequelize;