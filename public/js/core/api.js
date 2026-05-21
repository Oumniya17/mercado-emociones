/* ===================================
   BASE REQUEST
=================================== */

async function apiRequest(

  endpoint,
  options = {}

) {

  try {

    const token =
      getToken();

    const response =
      await fetch(

        `${CONFIG.API_URL}${endpoint}`,

        {

          headers: {

            "Content-Type":
              "application/json",

            ...(token && {

              Authorization:
                `Bearer ${token}`
            })
          },

          ...options
        }
      );

    // Parse JSON
    const data =
      await response.json();

    // Error
    if (!response.ok) {

      throw new Error(
        data.message ||
        "API Error"
      );
    }

    return data;

  } catch (error) {

    console.error(
      "API ERROR:",
      error
    );

    throw error;
  }
}

/* ===================================
   GET
=================================== */

async function apiGet(
  endpoint
) {

  return apiRequest(
    endpoint,
    {
      method: "GET"
    }
  );
}

/* ===================================
   POST
=================================== */

async function apiPost(
  endpoint,
  body
) {

  return apiRequest(
    endpoint,
    {

      method: "POST",

      body:
        JSON.stringify(body)
    }
  );
}

/* ===================================
   PUT
=================================== */

async function apiPut(
  endpoint,
  body
) {

  return apiRequest(
    endpoint,
    {

      method: "PUT",

      body:
        JSON.stringify(body)
    }
  );
}

/* ===================================
   DELETE
=================================== */

async function apiDelete(
  endpoint
) {

  return apiRequest(
    endpoint,
    {
      method: "DELETE"
    }
  );
}