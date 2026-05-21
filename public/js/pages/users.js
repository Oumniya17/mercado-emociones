/* ===================================
   USERS INIT
=================================== */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      requireAuth();

      showLoader(
        "Loading users..."
      );

      await loadUsers();

      initUserForm();

      initUserSearch();

    } catch (error) {

      console.error(error);

      showToast(
        error.message,
        TOAST_TYPES.ERROR
      );

    } finally {

      hideLoader();
    }
  }
);

/* ===================================
   USERS STATE
=================================== */

let users = [];

const currentUser =
  JSON.parse(

    localStorage.getItem(
      "ebm_user"
    )
  );

const isAdmin =

  currentUser?.rol ===
  "admin";

/* ===================================
   LOAD USERS
=================================== */

async function loadUsers() {

  try {

    users =
      await getUsers();

    renderUsers(users);

  } catch (error) {

    console.error(error);

    showToast(
      "Failed to load users",
      TOAST_TYPES.ERROR
    );
  }
}

/* ===================================
   RENDER USERS
=================================== */

function renderUsers(
  usersList
) {

  const tbody =
    document.getElementById(
      "usersTableBody"
    );

  if (!tbody) return;

  tbody.innerHTML = "";

  // Empty state
  if (!usersList.length) {

    tbody.innerHTML = `

      <tr>

        <td colspan="5">

          No users found

        </td>

      </tr>

    `;

    return;
  }

  // Render rows
  usersList.forEach(user => {

    const row =
      document.createElement(
        "tr"
      );

    row.innerHTML = `

      <td>

        <div class="user-info">

          <div class="user-avatar">

            ${user.nombre
              ?.charAt(0)
              ?.toUpperCase() || "U"}

          </div>

          <div>

            <strong>

              ${user.nombre}

            </strong>

          </div>

        </div>

      </td>

      <td>

        ${user.email}

      </td>

      <td>

        ${formatNumber(
          user.saldoEmocional || 0
        )}

      </td>

      <td>

        ${user.rol || "user"}

      </td>

      <td>

        ${isAdmin ? `

          <div class="user-actions">

            <button
              class="btn btn-secondary"
              onclick="openEditUser('${user._id}')"
            >

              Edit

            </button>

            <button
              class="btn btn-danger"
              onclick="handleDeleteUser('${user._id}')"
            >

              Delete

            </button>

          </div>

        ` : `
        
          <span
            style="
              color:#9ca3af;
            "
          >

            Restricted

          </span>

        `}

      </td>

    `;

    tbody.appendChild(row);

  });
}

/* ===================================
   CREATE USER
=================================== */

function initUserForm() {

  if (!isAdmin) {

    const form =
      document.getElementById(
        "createUserForm"
      );

    if (form) {

      form.style.display =
        "none";
    }

    return;
  }

  const form =
    document.getElementById(
      "createUserForm"
    );

  if (!form) return;

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const button =
        form.querySelector(
          "button[type='submit']"
        );

      try {

        setButtonLoading(
          button,
          true
        );

        const userData = {

          nombre:
            document.getElementById(
              "userName"
            ).value,

          email:
            document.getElementById(
              "userEmail"
            ).value,

          saldoEmocional:
            document.getElementById(
              "userBalance"
            ).value
        };

        await createUser(
          userData
        );

        showToast(
          "User created"
        );

        form.reset();

        await loadUsers();

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
}

/* ===================================
   DELETE USER
=================================== */

async function handleDeleteUser(
  id
) {

  if (!isAdmin) {

    return showToast(

      "Admin only",

      TOAST_TYPES.ERROR
    );
  }

  const confirmed =
    confirm(
      "Delete this user?"
    );

  if (!confirmed) return;

  try {

    await deleteUser(id);

    showToast(
      "User deleted"
    );

    await loadUsers();

  } catch (error) {

    console.error(error);

    showToast(
      error.message,
      TOAST_TYPES.ERROR
    );
  }
}

/* ===================================
   EDIT USER
=================================== */

function openEditUser(
  id
) {

  if (!isAdmin) {

    return showToast(

      "Admin only",

      TOAST_TYPES.ERROR
    );
  }

  showToast(
    "Edit modal coming soon",
    TOAST_TYPES.WARNING
  );
}

/* ===================================
   SEARCH
=================================== */

function initUserSearch() {

  const input =
    document.getElementById(
      "searchUsers"
    );

  if (!input) return;

  input.addEventListener(
    "input",
    () => {

      const value =
        input.value.toLowerCase();

      const filtered =
        users.filter(user => {

          return (

            user.nombre
              ?.toLowerCase()
              .includes(value)

            ||

            user.email
              ?.toLowerCase()
              .includes(value)
          );
        });

      renderUsers(filtered);

    }
  );
}