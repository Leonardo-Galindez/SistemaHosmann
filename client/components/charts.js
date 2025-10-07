import Chart from "chart.js/auto";

export async function crearComponenteChartTorta(contenedor) {
  if (!contenedor) {
    console.error("No se proporcionó un contenedor para el componente de gráfico.");
    return;
  }


  contenedor.innerHTML = `
    <div class="col-12 col-xl-5">
      <div class="cardx p-3 h-100 shadow-lg rounded-4 border-0 bg-light">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold text-dark mb-0">Composición de huella por equipo</h5>
          <span class="badge bg-dark text-white px-3 py-2">Torta</span>
        </div>
        <div class="chart-box position-relative" style="height: 320px;">
          <canvas id="chartHuella"></canvas>
          <div class="chart-legend mt-3 text-center small text-muted" id="legendHuella"></div>
        </div>
      </div>
    </div>
  `;

  try {

    const res = await fetch("/api/huella-carbono");
    const data = await res.json();


    const equipos = data.map(item => item.equipo);
    const huellas = data.map(item => item.huellaCO2);

    const colores = [
      "#4e79a7", "#f28e2b", "#e15759", "#76b7b2",
      "#59a14f", "#edc949", "#af7aa1", "#ff9da7",
      "#9c755f", "#bab0ab"
    ];


    const ctx = contenedor.querySelector("#chartHuella").getContext("2d");
    if (window.chartHuella) window.chartHuella.destroy();

    window.chartHuella = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: equipos,
        datasets: [
          {
            label: "Huella de carbono (kg CO₂)",
            data: huellas,
            backgroundColor: colores.slice(0, equipos.length),
            borderWidth: 2,
            hoverOffset: 8
          }
        ]
      },
      options: {
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: context =>
                `${context.label}: ${context.formattedValue} kg CO₂`
            }
          }
        },
        responsive: true,
        animation: {
          animateRotate: true,
          duration: 1200,
          easing: "easeOutQuart"
        }
      }
    });


    const legendContainer = contenedor.querySelector("#legendHuella");
    legendContainer.innerHTML = equipos
      .map(
        (eq, i) =>
          `<span><i style="background:${colores[i]}"></i>${eq}</span>`
      )
      .join("");
  } catch (error) {
    console.error("Error al crear el gráfico de huella:", error);
  }
}

export async function crearComponenteChartGasoil(contenedor) {
  if (!contenedor) {
    console.error("No se proporcionó un contenedor para el componente de gráfico.");
    return;
  }

  contenedor.innerHTML = `
    <div class="col-12 col-xl-7">
      <div class="cardx p-3 h-100 shadow-lg rounded-4 border-0 bg-light">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold text-dark mb-0">Consumo mensual de gasoil por equipo</h5>
          <span class="badge bg-dark text-white px-3 py-2">Barras</span>
        </div>
        <div class="chart-box position-relative" style="height: 360px;">
          <canvas id="chartGasoil"></canvas>
          <div class="chart-legend mt-3 text-center small text-muted" id="legendGasoil"></div>
        </div>
      </div>
    </div>
  `;


  try {
    const res = await fetch("/api/gasoil-por-mes");
    const data = await res.json();

    const meses = data.map(d => d.mes);
    const equipos = Object.keys(data[0]).filter(k => k !== "mes");


    const colores = [
      "#4e79a7", "#f28e2b", "#e15759", "#76b7b2",
      "#59a14f", "#edc949", "#af7aa1", "#ff9da7",
      "#9c755f", "#bab0ab"
    ];

    const datasets = equipos.map((eq, i) => ({
      label: eq,
      data: data.map(m => m[eq]),
      backgroundColor: colores[i % colores.length],
      borderRadius: 8,
      barThickness: 16
    }));


    const ctx = contenedor.querySelector("#chartGasoil").getContext("2d");
    if (window.chartGasoil) window.chartGasoil.destroy();

    window.chartGasoil = new Chart(ctx, {
      type: "bar",
      data: {
        labels: meses,
        datasets
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#555", font: { size: 12 } }
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#555", font: { size: 12 } },
            grid: { color: "rgba(0,0,0,0.05)" }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: context =>
                `${context.dataset.label}: ${context.formattedValue} L`
            }
          }
        },
        animation: {
          duration: 1200,
          easing: "easeOutQuart"
        }
      }
    });


    const legendContainer = contenedor.querySelector("#legendGasoil");
    legendContainer.innerHTML = equipos
      .map(
        (eq, i) =>
          `<span><i style="background:${colores[i]}"></i>${eq}</span>`
      )
      .join("");
  } catch (error) {
    console.error("Error al crear el gráfico de gasoil:", error);
  }
}
