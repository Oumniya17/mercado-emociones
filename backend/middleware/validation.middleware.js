/* ===================================
   VALIDATE REQUIRED FIELDS
=================================== */

const validateFields = (
  fields = []
) => {

  return (

    req,
    res,
    next

  ) => {

    const missingFields =
      [];

    fields.forEach(field => {

      if (

        req.body[field] ===
        undefined

        ||

        req.body[field] ===
        null

        ||

        req.body[field] === ""

      ) {

        missingFields.push(
          field
        );
      }
    });

    // Missing fields
    if (

      missingFields.length > 0

    ) {

      return res.status(400).json({

        success: false,

        message: `Missing fields: ${missingFields.join(", ")}`
      });
    }

    next();
  };
};

/* ===================================
   EXPORT
=================================== */

module.exports = {

  validateFields
};