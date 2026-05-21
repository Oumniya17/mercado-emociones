/* ===================================
   OPEN MODAL
=================================== */

function openModal(
  modalId
) {

  const modal =
    document.getElementById(
      modalId
    );

  if (!modal) return;

  modal.classList.remove(
    "hidden"
  );
}

/* ===================================
   CLOSE MODAL
=================================== */

function closeModal(
  modalId
) {

  const modal =
    document.getElementById(
      modalId
    );

  if (!modal) return;

  modal.classList.add(
    "hidden"
  );
}

/* ===================================
   CLOSE ALL
=================================== */

function closeAllModals() {

  document
    .querySelectorAll(".modal")
    .forEach(modal => {

      modal.classList.add(
        "hidden"
      );
    });
}

/* ===================================
   ESC CLOSE
=================================== */

document.addEventListener(
  "keydown",
  (e) => {

    if (e.key === "Escape") {

      closeAllModals();
    }
  }
);

/* ===================================
   CLICK OUTSIDE
=================================== */

document.addEventListener(
  "click",
  (e) => {

    if (

      e.target.classList.contains(
        "modal"
      )

    ) {

      e.target.classList.add(
        "hidden"
      );
    }
  }
);