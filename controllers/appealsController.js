const appealService = require("../services/appeal");

exports.createAppeal = async (req, res, next) => {
  try {
    const appeal = await appealService.create(req.body);
    res.status(201).json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.startAppeal = async (req, res, next) => {
  try {
    const appeal = await appealService.updateStatus(req.params.id, "В работе");
    if (!appeal) return res.status(404).json({ error: "Обращение не найдено" });
    res.json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.completeAppeal = async (req, res, next) => {
  try {
    const appeal = await appealService.updateStatus(
      req.params.id,
      "Завершено",
      { solution_text: req.body.solution_text }
    );
    if (!appeal) return res.status(404).json({ error: "Обращение не найдено" });
    res.json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.cancelAppeal = async (req, res, next) => {
  try {
    const appeal = await appealService.updateStatus(req.params.id, "Отменено", {
      cancel_reason: req.body.cancel_reason,
    });
    if (!appeal) return res.status(404).json({ error: "Обращение не найдено" });
    res.json(appeal);
  } catch (err) {
    next(err);
  }
};

exports.getAppeals = async (req, res, next) => {
  try {
    const { date, from, to } = req.query;
    const where = {};

    if (date) {
      const d = new Date(date);
      const start = new Date(d.setHours(0, 0, 0, 0));
      const end = new Date(d.setHours(23, 59, 59, 999));
      where.createdAt = { [Op.between]: [start, end] };
    } else if (from && to) {
      where.createdAt = { [Op.between]: [new Date(from), new Date(to)] };
    }

    const appeals = await appealService.getAll(where);
    res.json(appeals);
  } catch (err) {
    next(err);
  }
};

exports.cancelAllInProgress = async (req, res, next) => {
  try {
    const [count] = await appealService.cancelAllInProgress();
    res.json({ Отменено: count });
  } catch (err) {
    next(err);
  }
};
