/* ===================================
   GET USERS
=================================== */

async function getUsers() {

  return await apiGet(
    "/users"
  );
}

/* ===================================
   GET USER
=================================== */

async function getUserById(
  id
) {

  return await apiGet(
    `/users/${id}`
  );
}

/* ===================================
   CREATE USER
=================================== */

async function createUser(
  userData
) {

  return await apiPost(
    "/users",
    userData
  );
}

/* ===================================
   UPDATE USER
=================================== */

async function updateUser(
  id,
  userData
) {

  return await apiPut(
    `/users/${id}`,
    userData
  );
}

/* ===================================
   DELETE USER
=================================== */

async function deleteUser(
  id
) {

  return await apiDelete(
    `/users/${id}`
  );
}