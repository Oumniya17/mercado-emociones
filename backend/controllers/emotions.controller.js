const Emotion =
  require("../models/Emotion");

/* ===================================
   GET EMOTIONS
=================================== */

const getEmotions = async (

  req,
  res

) => {

  try {

    const emotions =
      await Emotion.find();

    return res.status(200).json(
      emotions
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
   GET EMOTION BY ID
=================================== */

const getEmotionById = async (

  req,
  res

) => {

  try {

    const emotion =
      await Emotion.findById(
        req.params.id
      );

    if (!emotion) {

      return res.status(404).json({

        success: false,

        message:
          "Emotion not found"
      });
    }

    return res.status(200).json(
      emotion
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
   CREATE EMOTION
=================================== */

const createEmotion = async (

  req,
  res

) => {

  try {

    const emotion =
      await Emotion.create(
        req.body
      );

    return res.status(201).json({

      success: true,

      message:
        "Emotion created",

      emotion
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
   UPDATE EMOTION
=================================== */

const updateEmotion = async (

  req,
  res

) => {

  try {

    const updatedEmotion =
      await Emotion.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

          new: true,

          runValidators: true
        }
      );

    if (!updatedEmotion) {

      return res.status(404).json({

        success: false,

        message:
          "Emotion not found"
      });
    }

    return res.status(200).json({

      success: true,

      message:
        "Emotion updated",

      emotion:
        updatedEmotion
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
   DELETE EMOTION
=================================== */

const deleteEmotion = async (

  req,
  res

) => {

  try {

    const deletedEmotion =
      await Emotion.findByIdAndDelete(
        req.params.id
      );

    if (!deletedEmotion) {

      return res.status(404).json({

        success: false,

        message:
          "Emotion not found"
      });
    }

    return res.status(200).json({

      success: true,

      message:
        "Emotion deleted"
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

  getEmotions,

  getEmotionById,

  createEmotion,

  updateEmotion,

  deleteEmotion
};