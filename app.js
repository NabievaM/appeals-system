const express = require("express");
const app = express();
const appealRoutes = require("./routes/appeals");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/api/appeals", appealRoutes);
app.use(errorHandler);

module.exports = app;
