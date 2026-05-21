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
   ROLE ACCESS
=================================== */

function handleRoleAccess() {

  const user =
    JSON.parse(

      localStorage.getItem(
        "ebm_user"
      )
    );

  // Hide admin section
  if (

    user?.rol !== "admin"

  ) {

    const adminLink =
      document.querySelector(

        '[href="/pages/admin.html"]'
      );

    if (adminLink) {

      adminLink.style.display =
        "none";
    }
  }
}

/* ===================================
   INIT SIDEBAR
=================================== */

document.addEventListener(

  "DOMContentLoaded",

  () => {

    setActiveSidebar();

    handleRoleAccess();
  }
);