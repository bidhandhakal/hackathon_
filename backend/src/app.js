const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const app = express();
app.use(cookieParser());
// Increase payload size limit for JSON (10MB for ImageKit URLs and other data)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("K hereko ");
});

app.use("/api/auth", authRoutes);

module.exports = app;
