/* ===================================
   GET DASHBOARD STATS
=================================== */

async function getDashboardStats() {

  return await apiGet(
    "/analytics/dashboard"
  );
}

/* ===================================
   GET MARKET ANALYTICS
=================================== */

async function getMarketAnalytics() {

  return await apiGet(
    "/analytics/market"
  );
}

/* ===================================
   GET USER ANALYTICS
=================================== */

async function getUserAnalytics() {

  return await apiGet(
    "/analytics/users"
  );
}

/* ===================================
   GET EMOTION ANALYTICS
=================================== */

async function getEmotionAnalytics() {

  return await apiGet(
    "/analytics/emotions"
  );
}