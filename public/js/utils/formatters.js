/* ===================================
   FORMAT DATE
=================================== */

function formatDate(
  date
) {

  return new Date(date)
    .toLocaleDateString(
      "es-ES",
      {

        year: "numeric",

        month: "short",

        day: "numeric",

        hour: "2-digit",

        minute: "2-digit"
      }
    );
}

/* ===================================
   FORMAT NUMBER
=================================== */

function formatNumber(
  number
) {

  return new Intl.NumberFormat(
    "es-ES"
  ).format(number);
}

/* ===================================
   FORMAT CURRENCY
=================================== */

function formatCurrency(
  value
) {

  return new Intl.NumberFormat(
    "es-ES",
    {

      style: "currency",

      currency: "EUR"
    }
  ).format(value);
}

/* ===================================
   CAPITALIZE
=================================== */

function capitalize(
  text
) {

  if (!text) return "";

  return text.charAt(0)
    .toUpperCase()

    +

    text.slice(1);
}