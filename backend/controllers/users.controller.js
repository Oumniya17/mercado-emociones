const User =
  require("../models/User");

/* ===================================
   GET USERS
=================================== */

const getUsers = async (

  req,
  res

) => {

  try {

    const users =
      await User.find()
        .select("-password");

    return res.status(200).json(
      users
    );

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message
    });
  }
};

/* ===================================
   GET USER BY ID
=================================== */

const getUserById = async (

  req,
  res

) => {

  try {

    const user =
      await User.findById(
        req.params.id
      ).select("-password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found"
      });
    }

    return res.status(200).json(
      user
    );

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message
    });
  }
};

/* ===================================
   CREATE USER
=================================== */

const createUser = async (

  req,
  res

) => {

  try {

    const {

      nombre,
      email,
      password,
      rol,
      saldoEmocional

    } = req.body;

    // Check existing email
    const existingUser =
      await User.findOne({

        email
      });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "Email already exists"
      });
    }

    // Create user
    const user =
      await User.create({

        nombre,
        email,
        password,
        rol,
        saldoEmocional
      });

    return res.status(201).json({

      success: true,

      message:
        "User created",

      user
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
   UPDATE USER
=================================== */

const updateUser = async (

  req,
  res

) => {

  try {

    const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

          new: true,

          runValidators: true
        }

      ).select("-password");

    if (!updatedUser) {

      return res.status(404).json({

        success: false,

        message:
          "User not found"
      });
    }

    return res.status(200).json({

      success: true,

      message:
        "User updated",

      user:
        updatedUser
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
   DELETE USER
=================================== */

const deleteUser = async (

  req,
  res

) => {

  try {

    const deletedUser =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!deletedUser) {

      return res.status(404).json({

        success: false,

        message:
          "User not found"
      });
    }

    return res.status(200).json({

      success: true,

      message:
        "User deleted"
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

  getUsers,

  getUserById,

  createUser,

  updateUser,

  deleteUser
};