<?php

$pageTitle = $pageTitle ?? "Tablero Hosmann";
?>

<!doctype html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($pageTitle) ?></title>

  <!-- Google Font -->
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>


  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Boxicons --><!-- Font Awesome 6.5.2 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css">
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">

  <!-- DataTables (opcional, para la tabla de registros de ejemplo) -->
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.bootstrap5.min.css">

  <!-- Chart.js v4 -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  <!-- Boxicons -->
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
  <!-- Custom -->

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="../assets/img/logo.png">

  <style>
    .card {
      background: linear-gradient(180deg, rgba(17, 24, 39, .85), rgba(17, 24, 39, .65)) !important;
      border: 1px solid rgba(255, 255, 255, .08);
      color: var(--text);
    }

    .navbar-toggler-icon {
      filter: invert(1);
      /* lo vuelve blanco sobre fondo oscuro */
    }

    .offcanvas-dark {
      background-color: #111827;
      /* fondo oscuro */
      color: #e5e7eb;
      /* texto claro */
    }

    .card,
    .card *,
    .text-muted {
      color: var(--text) !important;
    }

    :root {
      --bg: #0f172a;
      /* slate-900 */
      --surface: #111827;
      /* gray-900 */
      --card: #b16330ff;
      /* azul muy oscuro para cartas */
      --muted: #94a3b8;
      /* slate-400 */
      --text: #e5e7eb;
      /* gray-200 */
      --primary: #ca8b16ff;
      /* indigo-600 */
      --primary-50: rgba(37, 99, 235, .12);
      --accent: #f59e0b;
      /* amber-500 */
      --accent-50: rgba(245, 158, 11, .12);
      --danger: #ef4444;
      /* red-500 */
      --success: #22c55e;
      /* green-500 */
      --warning: #f59e0b;
      --radius: 14px;
      --shadow: 0 10px 25px rgba(0, 0, 0, .35);
    }

    html,
    body {
      height: 100%;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      background: radial-gradient(1200px 800px at 20% -10%, #0b1530, transparent),
        radial-gradient(800px 600px at 120% 20%, #0a223f, transparent),
        var(--bg);
      color: var(--text);
      line-height: 1.35;
    }

    .glass {
      background: linear-gradient(180deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, .04));
      border: 1px solid rgba(255, 255, 255, .06);
      backdrop-filter: blur(6px);
    }

    .cardx {
      background: linear-gradient(180deg, rgba(17, 24, 39, .6), rgba(17, 24, 39, .4));
      border: 1px solid rgba(255, 255, 255, .06);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .metric {
      display: flex;
      align-items: center;
      gap: .9rem;
      padding: 1rem 1.1rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, .03);
      border: 1px solid rgba(255, 255, 255, .06);
    }

    .metric .icon {
      font-size: 1.5rem;
      opacity: .9;
    }

    .metric .label {
      font-size: .85rem;
      color: var(--muted);
      margin-bottom: .1rem;
    }

    .metric .value {
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: .2px;
    }

    .section-title {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: .3px;
      color: #cbd5e1;
    }

    .subtle {
      color: var(--muted);
      font-size: .9rem;
    }

    .chart-box {
      height: 320px;
      position: relative;
    }

    .chart-box-lg {
      height: 380px;
      position: relative;
    }

    .navbar-brand img {
      height: 28px;
    }

    .footer-link {
      color: var(--accent);
      font-weight: 500;
      text-decoration: none;
      transition: color 0.3s ease, border-bottom 0.3s ease;
      border-bottom: 1px solid transparent;
      padding-bottom: 2px;
    }

    .footer-link:hover {
      color: var(--primary);
      border-bottom: 1px solid var(--primary);
    }

    .brand-text {
      font-weight: 800;
      letter-spacing: .4px;
    }

    .offcanvas-dark {
      background: var(--surface);
      color: var(--text);
    }

    .offcanvas-dark .offcanvas-header {
      border-bottom: 1px solid rgba(255, 255, 255, .06);
    }

    .btn-primary {
      background: var(--primary);
      border-color: var(--primary);
    }

    .btn-outline-light {
      border-color: rgba(255, 255, 255, .35);
      color: var(--text);
    }

    .btn-outline-light:hover {
      background: rgba(255, 255, 255, .08);
    }

    table.dataTable tbody tr {
      background: transparent;
    }

    body {
      padding-top: 70px;
      /* Ajustá según la altura del navbar */
    }


    table.dataTable thead th {
      color: #cbd5e1;
    }

    .table-darkx {
      color: var(--text);
      background: rgba(255, 255, 255, .02);
      border-color: rgba(255, 255, 255, .06);
    }

    .cardx .badge {
      font-size: 0.75rem;
      padding: 0.35em 0.6em;
      border-radius: 8px;
    }

    .cardx .subtle {
      color: var(--muted);
      font-size: .8rem;
    }

    /* Scroll suave */
    html {
      scroll-behavior: smooth;
    }
  </style>
</head>

<body>
  <!-- Navbar -->
  <nav class="navbar navbar-dark glass navbar-expand-lg fixed-top"
    style="border-bottom:1px solid rgba(255,255,255,.06)">
    <div class="container-fluid py-2">
      <a class="navbar-brand d-flex align-items-center gap-2" href="#">
        <img src="../assets/img/logo.png" alt="H" class="rounded-1">
        <span class="brand-text">Hosmann</span>
      </a>
      <div class="d-none d-lg-flex align-items-center gap-2">
        <a href="#resumen" class="btn btn-outline-light btn-sm"><i class='bx bx-pie-chart-alt-2 me-1'></i>Resumen</a>
        <a href="#series" class="btn btn-outline-light btn-sm"><i class='bx bx-line-chart me-1'></i>Series</a>
        <a href="#tabla" class="btn btn-outline-light btn-sm"><i class='bx bx-table me-1'></i>Tabla</a>
      </div>
    </div>
  </nav>


  <!-- Contenido principal -->
  <main class="container-fluid py-4">

    <!-- Encabezado y filtros suaves -->
    <section class="mb-4" id="resumen">
      <div class="row g-3 align-items-end">
        <div class="col-lg-12 text-center">
          <h1 class="fw-bold display-6 mb-2" style="color: var(--text); letter-spacing: .5px;">
            Tablero General
          </h1>
          <div class="mx-auto" style="width: 120px; height: 4px; 
                  background: linear-gradient(90deg, var(--primary), var(--accent)); 
                  border-radius: 2px;">
          </div>
        </div>
      </div>
    </section>


    <!-- Equipos y Vehículos -->
    <section class="mb-4">
      <div class="row g-3">
        <!-- Motoniveladora -->
        <div class="col-12 col-md-6 col-xl-6">
          <div class="cardx p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <div class="section-title small">Motoniveladora</div>
                <div class="h4 mb-0">120 km
                  <span class="badge bg-success ms-2">+12%</span>
                </div>
                <div class="subtle">vs mes anterior</div>
              </div>
              <i class="fa-solid fa-tractor fs-1 text-warning"></i>
            </div>
            <!-- Subcards -->
            <div class="row">
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Km repaso</div>
                    <div class="h5 mb-0">85</div>
                    <div class="text-success small">↑ 5%</div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Distancia acarreo</div>
                    <div class="h5 mb-0">35</div>
                    <div class="text-danger small">↓ 3%</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Sitio -->
            <div class="row mt-2">
              <div class="col-12">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Sitio</div>
                    <div class="h5 mb-0">1</div>
                    <div class="small subtle">Zona Norte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Camión Cisterna -->
        <div class="col-12 col-md-6 col-xl-6">
          <div class="cardx p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <div class="section-title small">Camión Cisterna</div>
                <div class="h4 mb-0">500 m³
                  <span class="badge bg-danger ms-2">-8%</span>
                </div>
                <div class="subtle">vs mes anterior</div>
              </div>
              <i class="fa-solid fa-truck-droplet fs-1 text-primary"></i>
            </div>
            <!-- Subcards -->
            <div class="row">
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">M³ arriego</div>
                    <div class="h5 mb-0">320</div>
                    <div class="text-danger small">↓ 6%</div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Cant. viajes</div>
                    <div class="h5 mb-0">15</div>
                    <div class="text-success small">↑ 10%</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Sitio -->
            <div class="row mt-2">
              <div class="col-12">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Sitio</div>
                    <div class="h5 mb-0">2</div>
                    <div class="small subtle">Zona Sur</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fila 2: Calcareo + Batea -->
      <div class="row g-3 mt-1">
        <!-- Calcareo -->
        <div class="col-12 col-md-6 col-xl-6">
          <div class="cardx p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <div class="section-title small">Calcareo</div>
                <div class="h4 mb-0">50 tn
                  <span class="badge bg-success ms-2">+4%</span>
                </div>
                <div class="subtle">vs mes anterior</div>
              </div>
              <i class="fa-solid fa-truck-moving fs-1 text-success"></i>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Km repaso</div>
                    <div class="h5 mb-0">22</div>
                    <div class="text-success small">↑ 2%</div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Distancia acarreo</div>
                    <div class="h5 mb-0">12</div>
                    <div class="text-danger small">↓ 1%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Camión Batea -->
        <div class="col-12 col-md-6 col-xl-6">
          <div class="cardx p-3 h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <div class="section-title small">Camión Batea</div>
                <div class="h4 mb-0">90 tn
                  <span class="badge bg-warning ms-2">0%</span>
                </div>
                <div class="subtle">vs mes anterior</div>
              </div>
              <i class="fa-solid fa-truck-ramp-box fs-1" style="color:#f97316;"></i>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Km repaso</div>
                    <div class="h5 mb-0">40</div>
                    <div class="text-success small">↑ 8%</div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card text-center shadow-sm" style="border-radius:12px; color:var(--text);">
                  <div class="card-body p-2">
                    <div class="section-title small">Distancia acarreo</div>
                    <div class="h5 mb-0">25</div>
                    <div class="text-danger small">↓ 5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Gráficos principales -->
    <section class="mb-4" id="series">
      <div class="row g-4">
        <div class="col-12 col-xl-7">
          <div class="cardx p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="section-title">Consumo mensual de gasoil por equipo</div>
              <span class="badge text-bg-dark">Barras apiladas</span>
            </div>
            <div class="chart-box">
              <canvas id="chartMensual"></canvas>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-5">
          <div class="cardx p-3 h-100">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="section-title">Composición de huella por equipo</div>
              <span class="badge text-bg-dark">Doughnut</span>
            </div>
            <div class="chart-box">
              <canvas id="chartHuella"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Nueva sección con 4 gráficos -->
      <div class="row g-4 mt-1">
        <!-- Gráfico 1: Calcareo por yacimiento -->
        <div class="col-12 col-md-6">
          <div class="cardx p-3 h-100">
            <div class="section-title mb-2">Total m³ de calcareo por yacimiento por mes</div>
            <div class="chart-box-lg">
              <canvas id="chartCalcareoYac"></canvas>
            </div>
          </div>
        </div>

        <!-- Gráfico 2: Consumo de agua -->
        <div class="col-12 col-md-6">
          <div class="cardx p-3 h-100">
            <div class="section-title mb-2">Consumo de agua en m³</div>
            <div class="chart-box-lg">
              <canvas id="chartAgua"></canvas>
            </div>
          </div>
        </div>

        <!-- Gráfico 3: Calcareo por cantera -->
        <div class="col-12 col-md-6">
          <div class="cardx p-3 h-100">
            <div class="section-title mb-2">Consumo de calcareo por cantera</div>
            <div class="chart-box-lg">
              <canvas id="chartCalcareoCantera"></canvas>
            </div>
          </div>
        </div>

        <!-- Gráfico 4: Km mensuales de repaso -->
        <div class="col-12 col-md-6">
          <div class="cardx p-3 h-100">
            <div class="section-title mb-2">Km mensuales de repaso de caminos</div>
            <div class="chart-box-lg">
              <canvas id="chartRepaso"></canvas>
            </div>
          </div>
        </div>
      </div>


    </section>

    <!-- Tabla de registros (demo) -->
    <section class="mt-4" id="tabla">
      <div class="cardx p-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="section-title">Partes Recientes</div>
          <span class="badge text-bg-dark">Parte</span>
        </div>
        <div class="table-responsive">
          <table id="itemsTable" class="table table-striped table-borderless table-darkx align-middle w-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>NRO</th>
                <th>FECHA</th>
                <th>EQUIPO</th>
                <th>EJECUTANTE</th>
                <th>LITROS</th>
              </tr>
            </thead>
            <tbody>
              <!-- Datos de muestra; reemplazar por render dinámico del backend -->
              <tr>
                <td>16558</td>
                <td>2042</td>
                <td>2025-01-12</td>
                <td>TR-06</td>
                <td>Pablo Zapata</td>
                <td>219.00</td>
              </tr>
              <tr>
                <td>16523</td>
                <td>2041</td>
                <td>2025-02-10</td>
                <td>TR-06</td>
                <td>Pablo Zapata</td>
                <td>191.00</td>
              </tr>
              <tr>
                <td>16488</td>
                <td>2040</td>
                <td>2025-03-03</td>
                <td>PC-01</td>
                <td>Jose Ramon Pereyra</td>
                <td>250.00</td>
              </tr>
              <tr>
                <td>16479</td>
                <td>2039</td>
                <td>2025-04-21</td>
                <td>MNIV-N-02</td>
                <td>Gastón Gauto</td>
                <td>152.00</td>
              </tr>
              <tr>
                <td>16478</td>
                <td>2038</td>
                <td>2025-05-27</td>
                <td>MNIV-N-02</td>
                <td>Gastón Gauto</td>
                <td>210.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <footer class="py-4 text-center subtle">
      <div>
        © <?= date('Y') ?> Hosmann -
        <span class="text-secondary">SmartForm</span> ·
        <a href="https://smartform.com.ar" target="_blank" class="footer-link">Visitar sitio</a>
      </div>
    </footer>

  </main>

  <!-- JS: jQuery (para DataTables), Bootstrap, DataTables -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.8/js/dataTables.bootstrap5.min.js"></script>
  <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>

  <script>
    // ==========================
    //   1) DATOS DE EJEMPLO
    // ==========================
    // Reemplazar estas series por fetch/API o valores de PHP.
    const MESES = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const DATA = {
      Viales: [8687.94, 9424.38, 8629.80, 8429.73, 7969.00, 8664.00, 8664.00, 0, 0, 0, 0, 0],
      Pesados: [4420.18, 4794.86, 4390.60, 4288.81, 4054.00, 4408.00, 4408.00, 0, 0, 0, 0, 0],
      Automotor: [2133.88, 2314.76, 2119.60, 2070.46, 1957.00, 2128.00, 2128.00, 0, 0, 0, 0, 0]
    };

    // Factor de huella pedido: multiplicar litros × 2.5
    // (Si desea mostrar tCO2e, convierta según su factor oficial y unidades)
    const FACTOR_EMISION = 2.5;

    // ==========================
    //   2) HELPERS VISUALES
    // ==========================
    const fmt = (n, dec = 0) => Number(n).toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const sum = arr => arr.reduce((a, b) => a + (Number(b) || 0), 0);

    // Colores consistentes (línea base + gradiente)
    const COLORS = {
      Viales: { base: '#f58220' },  // naranja corporativo
      Pesados: { base: '#9b2335' },  // borgoña
      Automotor: { base: '#1e3a8a' }   // azul
    };

    // Genera un gradiente vertical sutil para barras/líneas
    const gradientFor = (ctx, base) => {
      const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.offsetHeight);
      const rgba = hex => {
        const n = hex.replace('#', '');
        const r = parseInt(n.substring(0, 2), 16), g = parseInt(n.substring(2, 4), 16), b = parseInt(n.substring(4, 6), 16);
        return `${r},${g},${b}`;
      };
      g.addColorStop(0, `rgba(${rgba(base)}, .28)`);
      g.addColorStop(.65, `rgba(${rgba(base)}, .10)`);
      g.addColorStop(1, `rgba(${rgba(base)}, .02)`);
      return g;
    };

    // ==========================
    //   3) MÉTRICAS (header)
    // ==========================
    const totV = sum(DATA.Viales);
    const totP = sum(DATA.Pesados);
    const totA = sum(DATA.Automotor);

    const LITROS_TOTALES = totV + totP + totA;
    const CO2_ESTIMADO = LITROS_TOTALES * FACTOR_EMISION; // según pedido: ×2.5

    // Mes con mayor consumo total
    const totPorMes = MESES.map((_, i) => DATA.Viales[i] + DATA.Pesados[i] + DATA.Automotor[i]);
    const idxMaxMes = totPorMes.indexOf(Math.max(...totPorMes));

    // Categoría líder
    const leader = ([['Viales', totV], ['Pesados', totP], ['Automotor', totA]]).sort((a, b) => b[1] - a[1])[0][0];


    // ==========================
    //   4) GRÁFICOS (Chart.js)
    // ==========================
    const baseOpts = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { labels: { color: '#d1d5db', usePointStyle: true, pointStyle: 'circle' } },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,.92)',
          borderColor: 'rgba(255,255,255,.08)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#e5e7eb',
          padding: 12,
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${fmt(ctx.parsed.y ?? ctx.parsed, 2)} L`
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,.06)' }, ticks: { color: '#cbd5e1' } },
        y: { grid: { color: 'rgba(255,255,255,.06)' }, ticks: { color: '#cbd5e1' } }
      }
    };

    // 4.1) Barras agrupadas con relleno y puntas redondeadas
    const ctxMensual = document.getElementById('chartMensual').getContext('2d');
    const gradV = gradientFor(ctxMensual, COLORS.Viales.base);
    const gradP = gradientFor(ctxMensual, COLORS.Pesados.base);
    const gradA = gradientFor(ctxMensual, COLORS.Automotor.base);

    new Chart(ctxMensual, {
      type: 'bar',
      data: {
        labels: MESES,
        datasets: [
          {
            label: 'Viales',
            data: DATA.Viales,
            backgroundColor: COLORS.Viales.base, // 🔹 relleno sólido
            borderRadius: 12,
            borderSkipped: false
          },
          {
            label: 'Pesados',
            data: DATA.Pesados,
            backgroundColor: COLORS.Pesados.base, // 🔹 relleno sólido
            borderRadius: 12,
            borderSkipped: false
          },
          {
            label: 'Automotor',
            data: DATA.Automotor,
            backgroundColor: COLORS.Automotor.base, // 🔹 relleno sólido
            borderRadius: 12,
            borderSkipped: false
          }
        ]
      },
      options: {
        ...baseOpts,
        scales: {
          x: { ...baseOpts.scales.x, stacked: false },
          y: { ...baseOpts.scales.y, stacked: false }
        }
      }
    });
    // === 1) Calcareo por yacimiento ===
    new Chart(document.getElementById('chartCalcareoYac'), {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'LA',
            data: [205, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#f58220',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'CASE',
            data: [1125, 900, 690, 0, 100, 775, 0],
            backgroundColor: '#9b2335',
            borderRadius: 10,
            borderSkipped: false
          }
        ]
      },
      options: { ...baseOpts }
    });


    // === 2) Consumo de agua ===
    new Chart(document.getElementById('chartAgua'), {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'LA - Camping',
            data: [1120, 1000, 920, 820, 850, 840, 720],
            backgroundColor: '#f58220',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'WP',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#9b2335',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'CASE - Phoenix',
            data: [960, 1080, 960, 820, 660, 510, 410],
            backgroundColor: '#1e3a8a',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'CASE - Cargadero PAE',
            data: [960, 1000, 960, 300, 420, 340, 260],
            backgroundColor: '#15803d',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'CASE Adicional - PAE',
            data: [1000, 1000, 960, 300, 0, 0, 0],
            backgroundColor: '#9333ea',
            borderRadius: 10,
            borderSkipped: false
          }
        ]
      },
      options: { ...baseOpts }
    });


    // === 3) Calcareo por cantera ===
    new Chart(document.getElementById('chartCalcareoCantera'), {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'Mercau',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: '#f59e0b',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'Barruti',
            data: [1330, 900, 690, 0, 100, 775, 775],
            backgroundColor: '#9b2335',
            borderRadius: 10,
            borderSkipped: false
          }
        ]
      },
      options: { ...baseOpts }
    });


    // === 4) Repaso de caminos (lado a lado, no apiladas) ===
    new Chart(document.getElementById('chartRepaso'), {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
          {
            label: 'LA',
            data: [142, 161.5, 133.5, 108, 99, 127, 93],
            backgroundColor: '#f58220',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'CASE',
            data: [133, 157.1, 135, 119, 146, 136, 68],
            backgroundColor: '#9b2335',
            borderRadius: 10,
            borderSkipped: false
          },
          {
            label: 'CASE ADC',
            data: [146, 147, 140.5, 79, 0, 0, 0],
            backgroundColor: '#1e3a8a',
            borderRadius: 10,
            borderSkipped: false
          }
        ]
      },
      options: {
        ...baseOpts,
        scales: {
          x: { ...baseOpts.scales.x, stacked: false },
          y: { ...baseOpts.scales.y, stacked: false }
        }
      }
    });



    // 4.2) Pie completo de huella por categoría
    const ctxHuella = document.getElementById('chartHuella').getContext('2d');
    new Chart(ctxHuella, {
      type: 'pie',
      data: {
        labels: ['Viales', 'Pesados', 'Automotor'],
        datasets: [{
          data: [totV, totP, totA].map(v => v * FACTOR_EMISION),
          backgroundColor: [COLORS.Viales.base, COLORS.Pesados.base, COLORS.Automotor.base],
          borderWidth: 3,
          borderColor: '#fff',
          hoverOffset: 10,
          spacing: 2
        }]
      },
      options: {
        ...baseOpts,
        plugins: {
          ...baseOpts.plugins,
          legend: { ...baseOpts.plugins.legend, position: 'bottom' },
          tooltip: {
            ...baseOpts.plugins.tooltip,
            callbacks: {
              label: (ctx) => `${ctx.label}: ${fmt(ctx.parsed, 2)} (u. huella)`
            }
          }
        }
      }
    });

    // ==========================
    //   5) TABLA (DataTables demo)
    // ==========================
    $(function () {
      $('#itemsTable').DataTable({
        responsive: true,
        pageLength: 5,
        lengthChange: false,
        order: [[2, 'desc']],
        language: {
          search: 'Buscar:',
          zeroRecords: 'Sin resultados',
          info: 'Mostrando _START_–_END_ de _TOTAL_',
          infoEmpty: 'Sin registros',
          paginate: { previous: '‹', next: '›' }
        }
      });
    });

  </script>
</body>

</html>