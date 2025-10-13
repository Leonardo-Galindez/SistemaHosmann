// === PARTES POR TIPO CON ICONOS ===
export async function crearGraficosPartesPorTipo() {
  const dashboard = document.getElementById("fila-velocimetros");
  if (!dashboard) return console.warn("No se encontró #tabla-dashboard");

  dashboard.innerHTML = "";

  const tipos = ["Viales", "Pesados", "Livianos"];
  const colores = {
    Viales: ["#FBBF24", "#F59E0B"],
    Pesados: ["#DC2626", "#B91C1C"],
    Livianos: ["#16A34A", "#22C55E"]
  };


  const iconos = {
    Viales: "🚜",     // máquina vial
    Pesados: "🚚",    // camión
    Livianos: "🚗"    // camioneta / auto
  };

  try {
    const res = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch_partesPorEquipo.php");
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    const totalGeneral = Number(data.total_general) || 0;
    const valores = Object.fromEntries(data.tipos.map(t => [t.categoria, Number(t.cantidad) || 0]));

    tipos.forEach(tipo => {
      const valor = valores[tipo] || 0;
      const porcentaje = totalGeneral > 0 ? (valor / totalGeneral) * 100 : 0;
      const porcentajeNum = Number(porcentaje.toFixed(1));
      const [color1, color2] = colores[tipo];
      const id = `gauge-${tipo.toLowerCase()}`;

      const graficoHTML = document.createElement("div");
      graficoHTML.className = `
        cardx relative p-4 h-[250px] md:h-[260px] shadow-[0_0_25px_rgba(255,255,255,0.08)] 
        rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-gray-900/95 
        backdrop-blur-2xl hover:scale-[1.02] transition-all duration-700 w-full
      `;
      graficoHTML.innerHTML = `
        <div class="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
          <h3 class="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-${tipo === "Pesados"
          ? "red-400"
          : tipo === "Viales"
            ? "yellow-400"
            : "green-400"
        } to-${tipo === "Pesados"
          ? "red-600"
          : tipo === "Viales"
            ? "amber-500"
            : "emerald-400"
        } drop-shadow-md">
            ${iconos[tipo]} ${tipo}
          </h3>
          <span class="bg-${tipo === "Pesados"
          ? "red"
          : tipo === "Viales"
            ? "yellow"
            : "green"
        }-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md">
            Velocímetro
          </span>
        </div>
        <div id="${id}" class="relative z-10 h-[160px]"></div>
        <div class="text-center mt-1">
          <p class="text-slate-300 text-xs">Partes de ${tipo}: 
            <span class="text-white font-bold">${valor}</span>
          </p>
          <p class="text-slate-400 text-[11px]">Total general: 
            <span class="text-white font-semibold">${totalGeneral}</span>
          </p>
        </div>
      `;

      dashboard.appendChild(graficoHTML);


      const opciones = {
        series: [porcentajeNum],
        chart: {
          height: 170,
          type: "radialBar",
          animations: { enabled: true, easing: "easeOutExpo", speed: 800 }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: { size: "55%", background: "transparent" },
            track: { background: "#1E293B", strokeWidth: "100%" },
            dataLabels: {
              name: { show: false },
              value: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff",
                offsetY: 5,
                formatter: (val) => `${Number(val).toFixed(1)}%`
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: { shade: "dark", type: "horizontal", gradientToColors: [color2], stops: [0, 100] }
        },
        colors: [color1],
        stroke: { lineCap: "round" },
        labels: [tipo]
      };

      const chart = new ApexCharts(document.querySelector(`#${id}`), opciones);
      chart.render().then(() => {
        const container = document.querySelector(`#${id}`);

        const needle = document.createElement("div");
        Object.assign(needle.style, {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "3px",
          height: "38%",
          background: "linear-gradient(to top, #000, #111)",
          transformOrigin: "bottom center",
          transform: `rotate(${porcentajeNum * 2.7 - 135}deg)`,
          transition: "transform 1s ease-in-out"
        });

        const arrow = document.createElement("div");
        Object.assign(arrow.style, {
          position: "absolute",
          top: "calc(50% - 70px)",
          left: "calc(50% - 4px)",
          width: "0",
          height: "0",
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderBottom: "9px solid #000",
          transform: `rotate(${porcentajeNum * 2.7 - 135}deg)`,
          transformOrigin: "bottom center",
          transition: "transform 1s ease-in-out"
        });

        const base = document.createElement("div");
        Object.assign(base.style, {
          position: "absolute",
          top: "calc(50% - 6px)",
          left: "calc(50% - 6px)",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#000",
          boxShadow: "0 0 4px rgba(0,0,0,0.6)"
        });


        const icon = document.createElement("div");
        icon.innerHTML = iconos[tipo];
        Object.assign(icon.style, {
          position: "absolute",
          top: "calc(50% - 12px)",
          left: "calc(50% - 12px)",
          fontSize: "22px",
          color: "#fff",
          filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
          zIndex: "15",
          pointerEvents: "none"
        });

        // Insertamos todo
        container.appendChild(needle);
        container.appendChild(arrow);
        container.appendChild(base);
        container.appendChild(icon);
      });
    });
  } catch (err) {
    console.error("Error al generar los velocímetros:", err);
  }
}


// === HUELLAS DE CARBONO (DONUT 3D PREMIUM CORREGIDO - SIN TOTAL CENTRAL Y CON RADIO INTERNO MÁS PEQUEÑO) ===
export async function crearComponenteChartHuellaTorta() {
  const dashboard = document.getElementById("fila-secundaria");
  if (!dashboard) return console.warn("No se encontró #fila-secundaria");

  const graficoContainer = document.createElement("div");
  graficoContainer.className = `
    flex justify-center items-center w-full
  `;
  dashboard.appendChild(graficoContainer);

  graficoContainer.innerHTML = `
    <div class="w-full h-full">
      <div class="relative p-6 h-[420px] md:h-[460px] rounded-3xl border border-white/10 
        bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-gray-900/95 
        shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:shadow-[0_0_80px_rgba(52,211,153,0.3)]
        backdrop-blur-2xl transition-all duration-700 hover:scale-[1.02] overflow-hidden">

        <!-- Efecto de brillo -->
        <div class="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 via-transparent to-emerald-500/10 rounded-3xl pointer-events-none"></div>

        <div class="flex justify-between items-center mb-4 border-b border-white/10 pb-3 relative z-10">
          <h3 class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-400 to-blue-400 drop-shadow-md">
            Huella de carbono total
          </h3>
          <span class="bg-cyan-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Donut
          </span>
        </div>

        <div id="chartHuella" class="relative z-20 h-[290px]"></div>

        <!-- Resplandor inferior -->
        <div class="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-emerald-400/10 via-transparent to-transparent rounded-b-3xl"></div>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch-huella-carbono.php");
    const data = await res.json();
    if (!data || data.length === 0) return;

    // Totales
    const totales = { Viales: 0, Pesados: 0, Livianos: 0 };
    data.forEach(mes => {
      totales.Viales += mes.Viales || 0;
      totales.Pesados += mes.Pesados || 0;
      totales.Livianos += mes.Livianos || 0;
    });

    const categorias = Object.keys(totales);
    const valores = Object.values(totales);

    const colores = [
      "rgba(251,191,36,1)",   // Viales
      "rgba(220,38,38,1)",    // Pesados
      "rgba(34,197,94,1)"     // Livianos
    ];

    const gradientes = [
      ["#FACC15", "#F59E0B"], // dorado
      ["#DC2626", "#B91C1C"], // rojo
      ["#10B981", "#059669"]  // verde
    ];

    // === Configuración ApexCharts ===
    const chart = new ApexCharts(document.querySelector("#chartHuella"), {
      chart: {
        type: "donut",
        height: 290,
        background: "transparent",
        animations: {
          enabled: true,
          easing: "easeOutElastic",
          speed: 1800,
          animateGradually: { enabled: true, delay: 250 },
        },
        toolbar: { show: false },
        dropShadow: {
          enabled: true,
          top: 6,
          left: 3,
          blur: 6,
          opacity: 0.3,
          color: "#0ff",
        },
      },
      labels: categorias,
      series: valores,
      colors: colores,
      plotOptions: {
        pie: {
          startAngle: -100,
          endAngle: 260,
          donut: {
            size: "60%", 
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "14px",
                fontWeight: "bold",
                color: "#e2e8f0",
                offsetY: 10,
              },
              value: {
                show: true,
                fontSize: "18px",
                fontWeight: "700",
                color: "#fff",
                offsetY: -8,
                formatter: val => `${val.toFixed(1)} kg`,
              },
              total: {
                show: false,
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "radial",
          shadeIntensity: 0.6,
          gradientToColors: gradientes.map(g => g[1]),
          inverseColors: true,
          opacityFrom: 0.95,
          opacityTo: 1,
          stops: [0, 80, 100],
        },
      },
      stroke: {
        show: true,
        width: 6,
        colors: ["#1e293b"], // sombra interna tipo 3D
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 3,
          opacity: 0.6,
        },
        style: {
          fontSize: "11px",
          fontWeight: "600",
          colors: ["#fff"],
        },
      },
      legend: {
        position: "bottom",
        fontSize: "12px",
        labels: { colors: "#e2e8f0" },
        markers: { radius: 8 },
        itemMargin: { horizontal: 12, vertical: 4 },
      },
      tooltip: {
        theme: "dark",
        style: { fontSize: "12px" },
        y: { formatter: val => `${val.toLocaleString()} kg CO₂` },
      },
      theme: { mode: "dark" },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 240 },
            legend: { fontSize: "10px" },
            dataLabels: { style: { fontSize: "9px" } },
          },
        },
      ],
    });

    chart.render().then(() => {
      const center = document.querySelector(".apexcharts-datalabels-group");
      if (center) {
        center.style.transition = "transform 1s cubic-bezier(.28,1.84,.58,1)";
        center.style.transform = "scale(1.1)";
        setTimeout(() => {
          center.style.transform = "scale(1)";
        }, 1200);
      }
    });
  } catch (err) {
    console.error("Error al generar el gráfico de huella de carbono:", err);
  }
}


// === CONSUMO DE GASOIL ===
export async function crearComponenteChartGasoil() {
  const dashboard = document.getElementById("fila-secundaria");
  dashboard.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-4";

  const graficoContainer = document.createElement("div");
  graficoContainer.className = "flex justify-center items-center w-full";
  dashboard.appendChild(graficoContainer);

  graficoContainer.innerHTML = `
    <div class="w-full h-full">
      <div class="cardx relative p-6 h-[400px] md:h-[460px] shadow-[0_0_40px_rgba(59,130,246,0.2)] rounded-3xl border border-white/10 
      bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-gray-900/95 backdrop-blur-2xl hover:scale-[1.02] transition-all duration-700">

        <div class="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
          <h3 class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-md">
            Consumo mensual de gasoil
          </h3>
          <span class="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Barras
          </span>
        </div>

        <p class="text-sm text-slate-300 mb-2">Por tipo de equipo</p>
        <div id="chartGasoil" class="h-[260px] md:h-[300px]"></div>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch-gasoilTotal.php");
    const data = await res.json();
    if (!data || data.length === 0) return;

    const meses = data.map(d => d.mes);
    const equipos = Object.keys(data[0]).filter(k => k !== "mes");

    // 🔹 Colores actualizados:
    // Amarillo = Viales, Rojo = Pesados, Verde = Livianos (mismo tono que en Huella)
    const colores = ["#FBBF24", "#B91C1C", "#10B981"]; //  Verde huella aplicado al tercero

    const series = equipos.map((eq, i) => ({
      name: eq,
      data: data.map(m => m[eq]),
      color: colores[i]
    }));

    const opciones = {
      chart: {
        type: "bar",
        height: 260,
        stacked: true,
        background: "transparent",
        toolbar: { show: false },
        animations: { enabled: true, easing: "easeOutQuart", speed: 800 },
        offsetY: 10,
        parentHeightOffset: 20
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: meses.length > 8 ? "35%" : "55%"
        }
      },
      grid: { borderColor: "rgba(255,255,255,0.1)", padding: { bottom: 20 } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: meses,
        labels: {
          rotate: -45,
          trim: true,
          hideOverlappingLabels: true,
          style: { colors: "#E2E8F0", fontSize: meses.length > 8 ? "9px" : "10px" }
        }
      },
      yaxis: {
        labels: { style: { colors: "#CBD5E1", fontSize: "9px" } },
        title: { text: "Litros", style: { color: "#94A3B8", fontSize: "10px" } }
      },
      legend: {
        position: "bottom",
        fontSize: "12px",
        labels: { colors: "#e2e8f0" },
        markers: { radius: 8 },
        itemMargin: { horizontal: 12, vertical: 4 },
      },
      tooltip: { theme: "dark", y: { formatter: val => `${val.toLocaleString()} L` } },
      theme: { mode: "dark" },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 230 },
            xaxis: {
              labels: { rotate: -60, style: { fontSize: "8px" } }
            },
            plotOptions: { bar: { columnWidth: "30%" } },
            grid: { padding: { bottom: 30 } }
          }
        }
      ]
    };

    new ApexCharts(document.querySelector("#chartGasoil"), { series, ...opciones }).render();
  } catch (err) {
    console.error("Error:", err);
  }
}




