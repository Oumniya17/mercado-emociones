const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

/* ===================================
   PROTECT ROUTES
=================================== */

const protect = async (

  req,
  res,
  next

) => {

  try {

    let token;

    // Check bearer token
    if (

      req.headers.authorization

      &&

      req.headers.authorization.startsWith(
        "Bearer"
      )

    ) {

      token =

        req.headers.authorization.split(
          " "
        )[1];
    }

    // No token
    if (!token) {

      return res.status(401).json({

        success: false,

        message:
          "Not authorized"
      });
    }

    // Verify token
    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET
      );

    // Get user
    req.user =
      await User.findById(
        decoded.id
      ).select("-password");

    // No user
    if (!req.user) {

      return res.status(401).json({

        success: false,

        message:
          "User not found"
      });
    }

    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message:
        "Invalid token"
    });
  }
};

/* ===================================
   ADMIN ONLY
=================================== */

const adminOnly = (

  req,
  res,
  next

) => {

  if (

    req.user

    &&

    req.user.rol === "admin"

  ) {

    next();

  } else {

    return res.status(403).json({

      success: false,

      message:
        "Admin access only"
    });
  }
};

/* ===================================
   EXPORTS
=================================== */

module.exports = {

  protect,

  adminOnly
};