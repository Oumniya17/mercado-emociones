/* ===================================
   TRANSACTIONS INIT
=================================== */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      requireAuth();

      showLoader(
        "Loading transactions..."
      );

      await Promise.all([

        loadTransactions(),
        loadUsersSelect(),
        loadEmotionsSelect()

      ]);

      initTransactionForm();

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
   STATE
=================================== */

let transactions = [];

/* ===================================
   LOAD TRANSACTIONS
=================================== */

async function loadTransactions() {

  try {

    transactions =
      await getTransactions();

    renderTransactions(
      transactions
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Failed to load transactions",
      TOAST_TYPES.ERROR
    );
  }
}

/* ===================================
   RENDER TRANSACTIONS
=================================== */

function renderTransactions(
  transactionsList
) {

  const tbody =
    document.getElementById(
      "transactionsTableBody"
    );

  if (!tbody) return;

  tbody.innerHTML = "";

  // Empty
  if (!transactionsList.length) {

    tbody.innerHTML = `

      <tr>

        <td colspan="6">

          No transactions found

        </td>

      </tr>

    `;

    return;
  }

  // Render
  transactionsList.forEach(tx => {

    const row =
      document.createElement(
        "tr"
      );

    row.innerHTML = `

      <td>

        ${tx.usuario?.nombre || "Unknown"}

      </td>

      <td>

        ${tx.emocion?.nombre || "Unknown"}

      </td>

      <td>

        ${tx.cantidad || 0}

      </td>

      <td>

        ${formatCurrency(
          tx.precioTotal || 0
        )}

      </td>

      <td>

        <span class="transaction-status">

          Completed

        </span>

      </td>

      <td>

        ${formatDate(
          tx.createdAt
        )}

      </td>

    `;

    tbody.appendChild(row);

  });
}

/* ===================================
   LOAD USERS SELECT
=================================== */

async function loadUsersSelect() {

  try {

    const users =
      await getUsers();

    const select =
      document.getElementById(
        "transactionUser"
      );

    if (!select) return;

    select.innerHTML = `

      <option value="">

        Select user

      </option>

    `;

    users.forEach(user => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        user._id;

      option.textContent =
        user.nombre;

      select.appendChild(
        option
      );
    });

  } catch (error) {

    console.error(error);
  }
}

/* ===================================
   LOAD EMOTIONS SELECT
=================================== */

async function loadEmotionsSelect() {

  try {

    const emotions =
      await getEmotions();

    const select =
      document.getElementById(
        "transactionEmotion"
      );

    if (!select) return;

    select.innerHTML = `

      <option value="">

        Select emotion

      </option>

    `;

    emotions.forEach(emotion => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        emotion._id;

      option.textContent =
        emotion.nombre;

      select.appendChild(
        option
      );
    });

  } catch (error) {

    console.error(error);
  }
}

/* ===================================
   CREATE TRANSACTION
=================================== */

function initTransactionForm() {

  const form =
    document.getElementById(
      "createTransactionForm"
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

        const transactionData = {

          usuario:
            document.getElementById(
              "transactionUser"
            ).value,

          emocion:
            document.getElementById(
              "transactionEmotion"
            ).value,

          cantidad:
            document.getElementById(
              "transactionAmount"
            ).value
        };

        await createTransaction(
          transactionData
        );

        showToast(
          "Transaction completed"
        );

        form.reset();

        await loadTransactions();

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