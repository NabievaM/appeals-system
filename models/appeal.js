const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appeal = sequelize.define(
  "Appeal",
  {
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Новое", "В работе", "Завершено", "Отменено"),
      defaultValue: "Новое",
    },
    solution_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancel_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Appeal;
