// db.js
const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = { dbconnection };
