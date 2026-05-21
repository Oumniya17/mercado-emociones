const express =
  require("express");

const router =
  express.Router();

const {

  register,
  login,
  refreshToken,
  getProfile,
  logout

} = require(
  "../controllers/auth.controller"
);

const {

  protect

} = require(
  "../middleware/auth.middleware"
);

/* ===================================
   ROUTES
=================================== */

// REGISTER
router.post(
  "/register",
  register
);

// LOGIN
router.post(
  "/login",
  login
);

// REFRESH TOKEN
router.post(
  "/refresh-token",
  refreshToken
);

// PROFILE
router.get(
  "/profile",
  protect,
  getProfile
);

// LOGOUT
router.post(
  "/logout",
  protect,
  logout
);

/* ===================================
   EXPORT
=================================== */

module.exports =
  router;