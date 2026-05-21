const express =
  require("express");

const router =
  express.Router();

const {

  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser

} = require(
  "../controllers/users.controller"
);

const {

  protect,
  adminOnly

} = require(
  "../middleware/auth.middleware"
);

/* ===================================
   ROUTES
=================================== */

router.get(
  "/",
  protect,
  getUsers
);

router.get(
  "/:id",
  protect,
  getUserById
);

router.post(
  "/",
  protect,
  adminOnly,
  createUser
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateUser
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteUser
);

/* ===================================
   EXPORT
=================================== */

module.exports =
  router;