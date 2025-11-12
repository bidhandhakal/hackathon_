const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("database connect vayo!");
    })
    .catch((err) => {
      console.log("mongodb connection error: ", err);
    });
}

module.exports = connectDB;
