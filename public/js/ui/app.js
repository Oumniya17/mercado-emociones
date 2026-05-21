/* ===================================
   APP INIT
=================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initPage();

  }
);

/* ===================================
   INIT PAGE
=================================== */

function initPage() {

  // Fade effect
  document.body.classList.add(
    "fade-in"
  );

  // Sidebar
  if (

    typeof setActiveSidebar ===
    "function"

  ) {

    setActiveSidebar();
  }

  // Glow mouse effect
  initGlowEffect();
}

/* ===================================
   GLOW EFFECT
=================================== */

function initGlowEffect() {

  document.addEventListener(
    "mousemove",
    (e) => {

      const glow1 =
        document.querySelector(
          ".glow-1"
        );

      const glow2 =
        document.querySelector(
          ".glow-2"
        );

      if (!glow1 || !glow2)
        return;

      const x = e.clientX;
      const y = e.clientY;

      glow1.style.transform = `

        translate(
          ${x * 0.02}px,
          ${y * 0.02}px
        )

      `;

      glow2.style.transform = `

        translate(
          ${x * -0.015}px,
          ${y * -0.015}px
        )

      `;
    }
  );
}