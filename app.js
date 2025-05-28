const express = require("express");
const app = express();
const sequelize = require("./config/database");
const appealsRouter = require("./routes/appeals");

app.use(express.json());
app.use("/api/appeals", appealsRouter);

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
