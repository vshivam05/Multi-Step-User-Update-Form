const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");
const { dbconnection } = require("./DB/db");

dotenv.config();
dbconnection();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Created uploads directory.");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/locations", locationRoutes);
app.use("/api/users", userRoutes);

// Optional: Make uploaded files publicly accessible
app.use("/uploads", express.static(uploadsDir));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
