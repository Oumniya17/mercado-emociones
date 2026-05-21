/* ===================================
   GET TRANSACTIONS
=================================== */

async function getTransactions() {

  return await apiGet(
    "/transactions"
  );
}

/* ===================================
   CREATE TRANSACTION
=================================== */

async function createTransaction(
  transactionData
) {

  return await apiPost(
    "/transactions",
    transactionData
  );
}

/* ===================================
   GET TRANSACTION
=================================== */

async function getTransactionById(
  id
) {

  return await apiGet(
    `/transactions/${id}`
  );
}

/* ===================================
   DELETE TRANSACTION
=================================== */

async function deleteTransaction(
  id
) {

  return await apiDelete(
    `/transactions/${id}`
  );
}