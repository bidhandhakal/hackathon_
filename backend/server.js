//// backend/server.js
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.listen(8000, () => {
  console.log("server start vayo");
});