// === MOTONIVELADORA ===
export async function crearComponenteChartMotoniveladora() {
  const dashboard = document.getElementById("fila-secundaria");
  dashboard.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-4";

  const graficoContainer = document.createElement("div");
  graficoContainer.className = "flex justify-center items-center w-full";
  dashboard.appendChild(graficoContainer);

  graficoContainer.innerHTML = `
    <div class="w-full h-full">
      <div class="cardx relative p-6 h-[400px] md:h-[460px] rounded-3xl border border-white/10 
      shadow-[0_0_40px_rgba(234,179,8,0.15)] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-gray-900/95 
      backdrop-blur-2xl transition-all duration-700 hover:shadow-[0_0_70px_rgba(234,179,8,0.3)] hover:scale-[1.02]">

        <div class="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
          <h3 class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 drop-shadow-md">
            Comparativa por Lugar - Motoniveladora
          </h3>
          <span class="bg-yellow-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Columnas
          </span>
        </div>

        <p class="text-sm text-slate-300 mb-2">Kilómetros recorridos y repaso</p>
        <div id="chartMotoniveladoraLugar" class="h-[260px] md:h-[300px]"></div>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch-motoniveladora.php");
    const data = await res.json();
    if (!data.success) return;

    const lugares = data.lugares.map(l => l.lugar);
    const kmRecorridos = data.lugares.map(l => l.totales.kmRecorridos);
    const kmRepaso = data.lugares.map(l => l.totales.kmRepaso);
    const colores = ["#FACC15", "#DC2626"];

    const opciones = {
      chart: {
        type: "bar",
        height: 260,
        background: "transparent",
        toolbar: { show: false },
        offsetY: 10,
        parentHeightOffset: 20
      },
      grid: { borderColor: "rgba(255,255,255,0.08)", padding: { bottom: 20 } },
      series: [
        { name: "Km Recorridos", data: kmRecorridos },
        { name: "Km Repaso", data: kmRepaso }
      ],
      colors: colores,
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: lugares.length > 8 ? "35%" : "50%" // ✅ ajuste dinámico
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: lugares,
        labels: {
          rotate: -45,
          trim: true,
          hideOverlappingLabels: true,
          style: { colors: "#fff", fontSize: lugares.length > 8 ? "9px" : "10px" }
        }
      },
      yaxis: {
        title: { text: "Km", style: { color: "#E5E7EB", fontSize: "10px" } },
        labels: { style: { colors: "#CBD5E1", fontSize: "9px" } }
      },
      legend: {
        position: "bottom",
        labels: { colors: "#fff" },
        markers: { radius: 8 },
        fontSize: "10px"
      },
      tooltip: { theme: "dark", y: { formatter: v => `${v.toFixed(1)} km` } },
      theme: { mode: "dark" },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 230 },
            plotOptions: { bar: { columnWidth: "30%" } },
            xaxis: { labels: { rotate: -60, style: { fontSize: "8px" } } },
            grid: { padding: { bottom: 30 } }
          }
        }
      ]
    };

    new ApexCharts(document.querySelector("#chartMotoniveladoraLugar"), opciones).render();
  } catch (err) {
    console.error("Error:", err);
  }
}

// === CISTERNA ===
export async function crearComponenteChartCisterna() {
  const dashboard = document.getElementById("fila-secundaria");
  dashboard.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-4";

  const graficoContainer = document.createElement("div");
  graficoContainer.className = "flex justify-center items-center w-full";
  dashboard.appendChild(graficoContainer);

  graficoContainer.innerHTML = `
    <div class="w-full h-full">
      <div class="cardx relative p-6 h-[400px] md:h-[460px] rounded-3xl border border-white/10 
      shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-gray-900/95 
      backdrop-blur-2xl transition-all duration-700 hover:shadow-[0_0_70px_rgba(59,130,246,0.3)] hover:scale-[1.02]">

        <div class="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
          <h3 class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-md">
            Comparativa por Lugar - Cisterna
          </h3>
          <span class="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Columnas
          </span>
        </div>

        <p class="text-sm text-slate-300 mb-2">Metros cúbicos y cantidad de viajes</p>
        <div id="chartCisternaLugar" class="h-[260px] md:h-[300px]"></div>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://smartform.com.ar/hosmann/SistemaHosmann/server/backend/modules/fetch-cisterna.php");
    const data = await res.json();
    if (!data.success) return;

    const lugares = data.lugares.map(l => l.lugar);
    const m3Totales = data.lugares.map(l => l.totales.m3Batea);
    const viajesTotales = data.lugares.map(l => l.totales.viajesCisterna);
    const colores = ["#3B82F6", "#06B6D4"]; // azul y cian

    const opciones = {
      chart: {
        type: "bar",
        height: 260,
        background: "transparent",
        toolbar: { show: false },
        offsetY: 10,
        parentHeightOffset: 20
      },
      grid: { borderColor: "rgba(255,255,255,0.08)", padding: { bottom: 20 } },
      series: [
        { name: "m³ Totales", data: m3Totales },
        { name: "Viajes Totales", data: viajesTotales }
      ],
      colors: colores,
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: lugares.length > 8 ? "35%" : "50%"
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: lugares,
        labels: {
          rotate: -45,
          trim: true,
          hideOverlappingLabels: true,
          style: { colors: "#fff", fontSize: lugares.length > 8 ? "9px" : "10px" }
        }
      },
      yaxis: {
        title: { text: "Totales", style: { color: "#E5E7EB", fontSize: "10px" } },
        labels: { style: { colors: "#CBD5E1", fontSize: "9px" } }
      },
      legend: {
        position: "bottom",
        labels: { colors: "#fff" },
        markers: { radius: 8 },
        fontSize: "10px"
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (v, { seriesIndex }) =>
            seriesIndex === 0 ? `${v.toFixed(1)} m³` : `${v.toFixed(0)} viajes`
        }
      },
      theme: { mode: "dark" },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 230 },
            plotOptions: { bar: { columnWidth: "30%" } },
            xaxis: { labels: { rotate: -60, style: { fontSize: "8px" } } },
            grid: { padding: { bottom: 30 } }
          }
        }
      ]
    };

    new ApexCharts(document.querySelector("#chartCisternaLugar"), opciones).render();
  } catch (err) {
    console.error("Error:", err);
  }
}

