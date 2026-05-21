const User =
  require("../models/User");

const {

  generateAccessToken,
  generateRefreshToken

} = require(
  "../utils/generateToken"
);

/* ===================================
   REGISTER
=================================== */

const register = async (

  req,
  res

) => {

  try {

    const {

      nombre,
      email,
      password

    } = req.body;

    // Check existing user
    const existingUser =
      await User.findOne({

        email
      });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists"
      });
    }

    // Create user
    const user =
      await User.create({

        nombre,
        email,
        password
      });

    return res.status(201).json({

      success: true,

      message:
        "User registered",

      user: {

        id: user._id,

        nombre:
          user.nombre,

        email:
          user.email,

        rol:
          user.rol
      }
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message
    });
  }
};

/* ===================================
   LOGIN
=================================== */

const login = async (

  req,
  res

) => {

  try {

    const {

      email,
      password

    } = req.body;

    // Find user
    const user =
      await User.findOne({

        email
      });

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid credentials"
      });
    }

    // Compare password
    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid credentials"
      });
    }

    // Generate tokens
    const accessToken =
      generateAccessToken(

        user._id,
        user.rol
      );

    const refreshToken =
      generateRefreshToken(
        user._id
      );

    // Save refresh token
    user.refreshToken =
      refreshToken;

    await user.save();

    return res.status(200).json({

      success: true,

      token:
        accessToken,

      refreshToken,

      user: {

        id: user._id,

        nombre:
          user.nombre,

        email:
          user.email,

        rol:
          user.rol
      }
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message
    });
  }
};

/* ===================================
   REFRESH TOKEN
=================================== */

const refreshToken =
  async (req, res) => {

    try {

      const {

        refreshToken

      } = req.body;

      if (!refreshToken) {

        return res.status(401).json({

          success: false,

          message:
            "Refresh token required"
        });
      }

      // FIND USER
      const user =
        await User.findOne({

          refreshToken
        });

      if (!user) {

        return res.status(403).json({

          success: false,

          message:
            "Invalid refresh token"
        });
      }

      // GENERATE NEW ACCESS TOKEN
      const accessToken =
        generateAccessToken(

          user._id,

          user.rol
        );

      return res.status(200).json({

        success: true,

        token:
          accessToken
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message
      });
    }
  };

/* ===================================
   PROFILE
=================================== */

const getProfile = async (

  req,
  res

) => {

  return res.status(200).json({

    success: true,

    user: req.user
  });
};

/* ===================================
   LOGOUT
=================================== */

const logout = async (

  req,
  res

) => {

  try {

    const user =
      await User.findById(
        req.user._id
      );

    if (user) {

      user.refreshToken =
        null;

      await user.save();
    }

    return res.status(200).json({

      success: true,

      message:
        "Logged out"
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message
    });
  }
};

/* ===================================
   EXPORTS
=================================== */

module.exports = {

  register,

  login,

  refreshToken,

  getProfile,

  logout
};