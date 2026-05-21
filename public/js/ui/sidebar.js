/* ===================================
   ACTIVE SIDEBAR
=================================== */

function setActiveSidebar() {

  const links =
    document.querySelectorAll(
      ".sidebar nav a"
    );

  const currentPage =
    window.location.pathname;

  links.forEach(link => {

    const href =
      link.getAttribute("href");

    link.classList.remove(
      "active"
    );

    if (

      currentPage.includes(href)

    ) {

      link.classList.add(
        "active"
      );
    }
  });
}

/* ===================================
   INIT SIDEBAR
=================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    setActiveSidebar();
  }
);