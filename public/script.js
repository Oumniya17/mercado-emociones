let chart;

function mostrarVista(id) {
  document.querySelectorAll(".vista").forEach(v => v.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");
}

async function cargarDashboard() {
  const usuarios = await fetch("/usuarios").then(r => r.json());
  const emociones = await fetch("/emociones").then(r => r.json());
  const transacciones = await fetch("/transacciones").then(r => r.json());

  document.getElementById("totalUsuarios").textContent = usuarios.length;
  document.getElementById("totalEmociones").textContent = emociones.length;
  document.getElementById("totalTransacciones").textContent = transacciones.length;

  const ventas = {};
  transacciones.forEach(t => {
    const nombre = t.emocion.nombre;
    ventas[nombre] = (ventas[nombre] || 0) + t.cantidad;
  });

  const labels = Object.keys(ventas);
  const data = Object.values(ventas);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("grafica"), {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          "#9b5de5",
          "#f15bb5",
          "#00bbf9",
          "#fee440",
          "#00f5d4"
        ]
      }]
    },
    options: {
      plugins: { legend: { labels: { color: "white" } } },
      cutout: "70%"
    }
  });
}

async function cargarListas() {
  const usuarios = await fetch("/usuarios").then(r => r.json());
  const emociones = await fetch("/emociones").then(r => r.json());
  const transacciones = await fetch("/transacciones").then(r => r.json());

  document.getElementById("listaUsuarios").innerHTML =
    usuarios.map(u =>
      `<div class="list-item">${u.nombre} - Saldo: ${u.saldoEmocional}</div>`
    ).join("");

  document.getElementById("listaEmociones").innerHTML =
    emociones.map(e =>
      `<div class="list-item">${e.nombre} (${e.tipo})</div>`
    ).join("");

  document.getElementById("listaTransacciones").innerHTML =
    transacciones.map(t =>
      `<div class="list-item">${t.comprador.nombre} → ${t.emocion.nombre} (${t.cantidad})</div>`
    ).join("");

  document.getElementById("selectUsuario").innerHTML =
    usuarios.map(u =>
      `<option value="${u._id}">${u.nombre}</option>`
    ).join("");

  document.getElementById("selectEmocion").innerHTML =
    emociones.map(e =>
      `<option value="${e._id}">${e.nombre}</option>`
    ).join("");
}

async function crearUsuario() {
  await fetch("/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nuevoNombre.value,
      email: nuevoEmail.value,
      saldoEmocional: Number(nuevoSaldo.value)
    })
  });

  init();
}

async function crearEmocion() {
  await fetch("/emociones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nuevoNombreEmocion.value,
      tipo: "felicidad",
      intensidad: Number(nuevaIntensidad.value),
      precioBase: Number(nuevoPrecio.value)
    })
  });

  init();
}

async function crearTransaccion() {
  await fetch("/transacciones", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comprador: selectUsuario.value,
      emocion: selectEmocion.value,
      cantidad: Number(cantidadTransaccion.value),
      tipoOperacion: "compra"
    })
  });

  init();
}

async function init() {
  await cargarDashboard();
  await cargarListas();
}

init();
