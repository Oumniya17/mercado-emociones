/* ===================================
   ANALYTICS INIT
=================================== */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      requireAuth();

      showLoader(
        "Loading analytics..."
      );

      await loadAnalytics();

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
   LOAD ANALYTICS
=================================== */

async function loadAnalytics() {

  try {

    const dashboard =
      await getDashboardStats();

    const market =
      await getMarketAnalytics();

    const users =
      await getUserAnalytics();

    renderKpis(dashboard);

    renderMarketChart(market);

    renderUsersChart(users);

    renderInsights(dashboard);

  } catch (error) {

    console.error(error);

    showToast(
      "Analytics load failed",
      TOAST_TYPES.ERROR
    );
  }
}

/* ===================================
   RENDER KPIS
=================================== */

function renderKpis(
  stats
) {

  const totalRevenue =
    document.getElementById(
      "totalRevenue"
    );

  const totalTrades =
    document.getElementById(
      "totalTrades"
    );

  const marketValue =
    document.getElementById(
      "marketValue"
    );

  const activeUsers =
    document.getElementById(
      "activeUsers"
    );

  if (totalRevenue) {

    totalRevenue.textContent =
      formatCurrency(
        stats.totalRevenue || 0
      );
  }

  if (totalTrades) {

    totalTrades.textContent =
      formatNumber(
        stats.totalTransactions || 0
      );
  }

  if (marketValue) {

    marketValue.textContent =
      formatCurrency(
        stats.marketValue || 0
      );
  }

  if (activeUsers) {

    activeUsers.textContent =
      formatNumber(
        stats.totalUsers || 0
      );
  }
}

/* ===================================
   MARKET CHART
=================================== */

function renderMarketChart(
  data
) {

  const canvas =
    document.getElementById(
      "marketChart"
    );

  if (!canvas) return;

  new Chart(
    canvas,
    {

      type: "line",

      data: {

        labels:
          data.labels || [],

        datasets: [

          {

            label:
              "Market Volatility",

            data:
              data.values || [],

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
   USERS CHART
=================================== */

function renderUsersChart(
  data
) {

  const canvas =
    document.getElementById(
      "usersChart"
    );

  if (!canvas) return;

  new Chart(
    canvas,
    {

      type: "bar",

      data: {

        labels:
          data.labels || [],

        datasets: [

          {

            label:
              "User Activity",

            data:
              data.values || [],

            backgroundColor:
              "rgba(123,44,255,0.6)",

            borderRadius: 12
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
   INSIGHTS
=================================== */

function renderInsights(
  stats
) {

  const container =
    document.getElementById(
      "insightsContainer"
    );

  if (!container) return;

  container.innerHTML = `

    <div class="insight-item">

      <strong>
        Market Growth
      </strong>

      <p>

        Emotional market activity increased
        by 24% this week.

      </p>

    </div>

    <div class="insight-item">

      <strong>
        Top Emotion
      </strong>

      <p>

        Happiness remains the highest
        traded emotional asset.

      </p>

    </div>

    <div class="insight-item">

      <strong>
        Active Traders
      </strong>

      <p>

        ${stats.totalUsers || 0}
        active users currently operating.

      </p>

    </div>

  `;
}