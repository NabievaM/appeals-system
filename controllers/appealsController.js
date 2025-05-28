const Appeal = require("../models/appeal");
const { Op } = require("sequelize");

exports.createAppeal = async (req, res) => {
  try {
    const { topic, message } = req.body;
    const appeal = await Appeal.create({ topic, message });
    res.status(201).json(appeal);
  } catch (err) {
    res.status(500).json({ error: "Не удалось создать обращение" });
  }
};

exports.startAppeal = async (req, res) => {
  try {
    const appeal = await Appeal.findByPk(req.params.id);
    if (!appeal) return res.status(404).json({ error: "Обращение не найдено" });

    appeal.status = "В работе";
    await appeal.save();
    res.json(appeal);
  } catch (err) {
    res.status(500).json({ error: "Не удалось начать рассмотрение обращения" });
  }
};

exports.completeAppeal = async (req, res) => {
  try {
    const { solution_text } = req.body;
    const appeal = await Appeal.findByPk(req.params.id);
    if (!appeal) return res.status(404).json({ error: "Обращение не найдено" });

    appeal.status = "Завершено";
    appeal.solution_text = solution_text;
    await appeal.save();
    res.json(appeal);
  } catch (err) {
    res.status(500).json({ error: "Не удалось завершить обращение" });
  }
};

exports.cancelAppeal = async (req, res) => {
  try {
    const { cancel_reason } = req.body;
    const appeal = await Appeal.findByPk(req.params.id);
    if (!appeal) return res.status(404).json({ error: "Обращение не найдено" });

    appeal.status = "Отменено";
    appeal.cancel_reason = cancel_reason;
    await appeal.save();
    res.json(appeal);
  } catch (err) {
    res.status(500).json({ error: "Не удалось отменить обращение" });
  }
};

exports.getAppeals = async (req, res) => {
  try {
    const { date, from, to } = req.query;
    const where = {};

    if (date) {
      const d = new Date(date);
      const startOfDay = new Date(d);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(d);
      endOfDay.setHours(23, 59, 59, 999);

      where.createdAt = {
        [Op.gte]: startOfDay,
        [Op.lte]: endOfDay,
      };
    } else if (from && to) {
      where.createdAt = {
        [Op.gte]: new Date(from),
        [Op.lte]: new Date(to),
      };
    }

    const appeals = await Appeal.findAll({ where });
    res.json(appeals);
  } catch (err) {
    res.status(500).json({ error: "Не удалось получить список обращений" });
  }
};

exports.cancelAllInProgress = async (req, res) => {
  try {
    const [count] = await Appeal.update(
      { status: "Отменено", cancel_reason: "Автоматически отменено" },
      { where: { status: "В работе" } }
    );
    res.json({ Отменено: count });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Не удалось отменить обращения в процессе рассмотрения" });
  }
};
