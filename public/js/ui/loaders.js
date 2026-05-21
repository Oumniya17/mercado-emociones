/* ===================================
   SHOW LOADER
=================================== */

function showLoader(

  text = "Loading..."

) {

  let loader =
    document.getElementById(
      "globalLoader"
    );

  // Already exists
  if (loader) return;

  loader =
    document.createElement(
      "div"
    );

  loader.id =
    "globalLoader";

  loader.className =
    "loader-overlay";

  loader.innerHTML = `

    <div class="loader-container">

      <div class="loader-spinner"></div>

      <span class="loader-text">

        ${text}

      </span>

    </div>

  `;

  document.body.appendChild(
    loader
  );
}

/* ===================================
   HIDE LOADER
=================================== */

function hideLoader() {

  const loader =
    document.getElementById(
      "globalLoader"
    );

  if (loader) {

    loader.remove();
  }
}

/* ===================================
   BUTTON LOADING
=================================== */

function setButtonLoading(

  button,
  loading = true

) {

  if (!button) return;

  // Loading
  if (loading) {

    button.dataset.originalText =
      button.innerHTML;

    button.disabled = true;

    button.innerHTML = `

      <span class="btn-loader"></span>

      Loading...

    `;

  } else {

    button.disabled = false;

    button.innerHTML =
      button.dataset.originalText ||
      "Submit";
  }
}