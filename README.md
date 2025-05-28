📁 Конфигурация базы данных
Чтобы избежать раскрытия учетных данных, файл config/database.js добавлен в .gitignore.

Для запуска проекта локально вы можете создать собственный файл config/database.js, используя следующий шаблон:

```js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "appeals-system",
  "YOUR_USERNAME",
  "YOUR_PASSWORD",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
```
