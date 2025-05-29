const express = require("express");
const router = express.Router();
const appealsController = require("../controllers/appealsController");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");

router.post(
  "/",
  [
    body("topic").notEmpty().withMessage("Тема обязательна"),
    body("message").notEmpty().withMessage("Сообщение обязательно"),
  ],
  validate,
  appealsController.createAppeal
);

router.patch("/:id/start", appealsController.startAppeal);
router.patch("/:id/complete", appealsController.completeAppeal);
router.patch("/:id/cancel", appealsController.cancelAppeal);

router.get("/", appealsController.getAppeals);

router.patch("/cancel/in-progress/all", appealsController.cancelAllInProgress);

module.exports = router;
