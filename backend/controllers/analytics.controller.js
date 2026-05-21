const User =
  require("../models/User");

const Emotion =
  require("../models/Emotion");

const Transaction =
  require("../models/Transaction");

/* ===================================
   DASHBOARD STATS
=================================== */

const getDashboardStats = async (

  req,
  res

) => {

  try {

    // Counts
    const totalUsers =
      await User.countDocuments();

    const totalEmotions =
      await Emotion.countDocuments();

    const totalTransactions =
      await Transaction.countDocuments();

    // Revenue
    const revenueResult =
      await Transaction.aggregate([

        {

          $group: {

            _id: null,

            totalRevenue: {

              $sum:
                "$precioTotal"
            }
          }
        }
      ]);

    const totalRevenue =

      revenueResult[0]
        ?.totalRevenue || 0;

    // Recent activity
    const recentTransactions =
      await Transaction.find()

        .populate(
          "usuario",
          "nombre"
        )

        .populate(
          "emocion",
          "nombre"
        )

        .sort({

          createdAt: -1

        })

        .limit(5);

    // Activity format
    const recentActivity =

      recentTransactions.map(tx => ({

        title:
          `${tx.usuario?.nombre} traded ${tx.emocion?.nombre}`,

        description:
          `${tx.cantidad} emotional assets exchanged`,

        createdAt:
          tx.createdAt
      }));

    // Fake chart data
    const chartLabels = [

      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ];

    const chartValues = [

      12,
      19,
      7,
      14,
      22,
      18,
      30
    ];

    return res.status(200).json({

      totalUsers,

      totalEmotions,

      totalTransactions,

      totalRevenue,

      marketValue:
        totalRevenue,

      recentActivity,

      chartLabels,

      chartValues
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
   MARKET ANALYTICS
=================================== */

const getMarketAnalytics = async (

  req,
  res

) => {

  try {

    return res.status(200).json({

      labels: [

        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ],

      values: [

        5,
        12,
        8,
        15,
        10,
        18,
        22
      ]
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
   USER ANALYTICS
=================================== */

const getUserAnalytics = async (

  req,
  res

) => {

  try {

    return res.status(200).json({

      labels: [

        "Admins",
        "Users"
      ],

      values: [

        5,
        45
      ]
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
   EMOTION ANALYTICS
=================================== */

const getEmotionAnalytics = async (

  req,
  res

) => {

  try {

    const emotions =
      await Emotion.find();

    return res.status(200).json({

      labels:
        emotions.map(

          emotion =>
            emotion.nombre
        ),

      values:
        emotions.map(

          emotion =>
            emotion.precioBase
        )
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

  getDashboardStats,

  getMarketAnalytics,

  getUserAnalytics,

  getEmotionAnalytics
};