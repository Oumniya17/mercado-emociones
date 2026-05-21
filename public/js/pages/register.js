const API_URL =
  "http://localhost:3000/api";

/* ===================================
   REGISTER
=================================== */

async function register(

  nombre,
  email,
  password

) {

  const response =
    await fetch(

      `${API_URL}/auth/register`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          nombre,
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

      "Register failed"
    );
  }

  return data;
}

/* ===================================
   REGISTER FORM
=================================== */

document
  .getElementById(
    "registerForm"
  )
  ?.addEventListener(

    "submit",

    async (e) => {

      e.preventDefault();

      const button =
        document.querySelector(
          ".login-btn"
        );

      try {

        button.disabled =
          true;

        button.innerText =
          "CREATING...";

        const nombre =
          document.getElementById(
            "nombre"
          ).value;

        const email =
          document.getElementById(
            "email"
          ).value;

        const password =
          document.getElementById(
            "password"
          ).value;

        await register(

          nombre,
          email,
          password
        );

        alert(
          "Account created successfully!"
        );

        window.location.href =
          "/index.html";

      } catch (error) {

        console.error(
          error
        );

        alert(
          error.message
        );

      } finally {

        button.disabled =
          false;

        button.innerText =
          "CREATE ACCOUNT";
      }
    }
  );