const express =
  require("express");

const router =
  express.Router();

const {

  getDashboardStats,
  getMarketAnalytics,
  getUserAnalytics,
  getEmotionAnalytics

} = require(
  "../controllers/analytics.controller"
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
  "/dashboard",
  protect,
  getDashboardStats
);

router.get(
  "/market",
  protect,
  getMarketAnalytics
);

router.get(
  "/users",
  protect,
  getUserAnalytics
);

router.get(
  "/emotions",
  protect,
  getEmotionAnalytics
);

/* ===================================
   EXPORT
=================================== */

module.exports =
  router;