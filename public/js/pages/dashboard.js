/* ===================================
   DASHBOARD INIT
=================================== */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      requireAuth();

      showLoader(
        "Loading dashboard..."
      );

      await loadDashboard();

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
   LOAD DASHBOARD
=================================== */

async function loadDashboard() {

  try {

    // Fetch stats
    const stats =
      await getDashboardStats();

    // Render
    renderStats(stats);

    renderCharts(stats);

    renderActivity(stats);

  } catch (error) {

    console.error(error);

    showToast(
      "Dashboard load failed",
      TOAST_TYPES.ERROR
    );
  }
}

/* ===================================
   RENDER STATS
=================================== */

function renderStats(
  stats
) {

  const totalUsers =
    document.getElementById(
      "totalUsers"
    );

  const totalEmotions =
    document.getElementById(
      "totalEmotions"
    );

  const totalTransactions =
    document.getElementById(
      "totalTransactions"
    );

  if (totalUsers) {

    totalUsers.textContent =
      formatNumber(
        stats.totalUsers || 0
      );
  }

  if (totalEmotions) {

    totalEmotions.textContent =
      formatNumber(
        stats.totalEmotions || 0
      );
  }

  if (totalTransactions) {

    totalTransactions.textContent =
      formatNumber(
        stats.totalTransactions || 0
      );
  }
}

/* ===================================
   RENDER CHARTS
=================================== */

function renderCharts(
  stats
) {

  const chartCanvas =
    document.getElementById(
      "dashboardChart"
    );

  if (!chartCanvas) return;

  new Chart(
    chartCanvas,
    {

      type: "line",

      data: {

        labels:
          stats.chartLabels || [],

        datasets: [

          {

            label:
              "Market Activity",

            data:
              stats.chartValues || [],

            borderColor:
              "#00ffff",

            backgroundColor:
              "rgba(0,255,255,0.08)",

            tension: 0.4,

            fill: true
          }
        ]
      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            labels: {

              color: "white"
            }
          }
        },

        scales: {

          x: {

            ticks: {

              color: "#8a93b2"
            },

            grid: {

              color:
                "rgba(255,255,255,0.05)"
            }
          },

          y: {

            ticks: {

              color: "#8a93b2"
            },

            grid: {

              color:
                "rgba(255,255,255,0.05)"
            }
          }
        }
      }
    }
  );
}

/* ===================================
   RENDER ACTIVITY
=================================== */

function renderActivity(
  stats
) {

  const container =
    document.getElementById(
      "activityFeed"
    );

  if (!container) return;

  container.innerHTML = "";

  const activity =
    stats.recentActivity || [];

  // Empty
  if (!activity.length) {

    container.innerHTML = `

      <div class="activity-item">

        No recent activity

      </div>

    `;

    return;
  }

  // Render
  activity.forEach(item => {

    const div =
      document.createElement(
        "div"
      );

    div.className =
      "activity-item fade-in";

    div.innerHTML = `

      <strong>

        ${item.title}

      </strong>

      <p>

        ${item.description}

      </p>

      <small>

        ${formatDate(
          item.createdAt
        )}

      </small>

    `;

    container.appendChild(
      div
    );
  });
}