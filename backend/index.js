const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");
// const multer = require("multer");
const { dbconnection } = require("./DB/db");

dotenv.config();

dbconnection();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/locations", locationRoutes);

// app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
