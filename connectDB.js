// connectDB.js

const Sequelize = require("sequelize");

const database = "todo_db";
const username = "postgres";
const password = "tlvv123";
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const connect = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      throw error; // Throw the error to propagate it to the caller
    }
  };

module.exports = {
    connect,
    sequelize
  };