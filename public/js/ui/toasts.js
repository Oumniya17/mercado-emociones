/* ===================================
   CREATE TOAST
=================================== */

function showToast(

  message,
  type = "success"

) {

  let container =
    document.querySelector(
      ".toast-container"
    );

  // Create container
  if (!container) {

    container =
      document.createElement(
        "div"
      );

    container.className =
      "toast-container";

    document.body.appendChild(
      container
    );
  }

  // Create toast
  const toast =
    document.createElement(
      "div"
    );

  toast.className =
    `toast toast-${type}`;

  // Icons
  const icons = {

    success: "✓",
    error: "✕",
    warning: "⚠"
  };

  toast.innerHTML = `

    <div class="toast-icon">

      ${icons[type] || "✓"}

    </div>

    <div class="toast-content">

      ${message}

    </div>

    <button
      class="toast-close"
    >

      ✕

    </button>

  `;

  // Close button
  toast
    .querySelector(".toast-close")
    .addEventListener(
      "click",
      () => removeToast(toast)
    );

  // Add toast
  container.appendChild(
    toast
  );

  // Auto remove
  setTimeout(() => {

    removeToast(toast);

  }, 4000);
}

/* ===================================
   REMOVE TOAST
=================================== */

function removeToast(
  toast
) {

  toast.classList.add(
    "toast-hide"
  );

  setTimeout(() => {

    toast.remove();

  }, 300);
}