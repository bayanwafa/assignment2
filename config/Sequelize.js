const {sequelize}=require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASWWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  });

  module.exports = sequelize;