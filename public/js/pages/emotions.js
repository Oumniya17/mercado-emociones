/* ===================================
   EMOTIONS INIT
=================================== */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      requireAuth();

      showLoader(
        "Loading emotions..."
      );

      await loadEmotions();

      initEmotionForm();

      initEmotionSearch();

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

let emotions = [];

/* ===================================
   LOAD EMOTIONS
=================================== */

async function loadEmotions() {

  try {

    emotions =
      await getEmotions();

    renderEmotions(emotions);

  } catch (error) {

    console.error(error);

    showToast(
      "Failed to load emotions",
      TOAST_TYPES.ERROR
    );
  }
}

/* ===================================
   RENDER EMOTIONS
=================================== */

function renderEmotions(
  emotionsList
) {

  const container =
    document.getElementById(
      "emotionsGrid"
    );

  if (!container) return;

  container.innerHTML = "";

  // Empty
  if (!emotionsList.length) {

    container.innerHTML = `

      <div class="card">

        No emotions found

      </div>

    `;

    return;
  }

  // Render cards
  emotionsList.forEach(emotion => {

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "card emotion-card fade-in";

    card.innerHTML = `

      <div class="emotion-header">

        <h3>

          ${emotion.nombre}

        </h3>

        <span class="emotion-badge">

          Level ${emotion.intensidad || 0}

        </span>

      </div>

      <p class="emotion-description">

        ${emotion.descripcion || "No description"}

      </p>

      <div class="emotion-stats">

        <div>

          <small>

            Base Price

          </small>

          <div class="emotion-value">

            ${formatCurrency(
              emotion.precioBase || 0
            )}

          </div>

        </div>

        <div>

          <small>

            Volatility

          </small>

          <div class="emotion-value">

            ${emotion.volatilidad || 0}%

          </div>

        </div>

      </div>

      <div class="emotion-footer">

        <small>

          ${emotion.tipo || "Unknown"}

        </small>

        <div class="emotion-actions">

          <button
            class="btn btn-primary"
            onclick="buyEmotion('${emotion._id}')"
          >

            Buy

          </button>

          <button
            class="btn btn-secondary"
            onclick="openEditEmotion('${emotion._id}')"
          >

            Edit

          </button>

          <button
            class="btn btn-danger"
            onclick="handleDeleteEmotion('${emotion._id}')"
          >

            Delete

          </button>

        </div>

      </div>

    `;

    container.appendChild(
      card
    );

  });
}

/* ===================================
   CREATE EMOTION
=================================== */

function initEmotionForm() {

  const form =
    document.getElementById(
      "createEmotionForm"
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

        const emotionData = {

          nombre:
            document.getElementById(
              "emotionName"
            ).value,

          descripcion:
            document.getElementById(
              "emotionDescription"
            ).value,

          intensidad:
            document.getElementById(
              "emotionIntensity"
            ).value,

          precioBase:
            document.getElementById(
              "emotionPrice"
            ).value,

          volatilidad:
            document.getElementById(
              "emotionVolatility"
            ).value
        };

        await createEmotion(
          emotionData
        );

        showToast(
          "Emotion created"
        );

        form.reset();

        await loadEmotions();

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
   DELETE EMOTION
=================================== */

async function handleDeleteEmotion(
  id
) {

  const confirmed =
    confirm(
      "Delete this emotion?"
    );

  if (!confirmed) return;

  try {

    await deleteEmotion(id);

    showToast(
      "Emotion deleted"
    );

    await loadEmotions();

  } catch (error) {

    console.error(error);

    showToast(
      error.message,
      TOAST_TYPES.ERROR
    );
  }
}

/* ===================================
   EDIT EMOTION
=================================== */

function openEditEmotion(
  id
) {

  showToast(
    "Edit modal coming soon",
    TOAST_TYPES.WARNING
  );
}

/* ===================================
   SEARCH
=================================== */

function initEmotionSearch() {

  const input =
    document.getElementById(
      "searchEmotions"
    );

  if (!input) return;

  input.addEventListener(
    "input",
    () => {

      const value =
        input.value.toLowerCase();

      const filtered =
        emotions.filter(emotion => {

          return (

            emotion.nombre
              ?.toLowerCase()
              .includes(value)

            ||

            emotion.descripcion
              ?.toLowerCase()
              .includes(value)
          );
        });

      renderEmotions(filtered);

    }
  );
}

/* ===================================
   BUY EMOTION
=================================== */

async function buyEmotion(

  emotionId

) {

  try {

    await apiPost(

      "/transactions",

      {

        emocion:
          emotionId,

        cantidad: 1,

        tipoOperacion:
          "buy"
      }
    );

    showToast(
      "Emotion purchased"
    );

  } catch (error) {

    console.error(
      error
    );

    showToast(

      error.message,

      TOAST_TYPES.ERROR
    );
  }
}