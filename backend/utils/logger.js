/* ===================================
   SUCCESS LOG
=================================== */

const logSuccess = (
  message
) => {

  console.log(

    `✅ SUCCESS: ${message}`

  );
};

/* ===================================
   ERROR LOG
=================================== */

const logError = (
  message
) => {

  console.error(

    `❌ ERROR: ${message}`

  );
};

/* ===================================
   WARNING LOG
=================================== */

const logWarning = (
  message
) => {

  console.warn(

    `⚠ WARNING: ${message}`

  );
};

/* ===================================
   INFO LOG
=================================== */

const logInfo = (
  message
) => {

  console.info(

    `ℹ INFO: ${message}`

  );
};

/* ===================================
   EXPORTS
=================================== */

module.exports = {

  logSuccess,

  logError,

  logWarning,

  logInfo
};