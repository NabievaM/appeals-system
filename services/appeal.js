const Appeal = require("../models/appeal");

exports.create = (data) => Appeal.create(data);

exports.getAll = (filter = {}) => Appeal.findAll({ where: filter });

exports.findById = (id) => Appeal.findByPk(id);

exports.updateStatus = async (id, status, extra = {}) => {
  const appeal = await Appeal.findByPk(id);
  if (!appeal) return null;

  appeal.status = status;
  Object.assign(appeal, extra);
  await appeal.save();
  return appeal;
};

exports.cancelAllInProgress = () =>
  Appeal.update(
    { status: "Отменено", cancel_reason: "Автоматически отменено" },
    { where: { status: "В работе" } }
  );
