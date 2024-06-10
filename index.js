const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./app/routes/auth");
const config = require("./app/config/config");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth Service started on port ${PORT}`));

module.exports = app;