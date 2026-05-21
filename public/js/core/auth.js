/* ===================================
   LOGIN REQUEST
=================================== */

async function login(

  email,
  password

) {

  const response =
    await fetch(

      `${CONFIG.API_URL}/auth/login`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          email,
          password
        })
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    throw new Error(

      data.message ||

      "Login failed"
    );
  }

  // Save token
  saveToken(
    data.token
  );

  // Save user
  saveUser(
    data.user
  );

  return data;
}

/* ===================================
   LOGOUT
=================================== */

function logout() {

  clearStorage();

  window.location.href =
    "/index.html";
}

/* ===================================
   AUTH CHECK
=================================== */

function requireAuth() {

  const token =
    getToken();

  if (!token) {

    window.location.href =
      "/index.html";
  }
}

/* ===================================
   LOGIN FORM
=================================== */

document
  .getElementById("loginForm")
  ?.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const button =
        document.querySelector(
          ".login-btn"
        );

      try {

        setButtonLoading(
          button,
          true
        );

        const email =
          document.getElementById(
            "username"
          ).value;

        const password =
          document.getElementById(
            "password"
          ).value;

        // Real login
        await login(
          email,
          password
        );

        showToast(
          "Access granted"
        );

        setTimeout(() => {

          window.location.href =
            "/pages/dashboard.html";

        }, 1000);

      } catch (error) {

        console.error(error);

        showToast(

          error.message,

          TOAST_TYPES.ERROR
        );

      } finally {

        setButtonLoading(
          button,
          false
        );
      }
    }
  );