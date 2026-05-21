const express =
  require("express");

const router =
  express.Router();

const {

  getEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  deleteEmotion

} = require(
  "../controllers/emotions.controller"
);

const {

  protect

} = require(
  "../middleware/auth.middleware"
);

/* ===================================
   ROUTES
=================================== */

router.get(
  "/",
  protect,
  getEmotions
);

router.get(
  "/:id",
  protect,
  getEmotionById
);

router.post(
  "/",
  protect,
  createEmotion
);

router.put(
  "/:id",
  protect,
  updateEmotion
);

router.delete(
  "/:id",
  protect,
  deleteEmotion
);

/* ===================================
   EXPORT
=================================== */

module.exports =
  router;