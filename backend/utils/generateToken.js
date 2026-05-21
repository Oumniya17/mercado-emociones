const jwt =
  require("jsonwebtoken");

/* ===================================
   GENERATE ACCESS TOKEN
=================================== */

const generateAccessToken = (
  userId,
  role
) => {

  return jwt.sign(

    {

      id: userId,

      role: role
    },

    process.env.JWT_SECRET,

    {

      expiresIn:
        process.env.JWT_EXPIRES
    }
  );
};

/* ===================================
   GENERATE REFRESH TOKEN
=================================== */

const generateRefreshToken = (
  userId
) => {

  return jwt.sign(

    {

      id: userId
    },

    process.env.JWT_REFRESH_SECRET,

    {

      expiresIn:
        process.env.JWT_REFRESH_EXPIRES
    }
  );
};

/* ===================================
   EXPORTS
=================================== */

module.exports = {

  generateAccessToken,

  generateRefreshToken
};