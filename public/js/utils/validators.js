/* ===================================
   EMAIL VALIDATION
=================================== */

function isValidEmail(
  email
) {

  const regex =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

/* ===================================
   REQUIRED FIELD
=================================== */

function isRequired(
  value
) {

  return value
    !== undefined

    &&

    value !== null

    &&

    value.toString().trim()
      !== "";
}

/* ===================================
   MIN LENGTH
=================================== */

function minLength(

  value,
  min

) {

  return value.length >= min;
}

/* ===================================
   NUMBER VALIDATION
=================================== */

function isPositiveNumber(
  value
) {

  return !isNaN(value)

    &&

    Number(value) > 0;
}