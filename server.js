const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("DB synced");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
