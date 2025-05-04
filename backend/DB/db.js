// db.js
const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://shivamverma:pa55word@cluster0.livpab1.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = { dbconnection };
