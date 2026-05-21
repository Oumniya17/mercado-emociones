/* ===================================
   CREATE ELEMENT
=================================== */

function createElement(

  tag,
  className = "",
  content = ""

) {

  const element =
    document.createElement(tag);

  if (className) {

    element.className =
      className;
  }

  if (content) {

    element.innerHTML =
      content;
  }

  return element;
}

/* ===================================
   QUERY SELECTOR
=================================== */

function $(selector) {

  return document.querySelector(
    selector
  );
}

/* ===================================
   QUERY SELECTOR ALL
=================================== */

function $all(selector) {

  return document.querySelectorAll(
    selector
  );
}

/* ===================================
   DELAY
=================================== */

function delay(ms) {

  return new Promise(resolve =>

    setTimeout(resolve, ms)

  );
}

/* ===================================
   RANDOM ID
=================================== */

function generateId() {

  return Math.random()
    .toString(36)
    .substring(2, 10);
}