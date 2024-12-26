const { Sequelize } = require("sequelize");
import pg from 'pg';

require("dotenv").config(); 

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // required for secure connections to Supabase
      rejectUnauthorized: false, // required for Supabase SSL
    }
  },
  dialectModule: pg
});


module.exports = sequelize;