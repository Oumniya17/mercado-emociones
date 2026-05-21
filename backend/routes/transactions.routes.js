const express =
  require("express");

const router =
  express.Router();

const {

  createTransaction,
  getTransactions

} = require(

  "../controllers/transactions.controller"
);

const {

  protect

} = require(

  "../middleware/auth.middleware"
);

/* ===================================
   ROUTES
=================================== */

// GET ALL
router.get(

  "/",

  protect,

  getTransactions
);

// CREATE
router.post(

  "/",

  protect,

  createTransaction
);

/* ===================================
   EXPORT
=================================== */

module.exports =
  router;