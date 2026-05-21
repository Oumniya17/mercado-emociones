/* ===================================
   SAVE TOKEN
=================================== */

function saveToken(token) {

  localStorage.setItem(
    CONFIG.TOKEN_KEY,
    token
  );
}

/* ===================================
   GET TOKEN
=================================== */

function getToken() {

  return localStorage.getItem(
    CONFIG.TOKEN_KEY
  );
}

/* ===================================
   REMOVE TOKEN
=================================== */

function removeToken() {

  localStorage.removeItem(
    CONFIG.TOKEN_KEY
  );
}

/* ===================================
   SAVE USER
=================================== */

function saveUser(user) {

  localStorage.setItem(
    "ebm_user",
    JSON.stringify(user)
  );
}

/* ===================================
   GET USER
=================================== */

function getUser() {

  return JSON.parse(
    localStorage.getItem(
      "ebm_user"
    )
  );
}

/* ===================================
   CLEAR STORAGE
=================================== */

function clearStorage() {

  localStorage.clear();
}